import plan from "../narration-plan.json";
import { interpolate, useCurrentFrame } from "remotion";
import { BLUE, Chip, ease, linear, panel, SceneShell, Title } from "../design";
export const Websites = () => {
  const f = useCurrentFrame();
  return (
    <SceneShell duration={plan.sceneDurations[1]}>
      <Title number="1" note="Da ideia à primeira página.">
        CRIAR
        <br />
        <span style={{ color: BLUE }}>SITES</span>
      </Title>
      <div
        style={{
          position: "absolute",
          left: 100,
          top: 810,
          width: 820,
          height: 600,
          perspective: 1400,
          scale: interpolate(f, [10, 48], [0.85, 1], ease),
        }}
      >
        <div
          style={{
            ...panel,
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            transform: `rotateY(${interpolate(f, [0, 150], [-12, 4], linear)}deg) rotateX(8deg) rotateZ(-3deg)`,
            translate: `0 ${interpolate(f, [12, 45], [100, 0], ease)}px`,
            opacity: interpolate(f, [10, 30], [0, 1], ease),
          }}
        >
          <div
            style={{
              height: 64,
              borderBottom: "1px solid #40608066",
              display: "flex",
              alignItems: "center",
              padding: "0 25px",
              gap: 9,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  background: i === 0 ? BLUE : "#56718b",
                }}
              />
            ))}
            <div
              style={{
                marginLeft: 25,
                fontSize: 25,
                color: "#9ab4d2",
                background: "#080b1480",
                borderRadius: 9,
                padding: "8px 45px",
              }}
            >
              seu-proximo-site.com
            </div>
          </div>
          <div style={{ padding: 42 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                opacity: interpolate(f, [25, 40], [0, 1], ease),
              }}
            >
              <span style={{ fontWeight: 700, fontSize: 28 }}>
                NOVA<span style={{ color: BLUE }}>®</span>
              </span>
              <span style={{ fontSize: 25, color: "#9fb6d1" }}>
                SOBRE • PROJETOS ↗
              </span>
            </div>
            <div style={{ display: "flex", gap: 25, marginTop: 45 }}>
              <div
                style={{
                  width: 370,
                  translate: `0 ${interpolate(f, [36, 58], [40, 0], ease)}px`,
                  opacity: interpolate(f, [36, 52], [0, 1], ease),
                }}
              >
                <div
                  style={{
                    fontSize: 54,
                    lineHeight: 1.02,
                    fontWeight: 600,
                    letterSpacing: -2,
                  }}
                >
                  Sua próxima
                  <br />
                  grande ideia.
                </div>
                <div style={{ fontSize: 27, color: "#9eb1cc", marginTop: 18 }}>
                  Comece algo extraordinário.
                </div>
                <div
                  style={{
                    display: "inline-block",
                    background: BLUE,
                    borderRadius: 12,
                    padding: "14px 24px",
                    fontSize: 25,
                    marginTop: 25,
                  }}
                >
                  Explorar o futuro ↗
                </div>
              </div>
              <div
                style={{
                  position: "relative",
                  width: 280,
                  height: 260,
                  background: "radial-gradient(ellipse, #008cff44, #008cff05)",
                  borderRadius: 24,
                  scale: interpolate(f, [42, 72], [0.2, 1], ease),
                  opacity: interpolate(f, [42, 60], [0, 1], ease),
                }}
              >
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    style={{
                      position: "absolute",
                      width: 150,
                      height: 150,
                      left: 55,
                      top: 50,
                      border: `${i === 1 ? 18 : 2}px solid ${i === 1 ? BLUE : "#87d1ff"}`,
                      borderRadius: 25,
                      transform: `rotateX(50deg) rotateZ(${45 + f * 0.15 + i * 60}deg)`,
                      boxShadow: "0 20px 40px #008cff22",
                    }}
                  />
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: 15, marginTop: 28 }}>
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    height: 38,
                    flex: 1,
                    borderRadius: 9,
                    background: "#7396c01a",
                    scale: interpolate(
                      f,
                      [62 + i * 6, 85 + i * 6],
                      [0, 1],
                      ease,
                    ),
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            right: 10,
            top: 440,
            translate: `${interpolate(f, [30, 85], [150, 0], ease)}px ${interpolate(f, [30, 85], [100, 0], ease)}px`,
            opacity: interpolate(f, [30, 50], [0, 1], ease),
          }}
        >
          <svg width="46" height="55" viewBox="0 0 46 55">
            <path
              d="M4 3L40 32 25 34 20 49Z"
              fill="white"
              stroke={BLUE}
              strokeWidth="3"
            />
          </svg>
          <div
            style={{
              background: BLUE,
              padding: "7px 15px",
              borderRadius: 8,
              fontSize: 27,
              marginLeft: 32,
            }}
          >
            Você + IA
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
          translate: `0 ${interpolate(f, [52, 72], [35, 0], ease)}px`,
          opacity: interpolate(f, [52, 70], [0, 1], ease),
        }}
      >
        Ideia transformada em experiência
      </Chip>
    </SceneShell>
  );
};
