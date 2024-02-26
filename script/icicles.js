import {canvasRenderers} from '/script/rendering.js'
import {player} from '/script/player.js'

const icicleWidth  = 20
const icicleHeight = 56

let iciclePositionX = 0
let iciclePositionY = 0

const createIcicle = () => {
    iciclePositionX = Math.random()
    iciclePositionY = 0
}

document.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        const canvas = document.querySelector('#game-canvas')
    
        if (iciclePositionY >= 1) { // Uz to dopadlo na zem.
            createIcicle()
        } else { // Jeste to pada.
            iciclePositionY += 0.02
    
            // Kdyz se dotyka vlocka hrace:
            if (iciclePositionX * canvas.width < player.x + player.width &&
                iciclePositionX * canvas.width + icicleWidth > player.x &&
                iciclePositionY * canvas.height < player.y + player.height &&
                iciclePositionY * canvas.height + icicleHeight > player.y
            ) {
                // Odebereme HP:
                player.hp -= 2
    
                // Znicime tuto vlocku
                // a vytvorime novou:
                createIcicle()
            }
        }
    }, 50)
})

const icicleImage = new Image
icicleImage.src = 'assets/icicle.png'
canvasRenderers.push(context => {
    context.drawImage(
        icicleImage,
        iciclePositionX * context.canvas.width,
        iciclePositionY * context.canvas.height
    )
})