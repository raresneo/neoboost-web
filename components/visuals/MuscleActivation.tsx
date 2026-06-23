import React, { useState } from "react";

type Muscle = {
  id: string;
  name: string;
  activation: number;
  vsGym: number;
  tooltipX: number;
  tooltipY: number;
  shape: React.ReactNode;
};

const MUSCLES_FRONT: Muscle[] = [
  {
    id: "pectorali",
    name: "Pectorali",
    activation: 85,
    vsGym: 240,
    tooltipX: 100,
    tooltipY: 55,
    shape: <ellipse cx={100} cy={105} rx={28} ry={16} />,
  },
  {
    id: "bicepsi_stanga",
    name: "Bicepsi stanga",
    activation: 78,
    vsGym: 210,
    tooltipX: 30,
    tooltipY: 108,
    shape: <ellipse cx={52} cy={158} rx={10} ry={20} />,
  },
  {
    id: "bicepsi_dreapta",
    name: "Bicepsi dreapta",
    activation: 78,
    vsGym: 210,
    tooltipX: 130,
    tooltipY: 108,
    shape: <ellipse cx={148} cy={158} rx={10} ry={20} />,
  },
  {
    id: "abdomen",
    name: "Abdomen",
    activation: 92,
    vsGym: 280,
    tooltipX: 100,
    tooltipY: 105,
    shape: <rect x={83} y={128} width={34} height={52} rx={5} />,
  },
  {
    id: "cvadricepsi_stanga",
    name: "Cvadricepsi stanga",
    activation: 88,
    vsGym: 250,
    tooltipX: 50,
    tooltipY: 220,
    shape: <ellipse cx={76} cy={270} rx={14} ry={32} />,
  },
  {
    id: "cvadricepsi_dreapta",
    name: "Cvadricepsi dreapta",
    activation: 88,
    vsGym: 250,
    tooltipX: 108,
    tooltipY: 220,
    shape: <ellipse cx={124} cy={270} rx={14} ry={32} />,
  },
  {
    id: "deltoid_stanga",
    name: "Deltoid stanga",
    activation: 75,
    vsGym: 200,
    tooltipX: 20,
    tooltipY: 55,
    shape: <ellipse cx={60} cy={90} rx={12} ry={12} />,
  },
  {
    id: "deltoid_dreapta",
    name: "Deltoid dreapta",
    activation: 75,
    vsGym: 200,
    tooltipX: 120,
    tooltipY: 55,
    shape: <ellipse cx={140} cy={90} rx={12} ry={12} />,
  },
];

const MUSCLES_BACK: Muscle[] = [
  {
    id: "spate_lat",
    name: "Spate Lat",
    activation: 90,
    vsGym: 260,
    tooltipX: 100,
    tooltipY: 80,
    shape: <path d="M78 85 Q100 75 122 85 L128 165 Q100 175 72 165 Z" />,
  },
  {
    id: "fesieri_stanga",
    name: "Fesieri stanga",
    activation: 95,
    vsGym: 300,
    tooltipX: 50,
    tooltipY: 175,
    shape: <ellipse cx={82} cy={210} rx={20} ry={22} />,
  },
  {
    id: "fesieri_dreapta",
    name: "Fesieri dreapta",
    activation: 95,
    vsGym: 300,
    tooltipX: 100,
    tooltipY: 175,
    shape: <ellipse cx={118} cy={210} rx={20} ry={22} />,
  },
  {
    id: "ischiogambieri_stanga",
    name: "Ischiogambieri stanga",
    activation: 82,
    vsGym: 230,
    tooltipX: 50,
    tooltipY: 235,
    shape: <ellipse cx={76} cy={278} rx={13} ry={30} />,
  },
  {
    id: "ischiogambieri_dreapta",
    name: "Ischiogambieri dreapta",
    activation: 82,
    vsGym: 230,
    tooltipX: 108,
    tooltipY: 235,
    shape: <ellipse cx={124} cy={278} rx={13} ry={30} />,
  },
  {
    id: "tricepsi",
    name: "Tricepsi",
    activation: 72,
    vsGym: 190,
    tooltipX: 20,
    tooltipY: 118,
    shape: (
      <g>
        <ellipse cx={50} cy={155} rx={9} ry={18} />
        <ellipse cx={150} cy={155} rx={9} ry={18} />
      </g>
    ),
  },
];

const BodyOutline: React.FC = () => (
  <g stroke="#3F3F46" strokeWidth={2} fill="none">
    {/* Head */}
    <circle cx={100} cy={38} r={28} />
    {/* Torso */}
    <rect x={72} y={68} width={56} height={122} rx={10} />
    {/* Left arm */}
    <path d="M72,80 C60,100 50,130 44,198" />
    <path d="M72,90 C62,108 54,138 48,198" />
    {/* Right arm */}
    <path d="M128,80 C140,100 150,130 156,198" />
    <path d="M128,90 C138,108 146,138 152,198" />
    {/* Left leg */}
    <path d="M80,188 C76,220 72,260 70,320 L68,380" />
    <path d="M90,190 C88,222 86,262 84,322 L82,380" />
    {/* Right leg */}
    <path d="M120,188 C124,220 128,260 130,320 L132,380" />
    <path d="M110,190 C112,222 114,262 116,322 L118,380" />
  </g>
);

