export {
  CharacterSprite,
  SceneBackground,
  TechObject,
  AssetOverlay,
  assetById,
} from "./components/Assets";
export type { Character, Pose } from "./components/Assets";
export { Title, Caption, DebugSafeArea } from "./components/Editorial";
export {
  ChatPanel,
  TechDashboard,
  DemoChart,
  InfoCard,
} from "./components/Interfaces";
export { EditorialLayout } from "./layouts";
export type { LayoutKind } from "./layouts";
export { Motion } from "./motion";
export { makeTimeline, framesFor, captionErrors } from "./motion/timeline.mjs";
export { colors, typography, spacing, safeArea } from "./theme";
export { TechnicalCatalog } from "./compositions/Catalog";
export { ProductionEpisode } from "./compositions/Episode";
export type {
  EpisodeView,
  EpisodeProps,
  ProductionScene,
} from "./schemas/types";
