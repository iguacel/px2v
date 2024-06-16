<script>
</script>

<header>
  <h1 class="pm">
    <slot />
  </h1>
</header>

<style>
  header {
    position: absolute;
    top: calc(var(--margin) * 0.35);
    left: calc(var(--margin) * 0.52);
  }

  h1 {
    font-family: var(--display);
    font-size: 7rem;
    padding: 0;
    line-height: 0.5;
  }
</style>
