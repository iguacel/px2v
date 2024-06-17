<script>
  import { theme } from "$lib/stores/theme";

  $: isDark = "is-dark";
</script>

<section class="nes-container with-title {isDark}">
  <h3 class="title">Containers</h3>

    <div class="grid item">
      <div class="nes-container with-title {isDark}">
        <p class="title">SVG</p>

        <div style="background-color:#212529; padding: 1rem 0;">
          <label>
            <input type="checkbox" class="nes-checkbox is-dark" checked="">
            <span>Dark</span>
          </label>
        </div>

        <div style="background-color:#212529; padding: 1rem 0;">
          <label>
            <input type="checkbox" class="nes-checkbox is-dark" checked="">
            <span>Dark</span>
          </label>
        </div>
        <div style="background-color:#212529; padding: 1rem 0;">
          <label>
            <input type="checkbox" class="nes-checkbox is-dark" checked="">
            <span>Dark</span>
          </label>
        </div>

        <button type="button" class="nes-btn  showcode {isDark}"
          >Download</button
        >
      </div>

      <div class="nes-container with-title {isDark}">
        <p class="title">JSON</p>

        <button type="button" class="nes-btn  showcode {isDark}"
          >Download</button
        >
      </div>
    </div>
</section>

<style>

 
  .grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-gap: 1em;
  }
</style>
