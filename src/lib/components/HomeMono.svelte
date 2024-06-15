<script>
  import Dropzone from "svelte-file-dropzone";
  import UPNG from "upng-js";
  import fileSaver from "file-saver";

  const { saveAs } = fileSaver;

  let files = {
    accepted: [],
    rejected: [],
  };
  let svgContent = "";
  let jsonContent = "";

  function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];

    if (files.accepted.length > 0) {
      processFile(files.accepted[0]);
    }
  }

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const png = UPNG.decode(data); // Decode the PNG
      const rgbaArrayBuffer = UPNG.toRGBA8(png)[0]; // Convert to RGBA format

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

      console.log("Decoded PNG data:", png);
      console.log("Extracted colors:", colors.slice(0, 10)); // Debug log for colors

      const imageData = {
        name: file.name,
        width: png.width,
        height: png.height,
        colors: colors,
      };
      svgContent = createSVG(imageData, true, true); // Update svgContent
      createJSON(imageData);
    };
    reader.readAsArrayBuffer(file);
  };

  const createSVG = (
    imageData,
    removeTransparent = true,
    useCompoundPaths = true
  ) => {
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

  const createJSON = (imageData) => {
    jsonContent = JSON.stringify(imageData, null, 2);
  };

  const downloadSVG = () => {
    const blob = new Blob([svgContent], {
      type: "image/svg+xml;charset=utf-8",
    });
    saveAs(blob, "image.svg");
  };

  const downloadJSON = () => {
    const blob = new Blob([jsonContent], {
      type: "application/json;charset=utf-8",
    });
    saveAs(blob, "image.json");
  };
</script>

<Dropzone on:drop={handleFilesSelect} accept="image/png">
  <div class="dropzone">Drop your image here</div>
</Dropzone>

{#if files.accepted.length > 0}
  <div class="file-list">
    <h3>Accepted Files:</h3>
    <ul>
      {#each files.accepted as file}
        <li>{file.name}</li>
      {/each}
    </ul>
  </div>
{/if}

{#if svgContent || jsonContent}
  <div class="result">
    <h3>Download Options:</h3>
    {#if svgContent}
      <button on:click={downloadSVG}>Download SVG</button>
    {/if}
    {#if jsonContent}
      <button on:click={downloadJSON}>Download JSON</button>
    {/if}
  </div>
{/if}

<style>
  .dropzone {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    margin: 20px 0;
    cursor: pointer;
  }
  .file-list {
    margin-top: 20px;
  }
  .result {
    margin-top: 20px;
  }
</style>
