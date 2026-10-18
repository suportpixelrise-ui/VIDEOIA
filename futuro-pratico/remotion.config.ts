/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import { Config } from "@remotion/cli/config";

Config.setRspack(true);
Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setDefaultPremountInSeconds(2);

// Use Chromium already provided by this cloud environment.
Config.setBrowserExecutable(
  process.env.REMOTION_BROWSER_EXECUTABLE || "/usr/bin/chromium",
);
Config.setCodec("h264");
Config.setPixelFormat("yuv420p");
Config.setCrf(17);
Config.setConcurrency(3);
