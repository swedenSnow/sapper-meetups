<script>
    import { fade, fly } from 'svelte/transition';
    import { cubicIn } from 'svelte/easing';
    import { createEventDispatcher } from 'svelte';
    import Button from './Button.svelte';

    export let title;
    let modal;

    const dispatch = createEventDispatcher();

    function closeModal() {
        dispatch('cancel');
    }

    function handleKeyDown(e) {
        if (e.which === 27 || e.which === 'Escape') {
            dispatch('cancel');
            return;
        }
        if (e.key === 'Tab') {
            // trap focus
            const nodes = modal.querySelectorAll('*');
            const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0);
            let index = tabbable.indexOf(document.activeElement);
            if (index === -1 && e.shiftKey) index = 0;
            index += tabbable.length + (e.shiftKey ? -1 : 1);
            index %= tabbable.length;
            tabbable[index].focus();
            e.preventDefault();
        }
    }
</script>

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.75);
        z-index: 10;
    }

    .modal {
        position: fixed;
        top: 10vh;
        left: 10%;
        width: 80%;
        max-height: 80vh;
        background: white;
        border-radius: 5px;
        z-index: 100;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
        overflow: scroll;
    }

    h2 {
        padding: 1rem;
        margin: 0;
        border-bottom: 1px solid #ccc;
        font-family: 'Roboto Slab', sans-serif;
    }

    .content {
        padding: 1rem;
    }

    footer {
        padding: 1rem;
    }

    @media (min-width: 768px) {
        .modal {
            width: 40rem;
            left: calc(50% - 20rem);
        }
    }
</style>

<svelte:window on:keydown={handleKeyDown} />
<div transition:fade class="modal-backdrop" on:click={closeModal} />
<div
    class="modal"
    aria-modal="true"
    bind:this={modal}
    transition:fly={{ y: 300 }}>
    <h2>{title}</h2>
    <div class="content">
        <slot />
    </div>
    <footer>
        <slot name="footer">
            <Button on:click={closeModal}>Close</Button>
        </slot>
    </footer>
</div>
