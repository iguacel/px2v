<script>
  import { onMount } from "svelte";
  import FileInfo from "$lib/components/core/FileInfo.svelte";
  import Options from "$lib/components/core/Options.svelte";
  import Reset from "$lib/components/core/Reset.svelte";
  import {
    fileStore,
    resetApp,
    svgContent,
    jsonContent,
  } from "$lib/components/core/store.js";

  let isPortrait = true;

  function updateViewport() {
    isPortrait = window.innerHeight > window.innerWidth;
  }

  onMount(() => {
    updateViewport();
    window.addEventListener("resize", updateViewport);
    return () => {
      window.removeEventListener("resize", updateViewport);
    };
  });
</script>

<div class="menu {isPortrait ? 'portrait' : 'landscape'}">
  <div class="content">
    <FileInfo {fileStore} />
    <Options {svgContent} {jsonContent} />
    <Reset {resetApp} />
  </div>
</div>

<style>
  .menu {
    width: 100%;
    height: 100vh;
    position: absolute;
    top: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: var(--padding);
    z-index: 0;
  }

  .content {
    width: 100%;
    background: var(--c-bg);
    background: var(--c-fg);
    color: var(--c-bg);
    transition: all 400ms;
  }

  .menu.portrait .content {
    width: 100%;
  }

  .menu.landscape .content {
    width: 320px;
    margin-left: auto;
  }
</style>
