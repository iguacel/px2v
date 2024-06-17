import { writable } from "svelte/store";
import UPNG from "upng-js";
import chroma from "chroma-js";

export const fileStore = writable(null);
export const svgContent = writable("");
export const jsonContent = writable("");

export const options = writable({
  compoundPath: true,
  removeAlpha: true,
  preferViewBox: true,
  preferHex: true,
  minifyJSON: true,
});

const getColor = (r, g, b, a, preferHex) => {
  if (preferHex) {
    return chroma(r, g, b, a / 255).hex();
  } else {
    return `rgba(${r},${g},${b},${a / 255})`;
  }
};

const createSVG = (
  { width, height, colors },
  { removeAlpha, compoundPath, preferViewBox, preferHex }
) => {
  const squareSize = 1;
  let svgContent = `<svg ${
    preferViewBox
      ? `viewBox="0 0 ${width} ${height}" `
      : `width="${width}" height="${height}" `
  }xmlns="http://www.w3.org/2000/svg">\n`;

  if (compoundPath) {
    const paths = {};
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        const { r, g, b, a } = colors[idx];

        if (removeAlpha && a === 0) {
          continue;
        }

        const color = getColor(r, g, b, a, preferHex);
        if (!paths[color]) {
          paths[color] = [];
        }

        paths[color].push(
          `M${x},${y} h${squareSize} v${squareSize} h-${squareSize} Z`
        );
      }
    }

    for (const [color, pathCommands] of Object.entries(paths)) {
      svgContent += `<path d="${pathCommands.join(" ")}" fill="${color}" />\n`;
    }
  } else {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        const { r, g, b, a } = colors[idx];

        if (removeAlpha && a === 0) {
          continue;
        }

        const color = getColor(r, g, b, a, preferHex);
        svgContent += `<rect x="${x}" y="${y}" width="${squareSize}" height="${squareSize}" fill="${color}" />\n`;
      }
    }
  }

  svgContent += `</svg>`;
  return svgContent;
};

const createJSON = (imageData, minify) => {
  return minify
    ? JSON.stringify(imageData)
    : JSON.stringify(imageData, null, 2);
};

export const processFile = (file) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result);
    const png = UPNG.decode(data);
    const rgbaArrayBuffer = UPNG.toRGBA8(png)[0];

    if (!rgbaArrayBuffer) {
      console.error("Failed to convert PNG to RGBA format.");
      return;
    }

    const rgba = new Uint8Array(rgbaArrayBuffer);

    const colors = [];
    for (let y = 0; y < png.height; y++) {
      for (let x = 0; x < png.width; x++) {
        const idx = (png.width * y + x) * 4;
        const color = {
          r: rgba[idx],
          g: rgba[idx + 1],
          b: rgba[idx + 2],
          a: rgba[idx + 3],
        };
        colors.push(color);
      }
    }

    const imageData = {
      name: file.name,
      width: png.width,
      height: png.height,
      colors: colors,
    };

    fileStore.set(imageData);

    options.subscribe((opts) => {
      svgContent.set(createSVG(imageData, opts));
      jsonContent.set(createJSON(imageData, opts.minifyJSON));
    });
  };
  reader.readAsArrayBuffer(file);
};

export const resetApp = () => {
  fileStore.set(null);
  svgContent.set("");
  jsonContent.set("");
};
