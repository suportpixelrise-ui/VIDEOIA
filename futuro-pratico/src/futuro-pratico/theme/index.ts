import production from "../../../config/futuro-pratico/production.json";
export const colors = {
  black: "#080810",
  blue: "#008CFF",
  white: "#FFFFFF",
  graphite: "#3A3F4B",
  beige: "#F5E9DC",
  orange: "#FF7A2E",
} as const;
export const typography = {
  family: "Outfit, Arial, sans-serif",
  title: 70,
  body: 38,
  caption: 44,
} as const;
export const spacing = { small: 16, medium: 32, large: 64 } as const;
export const safeArea = (
  width: number,
  height: number,
  override: Partial<typeof production.safeMargins> = {},
) => {
  const m = { ...production.safeMargins, ...override };
  return {
    left: (m.left * width) / 1080,
    right: (m.right * width) / 1080,
    top: (m.top * height) / 1920,
    bottom: (m.bottom * height) / 1920,
  };
};
