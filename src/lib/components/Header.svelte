<script>
  import Nav from "$lib/components/Nav.svelte";
</script>

<header>
  <h1 class="pm">
    <slot />
  </h1>
  <Nav />
</header>

<style>
  header {
    margin-top: var(--margin);
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 64px;
  }

  h1 {
    font-family: var(--display);
    font-size: 7rem;
    margin: 0;
    padding: 0;
    line-height: 60px;
  }

  @media only screen and (min-width: 666px) {
    header {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media only screen and (min-width: 769px) {
    header {
      grid-template-columns: 2fr 1fr;
    }
  }
</style>
