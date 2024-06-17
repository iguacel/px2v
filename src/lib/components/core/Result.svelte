<script>
  import fileSaver from "file-saver";
  import { svgContent, jsonContent } from "$lib/components/core/store.js";

  const { saveAs } = fileSaver;

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

{#if $svgContent || $jsonContent}
  <div class="result">
    <h3>Download Options:</h3>
    {#if $svgContent}
      <button on:click={downloadSVG}>Download SVG</button>
    {/if}
    {#if $jsonContent}
      <button on:click={downloadJSON}>Download JSON</button>
    {/if}
  </div>
{/if}

<style>
  .result {
    margin-top: 20px;
  }
</style>
