import React from "react";
import { interpolate } from "remotion";
import { BLUE, ease, linear, Mark, panel } from "../design";
import { chapters, local, progress, word } from "./timing";

export const Surface: React.FC<{
  x: number;
  y?: number;
  width?: number;
  height?: number;
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ x, y = 0, width = 780, height = 510, children, style }) => (
  <div
    style={{
      ...panel,
      position: "absolute",
      left: x - width / 2,
      top: y - height / 2,
      width,
      height,
      boxSizing: "border-box",
      background: "linear-gradient(135deg,#192b45f7,#0b1324f7)",
      border: "1.5px solid #567da080",
      borderRadius: 30,
      boxShadow: "0 30px 65px #0007, inset 0 1px 0 #ffffff18",
      ...style,
    }}
  >
    {children}
  </div>
);
const Topbar: React.FC<{ title: string; icon?: string; color?: string }> = ({
  title,
  icon = "↗",
  color = BLUE,
}) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      gap: 18,
      padding: "24px 32px",
      borderBottom: "1px solid #49638366",
    }}
  >
    <span
      style={{
        width: 45,
        height: 45,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: color + "22",
        color,
        borderRadius: 13,
        fontSize: 29,
      }}
    >
      {icon}
    </span>
    <span style={{ fontSize: 28, fontWeight: 550, letterSpacing: 1 }}>
      {title}
    </span>
    <span style={{ marginLeft: "auto", fontSize: 22, color: "#a3bad6" }}>
      PEDIDO 01
    </span>
  </div>
);
const Badge: React.FC<{
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, color = BLUE, style }) => (
  <div
    style={{
      display: "inline-flex",
      gap: 10,
      alignItems: "center",
      border: `1px solid ${color}88`,
      background: color + "15",
      color,
      padding: "10px 16px",
      borderRadius: 14,
      fontSize: 26,
      fontWeight: 550,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Email: React.FC<{ f: number }> = ({ f }) => {
  const t = local(f, 3);
  const extract = progress(t, 8, 80);
  return (
    <Surface
      x={0}
      style={{
        transform: `rotateY(${Math.sin(f / 100) * 2}deg) rotateZ(-1deg)`,
      }}
    >
      <Topbar title="CAIXA DE ENTRADA" icon="✉" />
      <div style={{ padding: "30px 36px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 17,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 60,
              background: "#008cff25",
              color: BLUE,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 25,
            }}
          >
            C
          </div>
          <div>
            <div style={{ fontSize: 30, fontWeight: 600 }}>
              Cliente • novo pedido
            </div>
            <div style={{ fontSize: 22, color: "#a4bbd6" }}>
              Exemplo com dados fictícios
            </div>
          </div>
        </div>
        <div style={{ fontSize: 44, lineHeight: 1.32, letterSpacing: -0.7 }}>
          Olá! Preciso de uma
          <br />
          <span
            style={{
              background: `rgba(0,140,255,${extract * 0.25})`,
              borderBottom: `${extract * 3}px solid ${BLUE}`,
            }}
          >
            proposta
          </span>{" "}
          para{" "}
          <span
            style={{
              background: `rgba(0,140,255,${extract * 0.25})`,
              borderBottom: `${extract * 3}px solid ${BLUE}`,
            }}
          >
            sexta.
          </span>
        </div>
        <div style={{ marginTop: 27, display: "flex", gap: 14 }}>
          <Badge>✦ Solicitação recebida</Badge>
          <span style={{ fontSize: 23, color: "#9db5d1", alignSelf: "center" }}>
            Sem resposta enviada
          </span>
        </div>
      </div>
    </Surface>
  );
};

export const ManualCopies: React.FC<{ f: number }> = ({ f }) => {
  const t = local(f, 1);
  const alpha = interpolate(
    t,
    [
      -15,
      0,
      chapters[1].durationInFrames - 12,
      chapters[1].durationInFrames + 20,
    ],
    [0, 1, 1, 0],
    linear,
  );
  const p = (Math.max(t, 0) % 90) / 90;
  return (
    <div style={{ opacity: alpha }}>
      <Surface
        x={790}
        y={-210}
        width={490}
        height={295}
        style={{ transform: "rotateZ(6deg)" }}
      >
        <Topbar title="PLANILHA" icon="▦" />
        <div style={{ padding: 20, fontSize: 27, color: "#b5cce4" }}>
          Assunto • Prazo
          <div style={{ height: 2, background: "#456181", margin: "16px 0" }} />
          <div
            style={{ background: "#008cff1a", padding: 13, borderRadius: 8 }}
          >
            Proposta • Sexta
          </div>
        </div>
      </Surface>
      <Surface
        x={790}
        y={235}
        width={490}
        height={290}
        style={{ transform: "rotateZ(-4deg)" }}
      >
        <Topbar title="NOVA RESPOSTA" icon="↗" />
        <div style={{ padding: 24, fontSize: 28, lineHeight: 1.3 }}>
          Olá! Recebi seu pedido
          <span style={{ color: BLUE }}>{t % 35 > 17 ? "▏" : ""}</span>
          <div
            style={{
              height: 8,
              width: 250,
              background: "#5c7f9d55",
              marginTop: 25,
              borderRadius: 6,
            }}
          />
        </div>
      </Surface>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: interpolate((p + i / 3) % 1, [0, 1], [220, 620], linear),
            top: interpolate(
              (p + i / 3) % 1,
              [0, 0.5, 1],
              [-120, -200, 160],
              linear,
            ),
            padding: "13px 20px",
            background: "#d7ecff",
            color: "#123253",
            fontSize: 23,
            whiteSpace: "nowrap",
            borderRadius: 12,
            boxShadow: "0 12px 30px #0005",
            opacity: Math.sin(((p + i / 3) % 1) * Math.PI),
          }}
        >
          Ctrl + C → Ctrl + V
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          left: 250,
          top: 410,
          width: 650,
          height: 60,
          fontSize: 34,
          color: "#c1d4eb",
          textAlign: "center",
        }}
      >
        Ler → copiar → cadastrar → responder
      </div>
    </div>
  );
};

