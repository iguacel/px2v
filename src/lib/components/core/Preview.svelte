<script>
  import { get } from "svelte/store";
  export let svgContent;

  $: content = get(svgContent);
</script>

<div class="svg-wrapper">
  {@html content}
</div>

<style>
  .svg-wrapper {
    border: 1px solid crimson;
  }
</style>
