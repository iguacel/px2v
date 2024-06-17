<script>
  import { get } from "svelte/store";
  export let fileStore;

  $: file = get(fileStore);
</script>

<div class="file-info">
  <p>{file.name}</p>
  <small>{file.width} x {file.height} = {file.width * file.height} px</small>
</div>

<style>
  .file-info {
    text-align: center;
    padding: 1em;
    text-align: left;
  }

  .file-info small {
    display: block;
  }
</style>
