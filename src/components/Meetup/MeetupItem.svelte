<script>
    import { createEventDispatcher } from 'svelte';
    // import { scale } from 'svelte/transition';
    // import { flip } from 'svelte/animate';
    // import { cubicIn } from 'svelte/easing';
    import meetupsStore from '../../meetups-store.js';
    import Button from '../UI/Button.svelte';
    import Badge from '../UI/Badge.svelte';
    import SmallSpinner from '../UI/SmallSpinner.svelte';
    import LoadingSpinner from '../UI/LoadingSpinner.svelte';

    export let id;
    export let title;
    export let subtitle;
    export let imageUrl;
    export let description;
    export let address;
    // export let email;
    export let isFav;

    let isLoading = false;

    const dispatch = createEventDispatcher();

    // const dispatch = createEventDispatcher();
    function toggleFavorite() {
        isLoading = true;
        fetch(`https://svelte-course-6d25d.firebaseio.com/meetups/${id}.json`, {
            method: 'PATCH',
            body: JSON.stringify({ isFavorite: !isFav }),
            headers: { 'Content-Type': 'application/json' },
        })
            .then(res => {
                if (!res.ok || res.status !== 200) {
                    throw new Error(`Epic Fail! 😒 ${res.status}`);
                }
                meetupsStore.toggleFavorite(id);
                isLoading = false;
            })
            .catch(err => {
                isLoading = false;
                console.log(err);
            });
    }
</script>

<style>
    article {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        border-radius: 5px;
        background: white;
        margin: 1rem;
        display: flex;
        flex-flow: column wrap;
    }

    header,
    .content,
    footer {
        padding: 1rem;
    }
    @media (max-width: 400px) {
        header,
        .content,
        footer {
            padding: 1rem 8px;
            margin: 0 auto;
        }
    }
    .footer--item {
        display: flex;
    }
    .footer--item > * {
        margin: 0 1rem;
    }

    .image {
        width: 100%;
        height: 14rem;
    }

    .image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    h1 {
        font-size: 1.25rem;
        margin: 0.5rem 0;
        font-family: 'Roboto Slab', sans-serif;
    }

    h1.is-favorite {
        /* background: #01a129;
        color: white;
        padding: 0 0.5rem;
        border-radius: 5px; 
        */
        text-decoration: underline;
    }

    h2 {
        font-size: 1rem;
        color: #808080;
        margin: 0.5rem 0;
    }

    p {
        font-size: 1.1rem;
        margin: 0;
    }

    div {
        text-align: right;
    }

    .content {
        flex: 1;
    }
</style>

<article>
    <header>
        <h1 class={isFav ? 'is-favorite' : ''}>
            {title}
            {#if isFav}
                <Badge>&reg; This my joint bruh &reg;</Badge>
            {/if}
        </h1>
        <h2>{subtitle}</h2>
        <p>{address}</p>
    </header>
    <div class="image">
        <img src={imageUrl} alt={title} />
    </div>
    <div class="content">
        <p>{description}</p>
    </div>
    <footer class="footer--item">
        <!-- <Button href="mailto:{email}">Contact</Button> -->
        <Button
            mode="outline"
            type="button"
            on:click={() => {
                dispatch('edit', id);
            }}>
            Edit
        </Button>
        {#if isLoading}
            <span class="small-spinner">
                <SmallSpinner />
            </span>
        {:else}
            <Button
                color={isFav ? null : 'success'}
                mode="outline"
                type="button"
                on:click={toggleFavorite}>
                {isFav ? 'Unfavorite' : 'Favorite'}
            </Button>
        {/if}
        <Button type="button" href="/{id}" }>Show Details</Button>
    </footer>
</article>
