<script>
  import Dropzone from "$lib/components/core/Dropzone.svelte";
  import Menu from "$lib/components/core/Menu.svelte";
  import Preview from "$lib/components/core/Preview.svelte";
  import {
    fileStore,
    svgContent,
    jsonContent,
    processFile,
    resetApp,
  } from "$lib/components/core/store.js";

  const handleFilesSelect = (event) => {
    const { acceptedFiles } = event.detail;
    if (acceptedFiles.length > 0) {
      processFile(acceptedFiles[0]);
    }
  };
</script>

{#if $fileStore === null}
  <Dropzone on:drop={handleFilesSelect} />
{:else}
  <Preview {svgContent} />
  <Menu {fileStore} {resetApp} {svgContent} {jsonContent} />
{/if}
