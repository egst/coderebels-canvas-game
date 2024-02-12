import {xp} from '/script/player.js'

export const canvasRenderers = [];

const updateXpCounter = () => {
    // Najdeme "XP" counter.
    const xpCounter = document.querySelector('#xp-counter')
    // Do XP counteru vypiseme aktualni pocet XP.
    xpCounter.innerText = xp + ' XP'
}

const drawCanvasFrame = () => {
    const canvas  = document.querySelector('#game-canvas')
    const context = canvas.getContext('2d')

    for (const renderer of canvasRenderers) {
        renderer(context)
    }

    updateXpCounter()

    requestAnimationFrame(drawCanvasFrame)
}

document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(drawCanvasFrame)
})