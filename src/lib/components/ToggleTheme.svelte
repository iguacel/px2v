<script lang="ts">
    import { theme } from "$lib/stores/theme";
    import { THEMES } from "$lib/config";

    function toggleTheme(): void {
        theme.update((current) =>
            current === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT,
        );
    }
</script>

<button aria-label="toggle theme" on:click={toggleTheme}>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xml:space="preserve"
        id="Layer_1"
        x="0"
        y="0"
        style="enable-background:new 0 0 16 16"
        version="1.1"
        viewBox="0 0 16 16"
        ><path
            d="M7 5H5v3h1V6h1zM10 6h1V5H9v3h1zM7 10h1v1H7zM9 10h1v1H9z"
            fill="white"
        /><path
            d="M15 6h-1V4h-1V3h-1V2h-2V1H6v1H4v1H3v1H2v2H1v4h1v2h1v1h1v1h2v1h4v-1h2v-1h1v-1h1v-2h1V6zM5 12v-1H4v-1h8v1h-1v1H5zm6-4H9V5h2v3zM5 8V5h2v3H5z"
            fill={$theme === "dark" ? "#ff8170" : "#24dd1b"} style="transition: fill 0.3s ease-in-out;"
        /><path
            d="M1 13h1v1h1v1h2v1h6v-1h2v-1h1v-1h1v-2h1V5h-1V3h-1V2h-1V1h-2V0H5v1H3v1H2v1H1v2H0v6h1v2zm0-7h1V4h1V3h1V2h2V1h4v1h2v1h1v1h1v2h1v4h-1v2h-1v1h-1v1h-2v1H6v-1H4v-1H3v-1H2v-2H1V6z"
            fill="black"
        /><path
            d="M6 6h1v2H6zM10 6h1v2h-1zM11 12v-1h1v-1h-2v1H9v-1H8v1H7v-1H4v1h1v1z"
            fill="black"
        /></svg
    >
</button>

<style>
    button {
        position: absolute;
        top: var(--padding);
        right: var(--padding);
        width: 2rem;
        height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1;
    }
</style>
