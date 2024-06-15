<script lang="ts">
  import { base } from "$app/paths";
  import { isDev } from "$lib/stores/dev";
  import IsDev from "./IsDev.svelte";
</script>

<nav>
  <ul class="links">
    <li>
      <a href={`${base}/`}>Home</a>
    </li>
    <li>
      <a href={`${base}/about`}>About</a>
    </li>
  </ul>

  {#if $isDev}
    <IsDev />
  {/if}
</nav>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    text-align: left;
    font-size: 24px;
  }

  a,
  li {
    font-weight: 600;
  }
</style>
