import {canvasRenderers, toolbarRenderers} from '/script/rendering.js'

export const player = {
    xp:     100,
    hp:     100,
    x:      0,
    y:      0,
    width:  50,
    height: 50,
}

document.addEventListener('keydown', (event) => {
    if (event.key == 'ArrowRight') {
        player.x += 20
    }
    if (event.key == 'ArrowLeft') {
        player.x -= 20
    }
    if (event.key == 'ArrowUp') {
        player.y -= 20
    }
    if (event.key == 'ArrowDown') {
        player.y += 20
    }
})

const playerImage = new Image
playerImage.src = 'assets/jake.png'
canvasRenderers.push((context) => {
    context.drawImage(playerImage, player.x, player.y)
})

toolbarRenderers.push(() => {
    // Najdeme "XP" counter.
    const xpCounter = document.querySelector('#xp-counter')
    // Do XP counteru vypiseme aktualni pocet XP.
    xpCounter.innerText = player.xp + ' XP'

    // Najdeme "HP" counter.
    const hpCounter = document.querySelector('#hp-counter')
    // Do XP counteru vypiseme aktualni pocet XP.
    hpCounter.innerText = player.hp + ' HP'
})