export const Extracted: React.FC<{ f: number }> = ({ f }) => {
  const t = local(f, 3);
  const p = progress(
    t,
    word(3, "assunto", 5.2) - 8,
    word(3, "prazo", 5.8) + 18,
  );
  return (
    <Surface x={1200} width={650} height={520}>
      <Topbar title="ENTENDER + ESTRUTURAR" icon="✦" />
      <div style={{ padding: 32 }}>
        <div
          style={{
            fontSize: 23,
            letterSpacing: 4,
            color: "#9cb6d4",
            marginBottom: 24,
          }}
        >
          INFORMAÇÕES DO PEDIDO
        </div>
        {["Assunto", "Prazo"].map((label, i) => (
          <div
            key={label}
            style={{
              border: "1px solid #3a648c",
              borderRadius: 17,
              padding: "18px 23px",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              opacity: interpolate(
                t,
                [
                  word(3, i === 0 ? "assunto" : "prazo", 5 + i * 0.6) - 8,
                  word(3, i === 0 ? "assunto" : "prazo", 5 + i * 0.6) + 12,
                ],
                [0.25, 1],
                ease,
              ),
            }}
          >
            <span style={{ fontSize: 29, color: "#b7cce5" }}>{label}</span>
            <span style={{ fontSize: 38, fontWeight: 600, color: "white" }}>
              {t < word(3, i === 0 ? "assunto" : "prazo", 5 + i * 0.6) - 3
                ? "—"
                : i === 0
                  ? "Proposta"
                  : "Sexta"}{" "}
              <span
                style={{
                  color: BLUE,
                  fontSize: 26,
                  opacity:
                    t >= word(3, i === 0 ? "assunto" : "prazo", 5 + i * 0.6) - 3
                      ? 1
                      : 0,
                }}
              >
                ✓
              </span>
            </span>
          </div>
        ))}
        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          <Badge>IA interpreta</Badge>
          <Badge>Regras validam</Badge>
        </div>
        <div
          style={{
            height: 4,
            marginTop: 24,
            background: "#223d59",
            borderRadius: 10,
          }}
        >
          <div
            style={{
              width: `${Math.max(0.15, p) * 100}%`,
              height: 4,
              background: BLUE,
              boxShadow: "0 0 15px #008cff66",
            }}
          />
        </div>
      </div>
    </Surface>
  );
};

export const Task: React.FC<{ f: number }> = ({ f }) => {
  const t = local(f, 4);
  const start = word(4, "tarefa", 1.5);
  const p = progress(t, start - 14, start + 15);
  return (
    <Surface x={2400} y={-140} width={730} height={500}>
      <Topbar title="QUADRO DE TAREFAS" icon="▦" />
      <div style={{ padding: 32 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 25,
            color: "#abc2dd",
            marginBottom: 22,
          }}
        >
          <span>A FAZER</span>
          <span>EM ANDAMENTO</span>
          <span>CONCLUÍDO</span>
        </div>
        <div
          style={{
            border: "1px solid #008cff88",
            borderLeft: `6px solid ${BLUE}`,
            borderRadius: 18,
            padding: 27,
            background: "#008cff12",
            translate: `0 ${(1 - p) * 65}px`,
            opacity: p,
          }}
        >
          <div style={{ fontSize: 40, fontWeight: 600 }}>Preparar proposta</div>
          <div style={{ fontSize: 29, marginTop: 18, color: "#bfd0e5" }}>
            Prazo: sexta • Origem: e-mail
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 25 }}>
            <Badge>Cadastro criado</Badge>
            <span
              style={{ fontSize: 24, color: "#a9c3df", alignSelf: "center" }}
            >
              ↗ Ligado ao pedido
            </span>
          </div>
        </div>
        <div style={{ marginTop: 23, fontSize: 24, color: "#93abc6" }}>
          Uma tarefa. Sem copiar os campos de novo.
        </div>
      </div>
    </Surface>
  );
};

