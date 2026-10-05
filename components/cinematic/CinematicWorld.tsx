/**
 * Lumea 3D din spatele home page-ului (three.js, fără alte dependențe).
 * Podea grilă, 10 bare = cele 10 canale ale aparatului EMS, un nucleu de cristal
 * care pulsează pe ritmul impulsului, inele, linia de curent bifazic și praf luminos.
 * Camera urmează un spline închis pe cele 15 secunde, cu paralaxă de mouse,
 * apoi zboară înainte la scroll.
 *
 * Performanță: pe telefon fără bloom, pixel ratio 1, mai puține particule.
 * Pe desktop, dacă FPS-ul scade sub ~40, bloom-ul se oprește singur.
 */
import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import * as THREE from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { clock, DURATION, seg, easeOutExpo, easeInOut, clamp } from './timeline';

const INK = 0x06070b;
const CURRENT = 0x3a86ff;
const ION = 0xbfd4ff;

function buildWorld(canvas: HTMLCanvasElement, veil: HTMLDivElement | null) {
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1 : 1.5));
    renderer.setClearColor(INK, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(INK, 7, 34);
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 200);

    // Reflexii reale pe metal și cristal: mediu de studio generat, o singură dată
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    pmrem.dispose();

    scene.add(new THREE.AmbientLight(0xffffff, 0.15));
    const point = new THREE.PointLight(CURRENT, 40, 30, 1.6);
    point.position.set(0, 2.4, 1.5);
    scene.add(point);
    const rim = new THREE.DirectionalLight(0xdde6ff, 1.2);
    rim.position.set(-5, 6, -4);
    scene.add(rim);

    // --- Grid floor
    const gridPts: number[] = [];
    for (let x = -60; x <= 60; x += 1) gridPts.push(x, 0, 12, x, 0, -160);
    for (let z = 12; z >= -160; z -= 1) gridPts.push(-60, 0, z, 60, 0, z);
    const gridGeo = new THREE.BufferGeometry();
    gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(gridPts, 3));
    const grid = new THREE.LineSegments(gridGeo, new THREE.LineBasicMaterial({ color: 0x1b2c55, transparent: true, opacity: 0.5 }));
    grid.position.y = -0.6;
    scene.add(grid);

    // --- 10 channel bars (lucioase, rotunjite, cu reflexii)
    const channels = new THREE.Group();
    channels.position.set(0, 0, -3.2);
    scene.add(channels);
    const barGeo = new RoundedBoxGeometry(0.34, 1, 0.34, 3, 0.06);
    const capGeo = new RoundedBoxGeometry(0.36, 0.05, 0.36, 2, 0.02);
    const bars: { bar: THREE.Mesh; cap: THREE.Mesh }[] = [];
    for (let i = 0; i < 10; i++) {
        const x = (i - 4.5) * 0.78;
        const g = new THREE.Group();
        g.position.set(x, 0, Math.abs(x) * 0.28);
        const bar = new THREE.Mesh(barGeo, new THREE.MeshPhysicalMaterial({
            color: 0x0a1630, emissive: CURRENT, emissiveIntensity: 0.4,
            metalness: 0.7, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.15, envMapIntensity: 1.1,
        }));
        const cap = new THREE.Mesh(capGeo, new THREE.MeshBasicMaterial({ color: ION, transparent: true, opacity: 1 }));
        g.add(bar, cap);
        channels.add(g);
        bars.push({ bar, cap });
    }

    // --- Nucleul: cristal fațetat + carcasă wireframe, pulsează pe impuls
    const core = new THREE.Group();
    core.position.set(0, 1.0, -1.6);
    scene.add(core);
    const crystal = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.62, 0),
        new THREE.MeshPhysicalMaterial({
            color: 0x0d1f45, emissive: CURRENT, emissiveIntensity: 0.25, metalness: 0.9, roughness: 0.08,
            clearcoat: 1, flatShading: true, envMapIntensity: 1.6,
        })
    );
    const shell = new THREE.LineSegments(
        new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(0.98, 1)),
        new THREE.LineBasicMaterial({ color: ION, transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    core.add(crystal, shell);

    // --- Impulse rings
    const ringMat = (c: number) => new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending, depthWrite: false });
    const rings = new THREE.Group();
    rings.position.set(0, 1, -1.2);
    scene.add(rings);
    const r1 = new THREE.Mesh(new THREE.TorusGeometry(2.3, 0.014, 8, 180), ringMat(CURRENT));
    const r2 = new THREE.Mesh(new THREE.TorusGeometry(2.75, 0.011, 8, 180), ringMat(ION));
    const r3 = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.009, 8, 180), ringMat(CURRENT));
    rings.add(r1, r2, r3);

    // --- Fly-through gates for the scroll flight
    const gates: THREE.Mesh[] = [];
    [-14, -28, -42, -56, -70, -84].forEach((z, i) => {
        const m = new THREE.Mesh(new THREE.TorusGeometry(3.4, 0.018, 6, i % 2 ? 4 : 6), ringMat(i % 2 ? ION : CURRENT));
        m.position.set(0, 1.6 + i * 0.25, z);
        (m.material as THREE.MeshBasicMaterial).opacity = 0.6;
        scene.add(m);
        gates.push(m);
    });

    // --- Biphasic current line. Bufferul se refolosește (fără alocări pe frame).
    const COUNT = isMobile ? 160 : 240;
    const pts = new Float32Array(COUNT * 3);
    const fillLine = (t: number) => {
        const draw = easeOutExpo(seg(t, 0.05, 1.4));
        const amp = 0.25 + 0.55 * Math.sin(Math.PI * seg(t, 0, 3.2)) + 0.4 * Math.sin(Math.PI * seg(t, 11.8, 15));
        for (let i = 0; i < COUNT; i++) {
            const u = i / (COUNT - 1);
            const x = -11 + u * 22 * Math.max(draw, 0.001);
            const phase = (x * 0.9 - t * 4) % 2.4;
            const ph = phase < 0 ? phase + 2.4 : phase;
            let y = 0;
            if (ph < 0.35) y = 1;
            else if (ph < 0.7) y = -1;
            const env = Math.exp(-Math.pow(x / 7, 2));
            pts[i * 3] = x;
            pts[i * 3 + 1] = 0.9 + y * amp * env * 0.6 + Math.sin(x * 3 + t * 9) * 0.015;
            pts[i * 3 + 2] = 0.6;
        }
    };
    fillLine(0);
    const mainGeo = new LineGeometry();
    mainGeo.setPositions(pts);
    const echoGeo = new LineGeometry();
    echoGeo.setPositions(pts);
    const writeSegments = (geo: LineGeometry) => {
        const data = (geo.attributes.instanceStart as THREE.InterleavedBufferAttribute).data;
        const arr = data.array as Float32Array;
        for (let i = 0; i < COUNT - 1; i++) {
            const o = i * 6;
            arr[o] = pts[i * 3];
            arr[o + 1] = pts[i * 3 + 1];
            arr[o + 2] = pts[i * 3 + 2];
            arr[o + 3] = pts[i * 3 + 3];
            arr[o + 4] = pts[i * 3 + 4];
            arr[o + 5] = pts[i * 3 + 5];
        }
        data.needsUpdate = true;
    };
    const mainMat = new LineMaterial({ color: ION, linewidth: 2.4, transparent: true, opacity: 0.95, depthWrite: false });
    const echoMat = new LineMaterial({ color: CURRENT, linewidth: 10, transparent: true, opacity: 0.22, depthWrite: false });
    const echo = new Line2(echoGeo, echoMat);
    const main = new Line2(mainGeo, mainMat);
    echo.frustumCulled = false;
    main.frustumCulled = false;
    scene.add(echo, main);

    // --- Dust
    const dustN = isMobile ? 260 : 650;
    const dustPos = new Float32Array(dustN * 3);
    const speeds = new Float32Array(dustN);
    for (let i = 0; i < dustN; i++) {
        dustPos[i * 3] = (Math.random() - 0.5) * 30;
        dustPos[i * 3 + 1] = Math.random() * 9 - 0.5;
        dustPos[i * 3 + 2] = 10 - Math.random() * 110;
        speeds[i] = 0.4 + Math.random();
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: ION, size: 0.035, transparent: true, opacity: 0.7, sizeAttenuation: true, depthWrite: false, blending: THREE.AdditiveBlending }));
    dust.frustumCulled = false;
    scene.add(dust);

    // --- Camera path
    const camPath = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.7, 9.5),
        new THREE.Vector3(2.8, 1.3, 6.6),
        new THREE.Vector3(-3.2, 2.3, 6.0),
        new THREE.Vector3(0.4, 3.6, 7.8),
        new THREE.Vector3(1.6, 1.0, 5.2),
    ], true, 'centripetal');
    const lookPath = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0.6, 0),
        new THREE.Vector3(0, 0.9, -0.5),
        new THREE.Vector3(0, 1.1, -1.5),
        new THREE.Vector3(0, 0.8, -2.5),
        new THREE.Vector3(0, 0.9, -0.5),
    ], true, 'centripetal');
    const p = new THREE.Vector3();
    const l = new THREE.Vector3();

    // --- Bloom doar pe desktop
    let composer: EffectComposer | null = null;
    let bloom: UnrealBloomPass | null = null;
    if (!isMobile) {
        composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2), 0.62, 0.5, 0.32);
        composer.addPass(bloom);
        composer.addPass(new OutputPass());
    }

    const resize = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        renderer.setSize(w, h, false);
        composer?.setSize(w, h);
        bloom?.resolution.set(w / 2, h / 2);
        camera.aspect = w / h;
        // pe ecrane înguste camera se dă puțin înapoi, ca barele să nu intre peste text
        camera.fov = w / h < 0.8 ? 52 : 42;
        camera.updateProjectionMatrix();
        mainMat.resolution.set(w, h);
        echoMat.resolution.set(w, h);
    };
    resize();
    window.addEventListener('resize', resize);

    let last = performance.now();
    let raf = 0;
    let slowFrames = 0;
    const frame = (now: number) => {
        raf = requestAnimationFrame(frame);
        if (document.hidden) return;
        const dt = Math.max(0, Math.min(0.05, (now - last) / 1000));
        last = now;

        // auto-degradare: prea multe cadre lente => fără bloom
        if (composer) {
            slowFrames = dt > 0.026 ? slowFrames + 1 : Math.max(0, slowFrames - 1);
            if (slowFrames > 90) {
                composer.dispose();
                composer = null;
                bloom = null;
                renderer.setPixelRatio(1);
                resize();
            }
        }

        const t = clock.t;
        const s = clock.reduced ? 0 : clock.scroll;
        const heroFade = 1 - clamp(s / 650);
        if (veil) veil.style.opacity = String(Math.min(0.55, (s / window.innerHeight) * 0.6));

        // camera: spline + paralaxă + zbor la scroll
        let u = (((t / DURATION) % 1) + 1) % 1;
        if (!Number.isFinite(u)) u = 0;
        u = Math.min(u, 0.9999);
        camPath.getPointAt(u, p);
        lookPath.getPointAt(u, l);
        const fly = s * 0.0075;
        const rise = Math.min(s * 0.0009, 2.2);
        const calm = clamp(s / 900);
        p.x = p.x * (1 - calm * 0.7) + clock.px * 0.9;
        p.y = p.y * (1 - calm * 0.5) + rise - clock.py * 0.45;
        p.z -= fly;
        l.z -= fly;
        l.y += rise * 0.4;
        // portret (telefon): privim puțin mai sus, ca barele să coboare sub text
        if (camera.aspect < 0.8) l.y += 0.55 * (1 - calm);
        camera.position.copy(p);
        camera.lookAt(l);

        // channels
        const riseBars = easeOutExpo(seg(t, 6.0, 7.4)) * (1 - easeInOut(seg(t, 8.8, 9.6)));
        const intro = easeOutExpo(seg(t, 0.4, 1.6));
        const pulse = 0.5 + 0.5 * Math.sign(Math.sin(t * Math.PI * 1.6));
        channels.scale.set(1, Math.max(0.001, heroFade), 1);
        channels.visible = heroFade > 0.01;
        bars.forEach(({ bar, cap }, i) => {
            const wave = 0.5 + 0.5 * Math.sin(t * 3 + i * 0.7);
            const h = 0.12 + intro * (0.25 + wave * 0.25 + pulse * 0.12) + riseBars * (0.55 + Math.sin(i * 1.3) * 0.25 + 0.2);
            bar.scale.y = h;
            bar.position.y = -0.6 + h / 2;
            (bar.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.3 + pulse * 0.25 + riseBars * 0.35;
            cap.position.y = -0.6 + h + 0.035;
            (cap.material as THREE.MeshBasicMaterial).opacity = 0.5 + pulse * 0.5;
        });

        // core
        core.visible = heroFade > 0.01;
        const beat = Math.pow(Math.max(0, Math.sin(t * Math.PI * 1.6)), 6);
        core.scale.setScalar((0.9 + beat * 0.12) * Math.max(0.001, heroFade));
        crystal.rotation.set(t * 0.35, t * 0.5, 0);
        shell.rotation.set(-t * 0.18, -t * 0.27, t * 0.1);
        (crystal.material as THREE.MeshPhysicalMaterial).emissiveIntensity = 0.2 + beat * 0.9;
        (shell.material as THREE.LineBasicMaterial).opacity = 0.25 + beat * 0.4;
        point.intensity = 32 + beat * 30;

        // rings: un "burst" la fiecare tăietură de scenă
        let burst = 0;
        for (const b of [3, 6, 9, 12]) burst = Math.max(burst, Math.sin(Math.PI * seg(t, b - 0.3, b + 0.7)));
        rings.scale.setScalar((1 + burst * 0.35) * Math.max(0.001, heroFade));
        rings.visible = heroFade > 0.01;
        rings.position.y = 1.0 + Math.sin(t * 0.8) * 0.08;
        r1.rotation.set(t * 0.42, t * 0.2, 0);
        r2.rotation.set(Math.PI / 2 + t * 0.3, 0, t * 0.25);
        r3.rotation.set(t * 0.18, Math.PI / 3 + t * 0.35, 0);
        [r1, r2, r3].forEach((r) => ((r.material as THREE.MeshBasicMaterial).opacity = 0.35 + burst * 0.6));

        gates.forEach((g, i) => (g.rotation.z = t * 0.15 * (i % 2 ? 1 : -1)));

        // current
        const lineFade = (1 - seg(t, 14.6, 15)) * heroFade;
        main.visible = echo.visible = lineFade > 0.01;
        if (main.visible) {
            fillLine(t);
            writeSegments(mainGeo);
            writeSegments(echoGeo);
            mainMat.opacity = 0.95 * lineFade;
            echoMat.opacity = 0.22 * lineFade;
        }

        // dust
        const a = dustGeo.attributes.position as THREE.BufferAttribute;
        const arr = a.array as Float32Array;
        for (let i = 0; i < dustN; i++) {
            arr[i * 3 + 1] += speeds[i] * dt * 0.08;
            if (arr[i * 3 + 1] > 8.5) arr[i * 3 + 1] = -0.5;
        }
        a.needsUpdate = true;

        if (composer) composer.render();
        else renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(frame);

    return () => {
        cancelAnimationFrame(raf);
        window.removeEventListener('resize', resize);
        composer?.dispose();
        envTex.dispose();
        scene.traverse((o: any) => {
            o.geometry?.dispose?.();
            if (Array.isArray(o.material)) o.material.forEach((m: any) => m.dispose());
            else o.material?.dispose?.();
        });
        renderer.dispose();
    };
}

export const CinematicWorld: React.FC = () => {
    const ref = useRef<HTMLCanvasElement>(null);
    const veilRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (!ref.current) return;
        let dispose: (() => void) | undefined;
        try {
            dispose = buildWorld(ref.current, veilRef.current);
        } catch (err) {
            // Fără WebGL: rămâne fundalul închis, tipografia merge oricum.
            console.warn('NeoBoost 3D world disabled:', err);
        }
        return () => dispose?.();
    }, []);
    if (typeof document === 'undefined') return null;
    // Portal în body: un părinte cu transform (tranziția de pagină) ar strica position: fixed.
    return createPortal(
        <>
            <canvas
                ref={ref}
                aria-hidden="true"
                style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: -1, display: 'block', background: '#06070B' }}
            />
            {/* văl care se îndesește la scroll, ca textul secțiunilor să rămână lizibil peste 3D */}
            <div
                ref={veilRef}
                aria-hidden="true"
                style={{ position: 'fixed', inset: 0, zIndex: -1, background: '#06070B', opacity: 0, pointerEvents: 'none' }}
            />
        </>,
        document.body
    );
};
