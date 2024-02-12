let xp = 100
let hp = 100
let playerX = 0
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

// TODO: Move the renderer here.