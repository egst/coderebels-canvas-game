import {canvasRenderers} from '/script/rendering.js'
import {player} from '/script/player.js'

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
            if (snowFlakePositionX * canvas.width < player.x + player.width &&
                snowFlakePositionX * canvas.width + snowFlakeWidth > player.x &&
                snowFlakePositionY * canvas.height < player.y + player.height &&
                snowFlakePositionY * canvas.height + snowFlakeHeight > player.y
            ) {
                // Pridame XP:
                player.xp += 2

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