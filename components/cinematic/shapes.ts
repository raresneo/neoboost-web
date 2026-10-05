/**
 * Seturi de puncte cu același număr de vârfuri, ca orice formă să se poată
 * transforma lin în oricare alta (cerc, romb, triunghi, hexagon, panou).
 */
const N = 120;
export type Pt = [number, number];

function sampleByAngle(fn: (a: number) => Pt): Pt[] {
    const pts: Pt[] = [];
    for (let i = 0; i < N; i++) {
        const a = (i / N) * Math.PI * 2 - Math.PI / 2;
        pts.push(fn(a));
    }
    return pts;
}

function polygon(k: number, rot = 0): Pt[] {
    return sampleByAngle((a) => {
        const sector = (Math.PI * 2) / k;
        const local = ((((a - rot) % sector) + sector) % sector) - sector / 2;
        const r = Math.cos(Math.PI / k) / Math.cos(local);
        return [Math.cos(a) * r, Math.sin(a) * r];
    });
}

function rounded(w = 1, h = 1, n = 7): Pt[] {
    return sampleByAngle((a) => {
        const c = Math.cos(a);
        const s = Math.sin(a);
        const r = Math.pow(Math.pow(Math.abs(c) / w, n) + Math.pow(Math.abs(s) / h, n), -1 / n);
        return [c * r, s * r];
    });
}

export const SHAPES = {
    circle: sampleByAngle((a) => [Math.cos(a), Math.sin(a)]),
    diamond: polygon(4, 0),
    triangle: polygon(3, -Math.PI / 2),
    hex: polygon(6, 0),
    panel: rounded(1, 1, 7),
};
export type ShapeName = keyof typeof SHAPES;

export function morph(a: ShapeName, b: ShapeName, p: number): Pt[] {
    const A = SHAPES[a];
    const B = SHAPES[b];
    return A.map(([x, y], i) => [x + (B[i][0] - x) * p, y + (B[i][1] - y) * p] as Pt);
}

export function toPoints(pts: Pt[], cx: number, cy: number, rx: number, ry: number, rot = 0) {
    const c = Math.cos(rot);
    const s = Math.sin(rot);
    return pts
        .map(([x, y]) => {
            const X = x * c - y * s;
            const Y = x * s + y * c;
            return `${(cx + X * rx).toFixed(2)},${(cy + Y * ry).toFixed(2)}`;
        })
        .join(' ');
}

export function toClip(pts: Pt[]) {
    return `polygon(${pts.map(([x, y]) => `${(50 + x * 50).toFixed(2)}% ${(50 + y * 50).toFixed(2)}%`).join(',')})`;
}
