<script>
  import { writable } from "svelte/store";
  import { theme } from "$lib/stores/theme";

  $: isDark = $theme === "dark" ? "is-dark" : "";

  export let svgContent;
  export let jsonContent;

  import fileSaver from "file-saver";
  const { saveAs } = fileSaver;

  let compoundPath = writable(true);
  let removeAlpha = writable(true);
  let preferViewBox = writable(true);
  let minifyJSON = writable(false);

  const downloadSVG = () => {
    const blob = new Blob([$svgContent], {
      type: "image/svg+xml;charset=utf-8",
    });
    saveAs(blob, "image.svg");
  };

  const downloadJSON = () => {
    const json = minifyJSON
      ? JSON.stringify(JSON.parse($jsonContent))
      : jsonContent;
    const blob = new Blob([json], {
      type: "application/json;charset=utf-8",
    });
    saveAs(blob, "image.json");
  };
</script>

<div class="options-wrapper">
  <section>
    <h3 class="title">SVG</h3>
    <div class="checkboxes">
      <label class="checkbox-label">
        <input
          type="checkbox"
          class="checkbox {isDark}"
          bind:checked={$compoundPath}
        />
        <span>Compound path</span>
      </label>

      <label class="checkbox-label">
        <input
          type="checkbox"
          class="checkbox {isDark}"
          bind:checked={$removeAlpha}
        />
        <span>Remove Alpha</span>
      </label>

      <label class="checkbox-label">
        <input
          type="checkbox"
          class="checkbox {isDark}"
          bind:checked={$preferViewBox}
        />
        <span>Prefer ViewBox</span>
      </label>
    </div>
    <button class="button" on:click={downloadSVG}>Download SVG</button>
  </section>

  <section>
    <h3 class="title">JSON</h3>
    <div class="checkboxes">
      <label class="checkbox-label">
        <input
          type="checkbox"
          class="checkbox {isDark}"
          bind:checked={$minifyJSON}
        />
        <span>Minify</span>
      </label>
    </div>
    <button class="button" on:click={downloadJSON}>Download JSON</button>
  </section>
</div>


<style>
 h3 {
  margin-bottom: .5em;
}
.options-wrapper {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 20px;
  padding: 1em;
  padding-bottom: 0;
}
.checkboxes {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 1em;
}
.checkbox-label {
  display: flex;
  align-items: center;
  gap: 10px;
}

.checkbox-label > span {
  line-height: 1em;
}

input[type="checkbox"] {
  appearance: none;
  background-color: var(--c-bg);
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 0.8em;
  height: 0.8em;
  border: 0.15em solid currentColor;
  transform: translateY(-0.075em);
}

.form-control {
  font-family: system-ui, sans-serif;
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.1;
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;
}

.form-control--disabled {
  cursor: not-allowed;
}

input[type=checkbox] {
  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  -moz-appearance: none;
       appearance: none;
  /* For iOS < 15 */
  /* Not removed via appearance */
  margin: 0;
  font: inherit;
  color: currentColor;
  width: 0.8em;
  height: 0.8em;
  border: 0.15em solid currentColor;
  transform: translateY(-0.075em);
  display: grid;
  place-content: center;
}

input[type=checkbox]::before {
  content: "";
  width: 0.35em;
  height: 0.35em;
  -webkit-clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
          clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  transform: scale(0);
  transform-origin: bottom left;
  transition: 120ms transform ease-in-out;
  background-color: var(--c-fg);
}

input[type=checkbox]:checked::before {
  transform: scale(1);
}

input[type=checkbox]:disabled {
  cursor: not-allowed;
}

button {
  background: var(--c-bg);
  color: var(--c-fg);
  padding: 5px 10px;
  width: 100%;
  margin-top: 1em;
  text-align: center;
}

section {
  display: flex;
  flex-flow: column;
}


.button {
  margin-top: auto;
}


</style>
