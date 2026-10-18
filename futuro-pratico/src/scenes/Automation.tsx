import plan from "../narration-plan.json";
import { interpolate, useCurrentFrame } from "remotion";
import { BLUE, Chip, ease, linear, panel, SceneShell, Title } from "../design";
const Node = ({
  x,
  y,
  label,
  icon,
  delay,
}: {
  x: number;
  y: number;
  label: string;
  icon: string;
  delay: number;
}) => {
  const f = useCurrentFrame();
  return (
    <div
      style={{
        ...panel,
        position: "absolute",
        left: x,
        top: y,
        width: 264,
        height: 142,
        display: "flex",
        alignItems: "center",
        gap: 12,
        padding: 16,
        boxSizing: "border-box",
        opacity: interpolate(f, [delay, delay + 16], [0, 1], ease),
        scale: interpolate(f, [delay, delay + 22], [0.7, 1], ease),
        borderColor: f > delay + 20 ? "#008cff88" : "#43688e88",
      }}
    >
      <div
        style={{
          width: 56,
          height: 56,
          borderRadius: 16,
          background: "#008cff25",
          color: BLUE,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 33,
        }}
      >
        {icon}
      </div>
      <div>
        <div style={{ fontSize: 33, fontWeight: 550 }}>{label}</div>
        <div style={{ fontSize: 23, color: "#c5d5e8", marginTop: 7 }}>
          Conectado <span style={{ color: BLUE }}>✓</span>
        </div>
      </div>
    </div>
  );
};
export const Automation = () => {
  const f = useCurrentFrame();
  return (
    <SceneShell duration={plan.sceneDurations[2]}>
      <Title number="2" size={87} note="Menos repetição. Mais tempo.">
        AUTOMATIZAR
        <br />
        <span style={{ color: BLUE }}>TAREFAS</span>
      </Title>
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 790,
          width: 880,
          height: 640,
          transform: `perspective(1600px) rotateX(6deg) rotateY(${interpolate(f, [0, 150], [5, -4], linear)}deg)`,
          translate: `0 ${interpolate(f, [10, 38], [80, 0], ease)}px`,
        }}
      >
        <svg
          width="880"
          height="640"
          style={{ position: "absolute", inset: 0 }}
        >
          <defs>
            <filter id="flow-glow">
              <feGaussianBlur stdDeviation="5" />
            </filter>
          </defs>
          {[
            "M440 142V245",
            "M440 365V430H152V490",
            "M440 365V490",
            "M440 430H728V490",
          ].map((d, i) => (
            <g key={d}>
              <path d={d} fill="none" stroke="#1d3c60" strokeWidth="3" />
              <path
                d={d}
                fill="none"
                stroke={BLUE}
                strokeWidth="4"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={interpolate(
                  f,
                  [20 + i * 8, 38 + i * 8],
                  [1, 0],
                  linear,
                )}
              />
            </g>
          ))}
          <circle
            cx="440"
            cy={142 + ((f * 3) % 96)}
            r="6"
            fill="#bce4ff"
            opacity={f > 40 ? 1 : 0}
          />
          <circle
            cx={152 + ((f * 6) % 576)}
            cy="430"
            r="6"
            fill="#bce4ff"
            opacity={f > 72 ? 1 : 0}
          />
        </svg>
        <Node x={308} y={0} label="Sua ideia" icon="↗" delay={12} />
        <div
          style={{
            ...panel,
            position: "absolute",
            left: 340,
            top: 235,
            width: 200,
            height: 150,
            border: `2px solid ${BLUE}`,
            borderRadius: 30,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 70,
            fontWeight: 650,
            color: "white",
            boxShadow: "0 0 70px #008cff30",
            scale: interpolate(f, [20, 42], [0.3, 1], ease),
            opacity: interpolate(f, [20, 35], [0, 1], ease),
          }}
        >
          IA<span style={{ color: BLUE, fontSize: 32, marginLeft: 8 }}>✦</span>
        </div>
        <Node x={20} y={490} label="E-mails" icon="✉" delay={35} />
        <Node x={308} y={490} label="Agenda" icon="▦" delay={45} />
        <Node x={596} y={490} label="Dados" icon="≡" delay={55} />
      </div>
      <Chip
        style={{
          position: "absolute",
          left: 100,
          right: 140,
          justifyContent: "center",
          top: 1470,
          opacity: interpolate(f, [72, 88], [0, 1], ease),
        }}
      >
        Seu fluxo. No automático.
      </Chip>
    </SceneShell>
  );
};
