<style>
    .spinner-box {
        width: 100%;
        height: calc(100vh - 40px);
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
    }
    @keyframes spin {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(359deg);
        }
    }

    @keyframes spin3D {
        from {
            transform: rotate3d(0.5, 0.5, 0.5, 360deg);
        }
        to {
            transform: rotate3d(0deg);
        }
    }

    @keyframes configure-clockwise {
        0% {
            transform: rotate(0);
        }
        25% {
            transform: rotate(90deg);
        }
        50% {
            transform: rotate(180deg);
        }
        75% {
            transform: rotate(270deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    @keyframes configure-xclockwise {
        0% {
            transform: rotate(45deg);
        }
        25% {
            transform: rotate(-45deg);
        }
        50% {
            transform: rotate(-135deg);
        }
        75% {
            transform: rotate(-225deg);
        }
        100% {
            transform: rotate(-315deg);
        }
    }

    @keyframes pulse {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0.25;
            transform: scale(0.75);
        }
    }
    .solar-system {
        width: 250px;
        height: 250px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .orbit {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid hsla(36, 4%, 68%, 0.9058823529411765);
        border-radius: 50%;
    }

    .earth-orbit {
        width: 165px;
        height: 165px;
        -webkit-animation: spin 12s linear 0s infinite;
    }

    .venus-orbit {
        width: 120px;
        height: 120px;
        -webkit-animation: spin 7.4s linear 0s infinite;
    }

    .mercury-orbit {
        width: 90px;
        height: 90px;
        -webkit-animation: spin 3s linear 0s infinite;
    }

    .planet {
        position: absolute;
        top: -5px;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #53c6ce;
    }

    .sun {
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: hsl(15, 77%, 65%);
    }
</style>

<div class="loading">
    <div class="spinner-box">
        <div class="solar-system">
            <div class="earth-orbit orbit">
                <div class="planet earth" />
                <div class="venus-orbit orbit">
                    <div class="planet venus" />
                    <div class="mercury-orbit orbit">
                        <div class="planet mercury" />
                        <div class="sun" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