export const Draft: React.FC<{ f: number }> = ({ f }) => {
  const t = local(f, 4);
  const start = word(4, "resposta", 4.2);
  const message =
    "Olá! Recebi seu pedido de proposta para sexta. Vou revisar as informações e confirmar os próximos passos.";
  const count = Math.round(
    interpolate(t, [start - 5, start + 90], [0, message.length], linear),
  );
  return (
    <Surface x={3600} y={80} width={760} height={620}>
      <Topbar title="RASCUNHO DE RESPOSTA" icon="✎" />
      <div style={{ padding: "26px 34px" }}>
        <div
          style={{
            fontSize: 25,
            color: "#b7cce5",
            paddingBottom: 18,
            borderBottom: "1px solid #35516e",
          }}
        >
          Re: proposta para sexta
        </div>
        <div
          style={{
            fontSize: 37,
            lineHeight: 1.34,
            marginTop: 26,
            minHeight: 210,
          }}
        >
          {message.slice(0, count)}
          <span style={{ color: BLUE, opacity: t % 28 > 14 ? 0 : 1 }}>▏</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 22,
          }}
        >
          <Badge>✦ Gerado para revisar</Badge>
          <span
            style={{
              padding: "13px 22px",
              borderRadius: 14,
              background: "#2c4058",
              color: "#9bb0c9",
              fontSize: 27,
            }}
          >
            Envio bloqueado 🔒
          </span>
        </div>
      </div>
    </Surface>
  );
};

export const Review: React.FC<{ f: number }> = ({ f }) => {
  const t = local(f, 5);
  const missing = word(5, "faltou", 5.2);
  const revise = word(5, "revisão", 8.2);
  const exception = progress(t, missing - 8, missing + 12);
  const validated = progress(t, revise + 15, revise + 55);
  return (
    <>
      <Surface x={4800} width={760} height={515}>
        <Topbar title="REVISÃO HUMANA" icon="◈" />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            padding: 36,
          }}
        >
          <div
            style={{
              width: 150,
              height: 160,
              border: "2px solid #008cff88",
              borderRadius: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "radial-gradient(ellipse,#008cff33,transparent)",
              transform: `rotateY(${Math.sin(f / 55) * 9}deg)`,
            }}
          >
            <svg width="78" height="95" viewBox="0 0 78 95" fill="none">
              <rect x="12" y="36" width="54" height="48" rx="10" fill={BLUE} />
              <path
                d="M23 36V22a16 16 0 0132 0v14"
                stroke="white"
                strokeWidth="7"
              />
              <circle cx="39" cy="58" r="5" fill="white" />
              <path d="M39 58v12" stroke="white" strokeWidth="4" />
            </svg>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 43, lineHeight: 1.05, fontWeight: 600 }}>
              Sua aprovação
              <br />
              vem primeiro.
            </div>
            <div
              style={{
                fontSize: 28,
                lineHeight: 1.3,
                color: "#b7cbe5",
                marginTop: 18,
              }}
            >
              Confira o pedido, a tarefa
              <br />e o rascunho.
            </div>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            margin: "0 36px",
          }}
        >
          <div
            style={{
              padding: "17px 26px",
              borderRadius: 17,
              background: BLUE,
              fontSize: 30,
              fontWeight: 600,
            }}
          >
            Revisar rascunho ↗
          </div>
          <div style={{ fontSize: 25, color: "#bed0e8" }}>Nada enviado</div>
        </div>
      </Surface>
      <div
        style={{
          position: "absolute",
          left: 4785,
          top: 260,
          width: 3,
          height: 190,
          background: "linear-gradient(#008cff,#ffc477)",
          scale: `1 ${exception}`,
          transformOrigin: "top",
        }}
      />
      <Surface
        x={4800}
        y={590}
        width={710}
        height={215}
        style={{
          borderColor: "#ffc47799",
          opacity: exception,
          translate: `0 ${(1 - exception) * 40}px`,
        }}
      >
        <div
          style={{
            padding: 30,
            display: "flex",
            gap: 20,
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: 55, color: "#ffc477" }}>!</span>
          <div>
            <div style={{ fontSize: 35, fontWeight: 600, color: "#ffd49c" }}>
              Faltou informação?
            </div>
            <div style={{ fontSize: 28, color: "#c8d8e9", marginTop: 10 }}>
              {validated > 0.7
                ? "Encaminhar para uma pessoa."
                : "Pausar. Pedir revisão. Não inventar."}
            </div>
          </div>
        </div>
      </Surface>
    </>
  );
};

