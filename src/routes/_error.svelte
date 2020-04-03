<script>
    export let status;
    export let error;

    const dev = process.env.NODE_ENV === 'development';
</script>

<style>
    h1,
    p {
        margin: 0 auto;
    }

    h1,
    h5 {
        text-align: center;
        font-size: 2.8em;
        font-weight: 700;
        margin: 0 0 0.5em 0;
    }

    p {
        text-align: center;
        margin: 1em auto;
        margin-bottom: 0;
    }

    strong {
        display: flex;
        flex-flow: row wrap;
        justify-content: center;
        margin-top: 0;
    }

    @media (min-width: 480px) {
        h1 {
            font-size: 4em;
        }
    }
</style>

<svelte:head>
    <title>{status}</title>
</svelte:head>

<h1>{status}</h1>
{#if status !== 404}
    <h5>{error.message}</h5>
{/if}

<p>Omg, we're lost in the void</p>
<strong>
    <a href=".">Hitchhike back to startpage</a>
</strong>

{#if dev && error.stack}
    <pre>{error.stack}</pre>
{/if}
