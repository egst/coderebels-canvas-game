import {playerWidth} from 'script/player.js'

let gamePaused = true

const handlePauseButton = () => {
    // Najdeme "pause" tlacitko.
    const pauseButton = document.querySelector('#pause-button')

    // Na "pause" tlacitku cekame, nez uzivatel klikne.
    pauseButton.addEventListener('click', () => {
        // Ted se kliklo na tlacitko "pause" nebo "resume".

        if (gamePaused == true) {
            // Hra byla doposud pausnuta. Ted ji pustime.

            pauseButton.classList.add('button-pressed')

            pauseButton.textContent = 'Pause Game'
            gamePaused = false
        } else {
            // Hra byla doposud bezela. Ted ji pausneme.

            pauseButton.classList.remove('button-pressed')

            pauseButton.textContent = 'Resume Game'
            gamePaused = true
        }
    })
}

const updateXpCounter = () => {
    // Najdeme "XP" counter.
    const xpCounter = document.querySelector('#xp-counter')
    // Do XP counteru vypiseme aktualni pocet XP.
    xpCounter.innerText = xp + ' XP'
}

const handleFreeXpButton = () => {
    // Najdeme "XP" tlacitko.
    const freeXpButton = document.querySelector('#free-xp-button')

    // Na "XP" tlacitku cekame, nez uzivatel klikne.
    freeXpButton.addEventListener('click', () => {
        // Ted se kliklo na "free xp" tlacitko.

        if (xp < 500) {
            // Pokud XP pod 500, pak dovolime zvysit jeste o 10.
            xp += 10 // To samy: xp = xp + 10
        } else {
            alert('stop being so greedy! imma steal all your XP now.')
            xp = 0
        }
    })
}

// array (pole)
const canvasRenderers = [];

const drawCanvasFrame = () => {
    const canvas  = document.querySelector('#game-canvas')
    const context = canvas.getContext('2d')

    // for loop (smycka)
    for (const renderer of canvasRenderers) {
        renderer(context)
    }

    updateXpCounter()

    requestAnimationFrame(drawCanvasFrame)
}

// Rendering background:
canvasRenderers.push((context) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
})

// Rendering player:
// TODO: Move to player.js module.
const playerImage = new Image
playerImage.src = 'assets/jake.png'
canvasRenderers.push((context) => {
    context.drawImage(playerImage, playerX, playerY)
})

// Snowflakes:

const snowFlakeWidth  = 20
const snowFlakeHeight = 20

let snowFlakePositionX = 0
let snowFlakePositionY = 0

const createSnowFlake = () => {
    snowFlakePositionX = Math.random()
    snowFlakePositionY = 0
}

const handleSnowflakes = () => {
    const canvas = document.querySelector('#game-canvas')

    if (snowFlakePositionY >= 1) { // Uz to dopadlo na zem.
        createSnowFlake()
    } else { // Jeste to pada.
        snowFlakePositionY += 0.02

        // Kdyz se dotyka vlocka hrace:
        if (snowFlakePositionX * canvas.width < playerX + playerWidth &&
            snowFlakePositionX * canvas.width + snowFlakeWidth > playerX &&
            snowFlakePositionY * canvas.height < playerY + playerHeight &&
            snowFlakePositionY * canvas.height + snowFlakeHeight > playerY
        ) {
            // Pridame XP:
            xp += 2
            // update xp counter

            // Znicime tuto vlocku
            // a vytvorime novou:
            createSnowFlake()
        }
    }
}

// END Snowflakes

// Icicles:

const icicleWidth  = 20
const icicleHeight = 56

let iciclePositionX = 0
let iciclePositionY = 0

const createIcicle = () => {
    iciclePositionX = Math.random()
    iciclePositionY = 0
}

const handleIcicles = () => {
    const canvas = document.querySelector('#game-canvas')

    if (iciclePositionY >= 1) { // Uz to dopadlo na zem.
        createIcicle()
    } else { // Jeste to pada.
        iciclePositionY += 0.02

        // Kdyz se dotyka vlocka hrace:
        if (iciclePositionX * canvas.width < playerX + playerWidth &&
            iciclePositionX * canvas.width + icicleWidth > playerX &&
            iciclePositionY * canvas.height < playerY + playerHeight &&
            iciclePositionY * canvas.height + icicleHeight > playerY
        ) {
            // Pridame XP:
            xp += 2
            // update xp counter

            // Znicime tuto vlocku
            // a vytvorime novou:
            createIcicle()
        }
    }
}

// END Icicles

// Rendering snowflakes:
const snowflakeImage = new Image
snowflakeImage.src = 'assets/snowflake.png'
canvasRenderers.push(context => {
    context.drawImage(
        snowflakeImage,
        snowFlakePositionX * context.canvas.width,
        snowFlakePositionY * context.canvas.height
    )
})

// Rendering icicles:
const icicleImage = new Image
icicleImage.src = 'assets/icicle.png'
canvasRenderers.push(context => {
    context.drawImage(
        icicleImage,
        iciclePositionX * context.canvas.width,
        iciclePositionY * context.canvas.height
    )
})

const resizeCanvas = () => {
    const canvas = document.querySelector('#game-canvas')
    canvas.width = canvas.parentNode.clientWidth
}

window.addEventListener('resize', resizeCanvas)

document.addEventListener('DOMContentLoaded', () => {
    handlePauseButton()
    handleFreeXpButton()
    resizeCanvas()
    requestAnimationFrame(drawCanvasFrame)
    setInterval(handleSnowflakes, 30)
    setInterval(handleIcicles, 50)
})
