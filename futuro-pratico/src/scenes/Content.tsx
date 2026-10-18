import plan from "../narration-plan.json";
import { interpolate, useCurrentFrame } from "remotion";
import { BLUE, Chip, ease, linear, panel, SceneShell, Title } from "../design";
const Landscape = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 420 500"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <linearGradient id="sky" x2="0" y2="1">
        <stop stopColor="#003669" />
        <stop offset="1" stopColor="#080b14" />
      </linearGradient>
      <linearGradient id="mountain" x2="0" y2="1">
        <stop stopColor="#7ecfff" />
        <stop offset="1" stopColor="#00458f" />
      </linearGradient>
    </defs>
    <rect width="420" height="500" fill="url(#sky)" />
    <circle cx="305" cy="130" r="64" fill="#008cff" />
    <circle cx="305" cy="130" r="80" fill="none" stroke="#73c9ff44" />
    <path d="M-30 470L167 165 312 470Z" fill="url(#mountain)" />
    <path d="M167 165L190 470H310Z" fill="#05315f" />
    <path d="M140 210L167 165 194 217 171 207 158 222Z" fill="#d3efff" />
    <path d="M180 500L330 285 470 500Z" fill="#0c5c9d" />
    <path d="M0 447Q160 420 420 455V500H0Z" fill="#061323" />
  </svg>
);
export const Content = () => {
  const f = useCurrentFrame();
  return (
    <SceneShell duration={plan.sceneDurations[3]}>
      <Title number="3" size={105} note="Dê forma à sua criatividade.">
        CRIAR
        <br />
        <span style={{ color: BLUE }}>CONTEÚDOS</span>
      </Title>
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 810,
          width: 820,
          height: 650,
          perspective: 1500,
        }}
      >
        <div
          style={{
            ...panel,
            position: "absolute",
            left: 0,
            top: 110,
            width: 340,
            height: 410,
            overflow: "hidden",
            transform: `rotateY(15deg) rotateZ(-12deg) translateY(${interpolate(f, [15, 45], [200, 0], ease)}px)`,
            opacity: interpolate(f, [15, 35], [0, 1], ease),
          }}
        >
          <Landscape />
          <div
            style={{
              position: "absolute",
              left: 24,
              top: 24,
              borderRadius: 18,
              background: "#080b1499",
              padding: "8px 16px",
              fontSize: 30,
            }}
          >
            IMAGEM
          </div>
        </div>
        <div
          style={{
            ...panel,
            position: "absolute",
            right: 0,
            top: 145,
            width: 300,
            height: 365,
            padding: 30,
            boxSizing: "border-box",
            transform: `rotateY(-14deg) rotateZ(7deg) translateY(${interpolate(f, [27, 54], [240, 0], ease)}px)`,
            opacity: interpolate(f, [27, 46], [0, 1], ease),
          }}
        >
          <div style={{ fontSize: 25, letterSpacing: 3, color: BLUE }}>
            TEXTO
          </div>
          <div
            style={{
              fontSize: 51,
              fontWeight: 650,
              lineHeight: 1.05,
              marginTop: 28,
            }}
          >
            Crie.
            <br />
            Inspire.
            <br />
            <span style={{ color: BLUE }}>Conecte.</span>
          </div>
          <div
            style={{
              height: 4,
              background: BLUE,
              marginTop: 30,
              width: interpolate(f, [50, 90], [0, 180], ease),
            }}
          />
        </div>
        <div
          style={{
            ...panel,
            position: "absolute",
            left: 225,
            top: 0,
            width: 370,
            height: 565,
            overflow: "hidden",
            transform: `rotateY(${interpolate(f, [0, 120], [-8, 5], linear)}deg) rotateZ(-2deg) translateY(${interpolate(f, [5, 34], [200, 0], ease)}px)`,
            opacity: interpolate(f, [5, 25], [0, 1], ease),
            boxShadow: "0 50px 100px #000b, 0 0 55px #008cff20",
          }}
        >
          <Landscape />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(transparent 25%, #080b14dd)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 24,
              top: 24,
              fontSize: 30,
              background: BLUE,
              padding: "8px 16px",
              borderRadius: 18,
            }}
          >
            VÍDEO
          </div>
          <div
            style={{
              position: "absolute",
              top: 210,
              left: 143,
              width: 86,
              height: 86,
              background: "#ffffff20",
              border: "1px solid #ffffff66",
              borderRadius: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="30" height="36" viewBox="0 0 30 36">
              <path d="M3 2L28 18 3 34Z" fill="white" />
            </svg>
          </div>
          <div
            style={{
              position: "absolute",
              left: 28,
              bottom: 54,
              fontSize: 43,
              fontWeight: 650,
              lineHeight: 1.03,
            }}
          >
            O próximo
            <br />
            nível é seu.
          </div>
          <div
            style={{
              position: "absolute",
              left: 28,
              right: 28,
              bottom: 28,
              height: 4,
              background: "#ffffff33",
            }}
          >
            <div
              style={{
                height: 4,
                background: BLUE,
                width: `${interpolate(f, [30, 110], [0, 100], linear)}%`,
              }}
            />
          </div>
        </div>
      </div>
      <Chip
        style={{
          position: "absolute",
          left: 100,
          right: 140,
          justifyContent: "center",
          top: 1470,
          opacity: interpolate(f, [65, 85], [0, 1], ease),
        }}
      >
        Vídeos, imagens e novas ideias
      </Chip>
    </SceneShell>
  );
};
