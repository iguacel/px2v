import UPNG from "upng-js";

export const processFile = (
  file,
  onSuccess,
  removeTransparent,
  useCompoundPaths
) => {
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = new Uint8Array(event.target.result);
      const png = UPNG.decode(data); // Decode the PNG
      const rgbaArrayBuffer = UPNG.toRGBA8(png)[0]; // Convert to RGBA format

      if (!rgbaArrayBuffer) {
        throw new Error("Failed to convert PNG to RGBA format.");
      }

      const rgba = new Uint8Array(rgbaArrayBuffer);
      const colors = extractColors(rgba, png.width, png.height);

      const imageData = {
        name: file.name,
        width: png.width,
        height: png.height,
        colors: colors,
      };
      const svgContent = createSVG(
        imageData,
        removeTransparent,
        useCompoundPaths
      );
      const jsonContent = createJSON(imageData);

      onSuccess(svgContent, jsonContent);
    } catch (error) {
      console.error(error.message);
    }
  };
  reader.readAsArrayBuffer(file);
};

const extractColors = (rgba, width, height) => {
  const colors = [];
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (width * y + x) * 4;
      const color = {
        r: rgba[idx],
        g: rgba[idx + 1],
        b: rgba[idx + 2],
        a: rgba[idx + 3],
      };
      colors.push(color);
    }
  }
  return colors;
};

export const createSVG = (imageData, removeTransparent, useCompoundPaths) => {
  const { width, height, colors } = imageData;
  const squareSize = 1;

  let svgContent = `<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">\n`;

  if (useCompoundPaths) {
    const paths = {};
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        const { r, g, b, a } = colors[idx];

        if (removeTransparent && a === 0) {
          continue; // Skip transparent pixels
        }

        const color = `rgba(${r},${g},${b},${a / 255})`;
        if (!paths[color]) {
          paths[color] = [];
        }

        // Add the rectangle as a path command
        paths[color].push(
          `M${x},${y} h${squareSize} v${squareSize} h-${squareSize} Z`
        );
      }
    }

    // Combine paths of the same color into a single path element
    for (const [color, pathCommands] of Object.entries(paths)) {
      svgContent += `<path d="${pathCommands.join(" ")}" fill="${color}" />\n`;
    }
  } else {
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = y * width + x;
        const { r, g, b, a } = colors[idx];

        if (removeTransparent && a === 0) {
          continue; // Skip transparent pixels
        }

        const color = `rgba(${r},${g},${b},${a / 255})`;
        svgContent += `<rect x="${x}" y="${y}" width="${squareSize}" height="${squareSize}" fill="${color}" />\n`;
      }
    }
  }

  svgContent += `</svg>`;
  return svgContent;
};

export const createJSON = (imageData) => {
  return JSON.stringify(imageData, null, 2);
};
