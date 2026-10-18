import { colors } from "../theme";
const panel = {
  background: "#080810ed",
  border: "2px solid #008CFF",
  borderRadius: 28,
  padding: 32,
  color: colors.white,
};
export const InfoCard = ({ title, text }: { title: string; text: string }) => (
  <section style={panel}>
    <h2 style={{ fontSize: 40, margin: "0 0 20px" }}>{title}</h2>
    <div style={{ fontSize: 31, lineHeight: 1.35 }}>{text}</div>
  </section>
);
export const ChatPanel = ({
  messages,
}: {
  messages: { role: "human" | "assistant"; text: string }[];
}) => (
  <section style={panel}>
    <div style={{ fontSize: 24, color: colors.orange, marginBottom: 25 }}>
      CHAT · EXEMPLO FICTÍCIO
    </div>
    {messages.map((m, i) => (
      <div
        key={i}
        style={{
          fontSize: 32,
          padding: 22,
          borderRadius: 20,
          background: m.role === "human" ? "#3A3F4B" : "#008CFF33",
          marginBottom: 18,
          marginLeft: m.role === "human" ? 60 : 0,
          marginRight: m.role === "assistant" ? 40 : 0,
        }}
      >
        {m.text}
      </div>
    ))}
  </section>
);
export const DemoChart = ({
  values,
  labels,
}: {
  values: number[];
  labels: string[];
}) => {
  if (
    values.length !== labels.length ||
    values.some((v) => !Number.isFinite(v) || v < 0 || v > 100)
  )
    throw new Error("Demo chart expects matching labels and 0–100 values");
  return (
    <section style={panel}>
      <div style={{ fontSize: 25, color: colors.orange }}>
        DADOS DEMONSTRATIVOS · SEM EVIDÊNCIA FACTUAL
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "end",
          gap: 30,
          height: 250,
          marginTop: 30,
        }}
      >
        {values.map((v, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 25 }}>
            <div>{v}</div>
            <div
              style={{
                height: v * 1.7,
                background: colors.blue,
                borderRadius: "12px 12px 0 0",
                marginTop: 10,
              }}
            />
            <div>{labels[i]}</div>
          </div>
        ))}
      </div>
    </section>
  );
};
export const TechDashboard = ({
  heading,
  items,
}: {
  heading: string;
  items: { label: string; value: string }[];
}) => (
  <section style={panel}>
    <div style={{ fontSize: 24, color: colors.orange }}>
      PAINEL · EXEMPLO FICTÍCIO
    </div>
    <h2 style={{ fontSize: 40 }}>{heading}</h2>
    {items.map((i) => (
      <div
        key={i.label}
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 30,
          padding: "20px 0",
          borderTop: "1px solid #3A3F4B",
        }}
      >
        <span>{i.label}</span>
        <strong>{i.value}</strong>
      </div>
    ))}
  </section>
);