export const Comparison: React.FC<{ f: number }> = ({ f }) => {
  const t = local(f, 6);
  const p = progress(t, 15, 160);
  return (
    <Surface x={6150} width={850} height={670}>
      <Topbar title="COMPARE O PROCESSO" icon="↗" />
      <div style={{ padding: "30px 36px" }}>
        <div style={{ fontSize: 29, color: "#b4c7df", marginBottom: 16 }}>
          ANTES • VOCÊ EXECUTA CADA PASSO
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {["Ler", "Copiar", "Cadastrar", "Responder"].map((s, i) => (
            <div
              key={s}
              style={{
                flex: 1,
                border: "1px solid #60718a",
                background: "#7e8eaa15",
                height: 105,
                borderRadius: 16,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 12,
              }}
            >
              <span
                style={{
                  fontSize: 29,
                  color: t > i * 27 ? "white" : "#7d92ae",
                }}
              >
                ↗
              </span>
              <span style={{ fontSize: 26 }}>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 29, color: BLUE, margin: "32px 0 16px" }}>
          NESTE EXEMPLO • ETAPAS ENCADEADAS
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          <div
            style={{
              flex: 1,
              background: "#008cff1a",
              border: "1px solid #008cff88",
              borderRadius: 18,
              height: 105,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 31,
              gap: 12,
            }}
          >
            <span style={{ color: BLUE }}>✦</span> Execução do fluxo{" "}
            <span style={{ color: BLUE }}>→</span>
          </div>
          <div
            style={{
              background: BLUE,
              padding: "35px 20px",
              borderRadius: 18,
              fontSize: 28,
              fontWeight: 600,
            }}
          >
            Você revisa
          </div>
        </div>
        <div style={{ height: 4, background: "#233c58", marginTop: 32 }}>
          <div style={{ height: 4, width: `${p * 100}%`, background: BLUE }} />
        </div>
        <div
          style={{
            fontSize: 31,
            lineHeight: 1.3,
            color: "#c0d3e9",
            marginTop: 24,
          }}
        >
          Meça o tempo real.
          <br />
          Inclua revisão e correções.
        </div>
        <div style={{ fontSize: 23, color: "#8eabc9", marginTop: 15 }}>
          Comparação de etapas • não é um benchmark
        </div>
      </div>
    </Surface>
  );
};

export const Finale: React.FC<{ f: number }> = ({ f }) => {
  const t = local(f, 7);
  const question = word(7, "qual", 5.0);
  return (
    <div
      style={{
        position: "absolute",
        left: 7500 - 420,
        top: -340,
        width: 840,
        height: 680,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 260,
          top: -10,
          width: 320,
          height: 320,
          border: "1px solid #008cff66",
          background: "radial-gradient(ellipse,#008cff20,transparent)",
          borderRadius: 65,
          transform: `rotateX(18deg) rotateZ(${45 + Math.sin(f / 80) * 3}deg)`,
          boxShadow: "0 0 65px #008cff15",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 315,
          top: 50,
          scale: progress(t, -5, 30),
        }}
      >
        <Mark size={210} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 360,
          display: "flex",
          gap: 13,
        }}
      >
        {["Uma tarefa", "Dados fictícios", "Revisão"].map((s, i) => (
          <div
            key={s}
            style={{
              flex: 1,
              background: "#0e2037",
              border: "1px solid #365a7f",
              padding: "18px 10px",
              borderRadius: 18,
              textAlign: "center",
              fontSize: 28,
              opacity: progress(t, 10 + i * 25, 30 + i * 25),
              translate: `0 ${(1 - progress(t, 10 + i * 25, 35 + i * 25)) * 30}px`,
            }}
          >
            <span style={{ color: BLUE }}>0{i + 1}</span>
            <br />
            {s}
          </div>
        ))}
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 505,
          fontSize: 43,
          textAlign: "center",
          fontWeight: 550,
          opacity: progress(t, question - 10, question + 10),
        }}
      >
        Qual tarefa você automatizaria?
      </div>
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          top: 585,
          textAlign: "center",
          fontSize: 34,
          color: "#bdcfe6",
          letterSpacing: 2,
          opacity: progress(t, question + 20, question + 40),
        }}
      >
        FUTURO <span style={{ color: BLUE }}>PRÁTICO</span>
      </div>
    </div>
  );
};
