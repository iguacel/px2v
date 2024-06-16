<script>
  import { writable } from "svelte/store";

  export let svgContent;
  export let jsonContent;

  let compoundPath = writable(true);
  let removeAlpha = writable(true);
  let preferViewBox = writable(true);
  let minifyJSON = writable(false);

  const downloadSVG = () => {
    const blob = new Blob([svgContent], {
      type: "image/svg+xml;charset=utf-8",
    });
    saveAs(blob, "image.svg");
  };

  const downloadJSON = () => {
    const json = minifyJSON
      ? JSON.stringify(JSON.parse(jsonContent))
      : jsonContent;
    const blob = new Blob([json], {
      type: "application/json;charset=utf-8",
    });
    saveAs(blob, "image.json");
  };
</script>

<div class="options-wrapper">
  <div class="option-column">
    <button class="option-button" on:click={downloadSVG}>SVG</button>
    <label
      ><input type="checkbox" bind:checked={$compoundPath} /> Compound Path</label
    >
    <label
      ><input type="checkbox" bind:checked={$removeAlpha} /> Remove Alpha</label
    >
    <label
      ><input type="checkbox" bind:checked={$preferViewBox} /> Prefer ViewBox</label
    >
  </div>
  <div class="option-column">
    <button class="option-button" on:click={downloadJSON}>JSON</button>
    <label
      ><input type="checkbox" bind:checked={$minifyJSON} /> Minify JSON</label
    >
  </div>
</div>

<style>
  .options-wrapper {
    display: flex;
    justify-content: space-between;
  }

  .option-column {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .option-button {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>