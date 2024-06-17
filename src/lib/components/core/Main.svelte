<script>
  import Dropzone from "$lib/components/core/Dropzone.svelte";
  import Menu from "$lib/components/core/Menu.svelte";
  import Preview from "$lib/components/core/Preview.svelte";
  import { writable } from "svelte/store";
  import UPNG from "upng-js";

  let fileStore = writable(null);
  let svgContent = writable("");
  let jsonContent = writable("");

  const handleFilesSelect = (event) => {
    const { acceptedFiles, fileRejections } = event.detail;
    if (acceptedFiles.length > 0) {
      processFile(acceptedFiles[0]);
    }
  };

  const processFile = (file) => {
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
      svgContent.set(createSVG(imageData, true, true));
      createJSON(imageData);
    };
    reader.readAsArrayBuffer(file);
  };

  const createSVG = (
    imageData,
    removeTransparent = true,
    useCompoundPaths = true,
    hardcodeWidthHeight = false,
  ) => {
    const { width, height, colors } = imageData;
    const squareSize = 1;
    let svgContent = `<svg ${hardcodeWidthHeight ? `width="${width}" height="${height}" ` : ""}viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">\n`;

    if (useCompoundPaths) {
      const paths = {};
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = y * width + x;
          const { r, g, b, a } = colors[idx];

          if (removeTransparent && a === 0) {
            continue;
          }

          const color = `rgba(${r},${g},${b},${a / 255})`;
          if (!paths[color]) {
            paths[color] = [];
          }

          paths[color].push(
            `M${x},${y} h${squareSize} v${squareSize} h-${squareSize} Z`,
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

          if (removeTransparent && a === 0) {
            continue;
          }

          const color = `rgba(${r},${g},${b},${a / 255})`;
          svgContent += `<rect x="${x}" y="${y}" width="${squareSize}" height="${squareSize}" fill="${color}" />\n`;
        }
      }
    }

    svgContent += `</svg>`;
    return svgContent;
  };

  const createJSON = (imageData) => {
    jsonContent.set(JSON.stringify(imageData, null, 2));
  };

  const resetApp = () => {
    fileStore.set(null);
    svgContent.set("");
    jsonContent.set("");
  };
</script>

{#if $fileStore === null}
  <Dropzone on:drop={handleFilesSelect} />
{:else}
  <Preview {svgContent} />
  <Menu {fileStore} {resetApp} {svgContent} {jsonContent} />
{/if}
