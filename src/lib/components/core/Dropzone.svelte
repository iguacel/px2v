<script>
  import { createEventDispatcher } from "svelte";
  let fileInput;
  const dispatch = createEventDispatcher();

  function handleDrop(event) {
    event.preventDefault();
    handleFiles(event.dataTransfer.files);
  }

  function handleFiles(files) {
    const acceptedFiles = [];
    const fileRejections = [];

    for (let file of files) {
      if (file.type === "image/png") {
        acceptedFiles.push(file);
      } else {
        fileRejections.push(file);
      }
    }

    dispatch("drop", { acceptedFiles, fileRejections });
  }

  function handleClick() {
    fileInput.click();
  }

  function handleFileChange(event) {
    handleFiles(event.target.files);
  }
</script>

<div
  class="dropzone"
  on:drop={handleDrop}
  on:dragover={(event) => event.preventDefault()}
  on:click={handleClick}
>
  Drop your image here <br/>or click to upload
</div>
<input
  type="file"
  accept="image/png"
  multiple
  on:change={handleFileChange}
  bind:this={fileInput}
  style="display: none;"
/>

<style>
  .dropzone {
    padding: 20px;
    height: 100vh;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1em;
    text-align: center;
  }
</style>
