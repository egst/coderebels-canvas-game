import {canvasRenderers} from '/script/rendering.js'
import {xp, playerX, playerY, playerWidth, playerHeight} from '/script/player.js'

const snowFlakeWidth  = 20
const snowFlakeHeight = 20

let snowFlakePositionX = 0
let snowFlakePositionY = 0

const createSnowFlake = () => {
    snowFlakePositionX = Math.random()
    snowFlakePositionY = 0
}

document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
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
    }, 30)
})

const snowflakeImage = new Image
snowflakeImage.src = 'assets/snowflake.png'
canvasRenderers.push(context => {
    context.drawImage(
        snowflakeImage,
        snowFlakePositionX * context.canvas.width,
        snowFlakePositionY * context.canvas.height
    )
})