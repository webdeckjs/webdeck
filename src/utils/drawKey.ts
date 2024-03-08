import { Buffer } from "buffer";
import { Profile } from "../hooks/useProfiles";
import { PhysicalDeck } from "./physicalDeck";
import { usePlugins } from "../hooks/usePlugins";

export const drawKey = (
  deck: PhysicalDeck,
  key: number,
  profile: Profile,
  plugins: ReturnType<typeof usePlugins>
) => {
  const keyConf = profile.keys[key];
  const status = plugins.status[profile.keys[key]?.plugin];
  const plugin = profile.keys[key]?.plugin?.replaceAll("-", "_");
  const icon =
    plugins.manifest[plugin]?.icons?.[profile.keys[key]?.icon]?.icon ||
    plugins.manifest[plugin]?.icons?.["default"]?.icon;

  const canvas = document.createElement("canvas");
  canvas.width = deck?.ICON_SIZE || 0;
  canvas.height = deck?.ICON_SIZE || 0;
  const ctx = canvas.getContext("2d")!;
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (keyConf) {
    // print the text
    ctx.textRendering = "geometricPrecision";
    ctx.letterSpacing = "1px";
    const fontSize = 10;
    ctx.font = `${fontSize}px "Arial"`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    const center = canvas.width / 2;
    ctx.fillText(keyConf.title, center, canvas.height - 8, canvas.width);
    ctx.save();
    ctx.restore();

    // print the icon if its there
    if (icon) {
      const heightOffset = keyConf.title ? 8 : 0;
      const scale = keyConf.title ? 1.5 : 2;
      const imageWidth = 24 * scale;
      const imageHeight = 24 * scale;
      ctx.strokeStyle = "#FFF";
      // ctx.lineWidth = 1;
      ctx.fillStyle = "#FFF";
      const cw = center - imageWidth / 2;
      const ch = center - imageHeight / 2 - heightOffset;
      const p = new Path2D(icon);
      ctx.translate(cw, ch);
      ctx.scale(scale, scale);
      ctx.stroke(p);
      ctx.fill(p);
      ctx.save();
      ctx.restore();
    } else {
      // if no icon print name of plugin at least
      ctx.textRendering = "geometricPrecision";
      ctx.letterSpacing = "1px";
      const fontSize = 14;
      ctx.font = `${fontSize}px "Arial"`;
      (ctx.fontKerning = "none"), (ctx.fillStyle = "white");
      ctx.textAlign = "center";
      const center = canvas.width / 2;
      ctx.fillText(keyConf.plugin, center, canvas.height - 32, canvas.width);
      ctx.save();
      ctx.restore();
    }
  }

  if (status?.loaded === false) {
    console.log("not loaded");
  }

  const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
  deck?.fillKeyBuffer(key, Buffer.from(id.data), {
    format: "rgba",
  });

  if (window.location.search.includes("debug")) {
    if (key == 0) {
      const data = canvas.toDataURL();
      document.getElementById("prev")?.setAttribute("src", data);
    }
  }

  ctx.restore();
};
