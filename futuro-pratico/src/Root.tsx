import { TechnicalCatalog } from "./futuro-pratico/compositions/Catalog";
import { catalogTimeline } from "./futuro-pratico/compositions/Catalog";
import roadsterPlan from "./teste03/plan.json";
import { Roadster } from "./teste03/Roadster";
import teste02Plan from "./teste02/plan.json";
import { Teste02 } from "./teste02/Teste02";
import plan from "./narration-plan.json";
import { Composition, Folder } from "remotion";
import { FuturoPratico } from "./Composition";
import { Opening } from "./scenes/Opening";
import { Websites } from "./scenes/Websites";
import { Automation } from "./scenes/Automation";
import { Content } from "./scenes/Content";
import { Closing } from "./scenes/Closing";
export const RemotionRoot = () => (
  <>
    <Composition
      id="FPCatalogoTecnico"
      component={TechnicalCatalog}
      width={1080}
      height={1920}
      fps={24}
      durationInFrames={catalogTimeline(24).durationInFrames}
      defaultProps={{ debug: true }}
    />
    <Composition
      id="FuturoPraticoRoadster"
      component={Roadster}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={roadsterPlan.durationInFrames}
    />
    <Composition
      id="FuturoPraticoTeste02"
      component={Teste02}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={teste02Plan.durationInFrames}
    />
    <Composition
      id="FuturoPratico"
      component={FuturoPratico}
      width={1080}
      height={1920}
      fps={30}
      durationInFrames={plan.durationInFrames}
    />
    <Folder name="Cenas">
      <Composition
        id="Abertura"
        component={Opening}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={plan.sceneDurations[0]}
      />
      <Composition
        id="CriarSites"
        component={Websites}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={plan.sceneDurations[1]}
      />
      <Composition
        id="AutomatizarTarefas"
        component={Automation}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={plan.sceneDurations[2]}
      />
      <Composition
        id="CriarConteudos"
        component={Content}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={plan.sceneDurations[3]}
      />
      <Composition
        id="Encerramento"
        component={Closing}
        width={1080}
        height={1920}
        fps={30}
        durationInFrames={plan.sceneDurations[4]}
      />
    </Folder>
  </>
);
