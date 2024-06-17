<script>
  import { get } from "svelte/store";
  import { svgContent } from "$lib/components/core/store.js";

  $: content = get(svgContent);
</script>

<div class="svg-wrapper">
  {@html content}
</div>

<style>
  .svg-wrapper {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
