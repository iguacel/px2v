<script>
  export let files = { accepted: [], rejected: [] };
</script>

{#if files.accepted.length > 0}
  <div class="file-list">
    <h3>Accepted Files:</h3>
    <ul>
      {#each files.accepted as file}
        <li>{file.name}</li>
      {/each}
    </ul>
  </div>
{/if}

<style>
  .file-list {
    margin-top: 20px;
  }
</style>
