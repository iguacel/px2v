<script>
  import { get } from "svelte/store";
  export let fileStore;

  $: file = get(fileStore);
</script>

<div class="file-info">
  <h3>{file.name}</h3>
  <p>{file.width}x{file.height} -> {file.width * file.height} px</p>
</div>

<style>
  .file-info {
    padding: 1em 1em 0 1em;
  }
</style>
