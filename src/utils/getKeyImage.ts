import { Key } from "../hooks/useProfiles";
import { ModulesResolution } from "./initalise";

type KeyImageType = {
  width: number;
  height: number;
  key: number;
  config: Key;
  icon?: string;
  module: ModulesResolution[0];
};

export const getKeyImage = ({
  width,
  height,
  config,
  icon,
  module,
}: KeyImageType) => {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (config) {
    // print status first
    ctx.beginPath();
    ctx.lineWidth = 2;
    if (module?.loaded) {
      ctx.strokeStyle = ctx.fillStyle = "#04df04";
    } else if (module?.loaded === false) {
      ctx.strokeStyle = ctx.fillStyle = "#FF0000";
    } else {
      ctx.strokeStyle = ctx.fillStyle = "gray";
    }
    ctx.arc(6, 6, 1, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
    ctx.save();
    ctx.restore();

    // print the text
    ctx.textRendering = "geometricPrecision";
    ctx.letterSpacing = "1px";
    const fontSize = 10;
    ctx.font = `${fontSize}px "Arial"`;
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    const center = canvas.width / 2;
    ctx.fillText(config.title, center, canvas.height - 8, canvas.width);
    ctx.save();
    ctx.restore();

    // print the icon if its there
    if (icon) {
      const heightOffset = config.title ? 8 : 0;
      const scale = config.title ? 1.5 : 2;
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
      ctx.fillText(config.plugin, center, canvas.height - 32, canvas.width);
      // ctx.save();
      // ctx.restore();
    }
  }

  return {
    ctx,
    canvas,
  };

  // return ctx.getImageData(0, 0, canvas.width, canvas.height);

  // const id = ctx.getImageData(0, 0, canvas.width, canvas.height);
  // deck?.fillKeyBuffer(key, Buffer.from(id.data), {
  //   format: "rgba",
  // });

  // if (window.location.search.includes("debug")) {
  //   if (key == 0) {
  //     const data = canvas.toDataURL();
  //     document.getElementById("prev")?.setAttribute("src", data);
  //   }
  // }

  // ctx.restore();
};
