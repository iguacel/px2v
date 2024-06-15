<script>
  import { isDark } from "$lib/stores/theme";
</script>

<div class="dev mono op">
  <p class="pm">dev mode (D)</p>
  <p class="pm">{$isDark ? "dark" : "light"}</p>
</div>

<style>
  .dev {
    margin-top: var(--padding);
  }
</style>
