<script>
    export let resetApp;
</script>

<div class="reset">
    <button on:click={resetApp}>RESET</button>
</div>

<style>
    .reset {
        width: 100%;
    }

    button {
        padding: calc(var(--padding) / 2);
        width: 100%;
        text-align: center;
        font-size: 18px;
        font-weight: 900;
    }
</style>
