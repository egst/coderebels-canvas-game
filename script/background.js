import {canvasRenderers} from '/script/rendering.js'

canvasRenderers.push((context) => {
    context.fillStyle = 'white'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
})