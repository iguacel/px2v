<script>
  import { writable } from "svelte/store";

  export const removeTransparent = writable(true);
  export const useCompoundPaths = writable(true);

  const toggleRemoveTransparent = () => {
    removeTransparent.update((value) => !value);
  };

  const toggleUseCompoundPaths = () => {
    useCompoundPaths.update((value) => !value);
  };
</script>

<div>
  <label>
    <input
      type="checkbox"
      bind:checked={$removeTransparent}
      on:change={toggleRemoveTransparent}
    />
    Remove Transparent Pixels
  </label>
  <br />
  <label>
    <input
      type="checkbox"
      bind:checked={$useCompoundPaths}
      on:change={toggleUseCompoundPaths}
    />
    Use Compound Paths
  </label>
</div>

<style>
  label {
    margin-right: 20px;
  }
</style>
