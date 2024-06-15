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
  on:dragover|preventDefault
  on:click={handleClick}
>
  Drop your image here or click to upload
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
    border: 2px dashed #ccc;
    padding: 20px;
    margin: 20px 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
