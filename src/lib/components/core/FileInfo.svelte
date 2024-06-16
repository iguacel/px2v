<script>
  import { get } from "svelte/store";
  export let fileStore;

  $: file = get(fileStore);
</script>

<div class="file-info">
  <p>{file.name}</p>
  <small>{file.width}x{file.height} pixels</small>
  <small>{file.width * file.height} pixels total</small>
</div>

<style>
  .file-info {
    margin-top: 20px;
  }

  .file-info small {
    display: block;
  }
</style>
