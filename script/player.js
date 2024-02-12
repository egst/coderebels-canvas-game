import {canvasRenderers} from '/script/rendering.js'

export let xp = 100
export let hp = 100
export let playerX = 0
export let playerY = 0

export const playerWidth  = 50
export const playerHeight = 50

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', (event) => {
        if (event.key == 'ArrowRight') {
            playerX += 20
        }
        if (event.key == 'ArrowLeft') {
            playerX -= 20
        }
        if (event.key == 'ArrowUp') {
            playerY -= 20
        }
        if (event.key == 'ArrowDown') {
            playerY += 20
        }
    })
});

const playerImage = new Image
playerImage.src = 'assets/jake.png'
canvasRenderers.push((context) => {
    context.drawImage(playerImage, playerX, playerY)
})