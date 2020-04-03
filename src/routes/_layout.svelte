<script>
    import Header from '../components/UI/Header.svelte';
    export let segment;
</script>

<style>
    main {
        margin-top: 4rem;
    }
    /* main {
		position: relative;
		max-width: 56em;
		background-color: white;
		padding: 2em;
		margin: 0 auto;
		box-sizing: border-box;
	} */
</style>

<!-- <Nav {segment}/> -->
<Header />
<main>
    <slot />
</main>
