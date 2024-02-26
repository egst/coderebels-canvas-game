export const canvasRenderers = [];
export const toolbarRenderers = [];

const drawCanvasFrame = () => {
    const canvas  = document.querySelector('#game-canvas')
    const context = canvas.getContext('2d')

    for (const renderer of canvasRenderers) {
        renderer(context)
    }

    for (const renderer of toolbarRenderers) {
        renderer()
    }

    requestAnimationFrame(drawCanvasFrame)
}

document.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(drawCanvasFrame)
})