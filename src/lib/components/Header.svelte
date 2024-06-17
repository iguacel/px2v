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
    top: calc(var(--margin) * 0.5);
    left: calc(var(--margin) * 0.52);
    z-index: 1;
  }

  h1 {
    font-family: var(--display);
    font-size: 4rem;
    padding: 0;
    line-height: 0.5;
  }
</style>
