<style>
    .loadspinner-container {
        width: 4.6em;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .loadingspinner {
        pointer-events: none;
        width: 2em;
        height: 2em;
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

<div class="loadspinner-container">
    <div class="loadingspinner" />
</div>
