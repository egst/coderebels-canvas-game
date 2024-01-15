'use strict'

// Stavova promenna, ktera si pamatuje, jestli je hra pausnuta, nebo ne.
// True znamena "ano, hra je pausnuta", false znamena "ne, hra bezi".
let gamePaused = true

let xp = 100

let playerX = 0
let playerY = 0

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

const handleFreeXpButton = () => {
    // Najdeme "XP" tlacitko.
    const freeXpButton = document.querySelector('#free-xp-button')

    // Najdeme "XP" counter.
    const xpCounter = document.querySelector('#xp-counter')

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

        // Do XP counteru vypiseme aktualni pocet XP.
        xpCounter.innerText = xp + ' XP'
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

    requestAnimationFrame(drawCanvasFrame)
}

// Rendering background:
canvasRenderers.push((context) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
})

// Rendering player:
const playerImage = new Image
playerImage.src = 'assets/jake.png'
canvasRenderers.push((context) => {
    context.drawImage(playerImage, playerX, playerY)
})

let snowFlakePositionX = 0
let snowFlakePositionY = 0

const createSnowFlake = () => {
    snowFlakePositionX = Math.random()
    snowFlakePositionY = 0
}

const snowFlakeWidth  = 20
const snowFlakeHeight = 20
const playerWidth     = 50
const playerHeight    = 50

const handleSnowflakes = () => {
    if (snowFlakePositionY >= 1) { // Uz to dopadlo na zem.
        createSnowFlake()
    } else { // Jeste to pada.
        snowFlakePositionY += 0.01

        // Kdyz se dotyka vlocka hrace:
        if (snowFlakePositionX < playerX + playerWidth &&
            snowFlakePositionX + snowFlakeWidth > playerX &&
            snowFlakePositionY < playerY + playerHeight &&
            snowFlakePositionY + snowFlakeHeight > playerY
        ) {
            // Pridame XP:
            xp += 2

            // Znicime tuto vlocku
            // a vytvorime novou:
            createSnowFlake()
        }
    }
}

setInterval(handleSnowflakes, 50)

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

const handlePlayer = () => {
    document.addEventListener('keydown', (event) => {
        if (event.key == 'ArrowRight') {
            console.log('go right')
            playerX += 20
        }
        if (event.key == 'ArrowLeft') {
            console.log('go left')
            playerX -= 20
        }
        if (event.key == 'ArrowUp') {
            console.log('go down')
            playerY -= 20
        }
        if (event.key == 'ArrowDown') {
            console.log('go down')
            playerY += 20
        }
    })
}

const resizeCanvas = () => {
    const canvas = document.querySelector('#game-canvas')
    canvas.width = canvas.parentNode.clientWidth
}

window.addEventListener('resize', resizeCanvas)

document.addEventListener('DOMContentLoaded', () => {
    handlePauseButton()
    handleFreeXpButton()
    handlePlayer()
    resizeCanvas()
    requestAnimationFrame(drawCanvasFrame)
})
