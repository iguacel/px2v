<script>
  import "$lib/styles/global.css";

  import { onMount } from "svelte";
  import ToggleTheme from "$lib/components/ToggleTheme.svelte";
  import { isDev } from "$lib/stores/dev";

  function toggleDevMode() {
    isDev.update((value) => !value);
  }

  function handleKeydown(event) {
    if (event.key.toLowerCase() === "d") {
      toggleDevMode();
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });
</script>

<ToggleTheme />

<div class="app">
  <main>
    <slot />
  </main>
</div>

<style>
  .app {
    width: 100%;
    height: 100vh;
    overflow: hidden;
  }
</style>
