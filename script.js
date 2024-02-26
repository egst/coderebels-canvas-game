import '/script/background.js'
import '/script/player.js'
import '/script/snowflakes.js'
import '/script/icicles.js'

let gamePaused = true

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
    resizeCanvas()
})