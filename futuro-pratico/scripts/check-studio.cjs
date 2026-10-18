const { openBrowser } = require("@remotion/renderer");
const fs = require("node:fs");
const composition = process.env.REMOTION_COMPOSITION || "FuturoPratico";
const advanced = composition === "FuturoPraticoTeste02";
const roadster = composition === "FuturoPraticoRoadster";
const plan = roadster
  ? require("../src/teste03/plan.json")
  : advanced
    ? require("../src/teste02/plan.json")
    : require("../src/narration-plan.json");
(async () => {
  const browser = await openBrowser("chrome", {
    browserExecutable: "/usr/bin/chromium",
  });
  try {
    const page = await browser.newPage({
      context: () => null,
      logLevel: "error",
      indent: false,
      pageIndex: 0,
      onBrowserLog: null,
      onLog: () => {},
    });
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    await page.setViewport({ width: 1440, height: 1100, deviceScaleFactor: 1 });
    await page.goto({
      url: `http://localhost:3000/${composition}`,
      timeout: 30000,
      options: { waitUntil: "load" },
    });
    await new Promise((r) => setTimeout(r, 4000));
    const info = await page.evaluate(() => ({
      title: document.title,
      text: document.body.innerText.slice(0, 4000),
    }));
    console.log(JSON.stringify({ info, errors }, null, 2));
    const shot = await page
      ._client()
      .send("Page.captureScreenshot", { format: "png" });
    fs.writeFileSync(
      roadster
        ? "out/roadster-studio-review.png"
        : advanced
          ? "out/teste02-studio-review.png"
          : "out/studio-review.png",
      Buffer.from(shot.value.data, "base64"),
    );
    if (
      errors.length ||
      !info.text.includes(
        `${String(Math.floor(plan.durationInFrames / 30 / 60)).padStart(2, "0")}:${(Math.floor(plan.durationInFrames / 30) % 60).toString().padStart(2, "0")}.`,
      ) ||
      !info.text.includes(
        roadster ? "ELE SAIU" : advanced ? "COPIAR." : "VOCÊ AINDA",
      )
    )
      process.exitCode = 1;
  } finally {
    await browser.close({ silent: true });
  }
})().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
