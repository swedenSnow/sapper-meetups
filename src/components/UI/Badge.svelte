<script>
    import { cubicIn } from 'svelte/easing';
    import { fade, fly, slide, scale } from 'svelte/transition';
    import { flip } from 'svelte/animate';
</script>

<style>
    span {
        display: inline-block;
        margin: 0 0.25rem;
        border-radius: 3px;
        border: 1px solid #ff3e00;
        background: #ff3e00;
        color: #fff;
        padding: 0 0.5rem;
        font-family: 'Lato', sans-serif;
        font-size: 0.8rem;
    }
</style>

<span transition:slide={{ easing: cubicIn, duration: 150, x: 0, y: -300 }}>
    <slot />
</span>
