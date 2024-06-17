<script>
    import { onMount } from "svelte";
    import FileInfo from "$lib/components/core/FileInfo.svelte";
    import Options from "$lib/components/core/Options.svelte";
import Reset from "$lib/components/core/Reset.svelte";

    export let fileStore;
    export let resetApp;
    export let svgContent;
    export let jsonContent;

    let isPortrait = true;

    function updateViewport() {
        isPortrait = window.innerHeight > window.innerWidth;
    }

    onMount(() => {
        updateViewport();
        window.addEventListener('resize', updateViewport);
        return () => {
            window.removeEventListener('resize', updateViewport);
        };
    });
</script>

<div class="menu {isPortrait ? 'portrait' : 'landscape'}">
    <div class="content">
        <FileInfo {fileStore} {resetApp}/>
        <Options {svgContent} {jsonContent} />
        <Reset {resetApp} />
    </div>


</div>



<style>
    .menu {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        padding: var(--padding);
        z-index: 0;
    }

    .content {
        width: 100%;
        background: var(--c-bg);
       background: var(--c-fg);
        color: var(--c-bg);
    }

    .menu.portrait .content {
        width: 100%;
    }

    .menu.landscape .content {
        width: 320px;
    }
</style>
