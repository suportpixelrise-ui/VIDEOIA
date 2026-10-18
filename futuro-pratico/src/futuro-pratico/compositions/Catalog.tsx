import { AbsoluteFill, Sequence, useVideoConfig, staticFile } from "remotion";
import { loadFont } from "@remotion/fonts";
import {
  CharacterSprite,
  SceneBackground,
  TechObject,
  AssetOverlay,
} from "../components/Assets";
import { Caption, DebugSafeArea, Title } from "../components/Editorial";
import {
  ChatPanel,
  DemoChart,
  InfoCard,
  TechDashboard,
} from "../components/Interfaces";
import { EditorialLayout, type LayoutKind } from "../layouts";
import { Motion } from "../motion";
import { makeTimeline } from "../motion/timeline.mjs";
import { colors, typography } from "../theme";
loadFont({
  family: "Outfit",
  url: staticFile("fonts/Outfit.ttf"),
  weight: "100 900",
});
const scenes = [
  { id: "solo", durationSeconds: 3 },
  { id: "duo", durationSeconds: 3 },
  { id: "interface", durationSeconds: 3 },
  { id: "object", durationSeconds: 3 },
  { id: "reveal", durationSeconds: 3 },
] as const;
export const catalogTimeline = (fps: number) => makeTimeline([...scenes], fps);
export const CatalogScene = ({ kind }: { kind: LayoutKind }) => (
  <>
    <SceneBackground
      id={
        kind === "object"
          ? "cenarios.garagem"
          : kind === "reveal"
            ? "cenarios.laboratorio"
            : "cenarios.escritorio"
      }
      focal={[50, 45]}
      zoom={0.02}
    />
    <EditorialLayout kind={kind}>
      <Title kicker="FUTURO PRÁTICO · CATÁLOGO TÉCNICO">
        {
          {
            solo: "Uma personagem.",
            duo: "Duas perspectivas.",
            interface: "A interface conta.",
            object: "O objeto em foco.",
            reveal: "Uma nova pista.",
          }[kind]
        }
      </Title>
      <div style={{ fontSize: 30, marginTop: 24, color: colors.beige }}>
        Demonstração de componentes · sem episódio
      </div>
      {kind === "solo" && (
        <>
          <div style={{ position: "absolute", top: 300, left: 20, width: 760 }}>
            <InfoCard
              title="Curiosidade em cena"
              text="Sprite estático. Movimento de composição; sem atuação facial ou lip sync."
            />
          </div>
          <CharacterSprite
            character="personagem_1"
            pose="apresentando"
            x={140}
            y={660}
            height={650}
          />
        </>
      )}
      {kind === "duo" && (
        <>
          <div style={{ position: "absolute", top: 340, width: 828 }}>
            <InfoCard
              title="Diálogo visual"
              text="A direção original preserva acessórios. Espelhar exige revisão de continuidade."
            />
          </div>
          <CharacterSprite
            character="personagem_1"
            cropBottom={4}
            x={20}
            y={650}
            height={650}
          />
          <CharacterSprite
            character="personagem_2"
            pose="pensativo"
            x={405}
            y={650}
            height={650}
          />
        </>
      )}
      {kind === "interface" && (
        <>
          <div style={{ position: "absolute", top: 300, width: 828 }}>
            <ChatPanel
              messages={[
                { role: "human", text: "Como organizar esta ideia?" },
                { role: "assistant", text: "Vamos separar as etapas." },
              ]}
            />
          </div>
          <div style={{ position: "absolute", top: 850, width: 828 }}>
            <DemoChart values={[25, 55, 80]} labels={["A", "B", "C"]} />
          </div>
        </>
      )}
      {kind === "object" && (
        <>
          <TechObject
            id="objetos.robo"
            style={{
              position: "absolute",
              left: 170,
              top: 360,
              width: 490,
              height: 610,
            }}
          />
          <div style={{ position: "absolute", top: 1000, width: 828 }}>
            <TechDashboard
              heading="Inspeção do objeto"
              items={[
                { label: "Estado", value: "Ilustrativo" },
                { label: "Movimento", value: "Composição" },
              ]}
            />
          </div>
        </>
      )}
      {kind === "reveal" && (
        <>
          <div style={{ position: "absolute", top: 320, width: 828 }}>
            <InfoCard
              title="Descoberta ≠ evidência"
              text="A virada altera o que sabemos. Uma imagem fictícia não comprova um fato."
            />
          </div>
          <CharacterSprite
            character="personagem_2"
            pose="entusiasmado"
            x={30}
            y={660}
            height={650}
          />
          <TechObject
            id="objetos.chip"
            style={{
              position: "absolute",
              left: 500,
              top: 800,
              width: 270,
              height: 270,
            }}
          />
          <AssetOverlay
            id="overlays.moldura"
            style={{
              position: "absolute",
              left: 485,
              top: 780,
              width: 300,
              height: 310,
            }}
          />
        </>
      )}
    </EditorialLayout>
  </>
);
export const TechnicalCatalog = ({ debug = true }: { debug?: boolean }) => {
  const { fps } = useVideoConfig();
  const timeline = catalogTimeline(fps);
  return (
    <AbsoluteFill
      style={{
        background: colors.black,
        color: colors.white,
        fontFamily: typography.family,
      }}
    >
      {timeline.items.map((scene) => (
        <Sequence
          key={scene.id}
          from={scene.from}
          durationInFrames={scene.durationInFrames}
          premountFor={fps}
        >
          <Motion>
            <CatalogScene kind={scene.id} />
          </Motion>
        </Sequence>
      ))}
      <Caption
        cues={[{ start: 0, end: 15, text: "Material técnico· demonstração" }]}
      />
      <DebugSafeArea show={debug} />
    </AbsoluteFill>
  );
};
