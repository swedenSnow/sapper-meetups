<style>
    .loadingspinner {
        pointer-events: none;
        width: 1.5em;
        height: 1.5em;
        border: 0.4em solid transparent;
        border-color: #36464e;
        border-top-color: #ff3e00;
        border-radius: 50%;
        animation: loadingspin 1s linear infinite;
    }

    @keyframes loadingspin {
        100% {
            transform: rotate(360deg);
        }
    }
</style>

<div class="loadingspinner" />