export const MuscleActivation: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [view, setView] = useState<"front" | "back">("front");

  const muscles = view === "front" ? MUSCLES_FRONT : MUSCLES_BACK;
  const hoveredMuscle = muscles.find((m) => m.id === hoveredId) ?? null;

  return (
    <div
      style={{
        background: "#09090B",
        borderRadius: 20,
        padding: 32,
        maxWidth: 480,
        margin: "0 auto",
        position: "relative",
        fontFamily: "inherit",
      }}
    >
      {/* Title section */}
      <div style={{ marginBottom: 24 }}>
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 10,
            letterSpacing: "0.25em",
            color: "#3B82F6",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          EMS · Activare Musculara
        </p>
        <h3
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: "#F4F4F5",
            margin: 0,
          }}
        >
          Harta Activarii
        </h3>
      </div>

      {/* View toggle */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 20,
        }}
      >
        {(["front", "back"] as const).map((v) => (
          <button
            key={v}
            onClick={() => {
              setView(v);
              setHoveredId(null);
            }}
            style={{
              padding: "6px 18px",
              borderRadius: 8,
              border: view === v ? "1px solid rgba(59,130,246,0.6)" : "1px solid rgba(63,63,70,0.6)",
              background: view === v ? "rgba(59,130,246,0.15)" : "transparent",
              color: view === v ? "#93C5FD" : "#71717A",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "0.08em",
              transition: "all 0.2s",
            }}
          >
            {v === "front" ? "Frontal" : "Posterior"}
          </button>
        ))}
      </div>

      {/* SVG body */}
      <div style={{ position: "relative", display: "inline-block", width: "100%" }}>
        <svg
          viewBox="0 0 200 400"
          width="100%"
          style={{ display: "block" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="muscleGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#818CF8" />
            </radialGradient>
            <filter id="glowFilter" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation={4} result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <BodyOutline />

          {muscles.map((muscle) => {
            const isHovered = hoveredId === muscle.id;
            const someHovered = hoveredId !== null;
            const opacity = someHovered && !isHovered ? 0.3 : 1;
            const fill = isHovered ? "url(#muscleGlow)" : "rgba(59,130,246,0.25)";
            const filter = isHovered ? "url(#glowFilter)" : undefined;

            return (
              <g
                key={muscle.id}
                style={{ cursor: "pointer", opacity, transition: "opacity 0.2s" }}
                fill={fill}
                filter={filter}
                stroke={isHovered ? "#818CF8" : "rgba(59,130,246,0.5)"}
                strokeWidth={isHovered ? 1.5 : 1}
                onMouseEnter={() => setHoveredId(muscle.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {muscle.shape}
              </g>
            );
          })}
        </svg>

        {/* Tooltip */}
        {hoveredMuscle && (
          <div
            style={{
              position: "absolute",
              left: `${(hoveredMuscle.tooltipX / 200) * 100}%`,
              top: `${(hoveredMuscle.tooltipY / 400) * 100}%`,
              transform: "translate(-50%, -110%)",
              background: "rgba(17,17,23,0.95)",
              border: "1px solid rgba(59,130,246,0.3)",
              borderRadius: 10,
              padding: "10px 14px",
              minWidth: 160,
              boxShadow: "0 0 20px rgba(59,130,246,0.25), 0 4px 24px rgba(0,0,0,0.6)",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            <p
              style={{
                color: "#93C5FD",
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                margin: "0 0 6px 0",
              }}
            >
              {hoveredMuscle.name}
            </p>
            <p style={{ color: "#E4E4E7", fontSize: 12, margin: "0 0 3px 0" }}>
              Activare EMS:{" "}
              <span style={{ color: "#60A5FA", fontWeight: 700 }}>
                {hoveredMuscle.activation}%
              </span>
            </p>
            <p style={{ color: "#A1A1AA", fontSize: 11, margin: 0 }}>
              vs. sala:{" "}
              <span style={{ color: "#34D399", fontWeight: 700 }}>
                +{hoveredMuscle.vsGym - 100}% mai mult
              </span>
            </p>
          </div>
        )}
      </div>

      {/* Legend hint */}
      <p
        style={{
          color: "#52525B",
          fontSize: 11,
          textAlign: "center",
          marginTop: 16,
          fontStyle: "italic",
        }}
      >
        Trece cu mouse-ul peste muschi pentru detalii
      </p>
    </div>
  );
};

export default MuscleActivation;
