function Score () {
    isStarted = false
    if (lives > 0) {
        basic.clearScreen()
        basic.showIcon(IconNames.Heart)
        basic.pause(1000)
        basic.showString("" + (lives))
        basic.pause(1000)
        basic.clearScreen()
        positionBalleX = 2
        positionBalleY = 4
        positionRaquette = 2
        directionBalleX = -1
        directionBalleY = -1
        setBalle(positionBalleX, positionBalleY, false)
        setPosRaquette(positionRaquette)
        setBriques()
    } else {
        basic.showIcon(IconNames.Ghost)
        basic.pause(1000)
        Init()
    }
}
function moveBalle () {
    if (positionBalleX + directionBalleX < 0 || positionBalleX + directionBalleX > 4) {
        directionBalleX = 0 - directionBalleX
    }
    if (positionBalleY + directionBalleY < 0) {
        directionBalleY = 1
    } else {
        if (positionBalleY + directionBalleY > 4) {
            if (positionBalleY == 4) {
                if (positionBalleX == positionRaquette) {
                    directionBalleY = 0 - directionBalleY
                } else {
                    perdu()
                    Score()
                }
            } else {
                directionBalleY = -1
            }
        } else {
            if (positionBalleY == 1) {
                if (Ligne1[positionBalleX] == 1) {
                    Ligne1[positionBalleX] = 0
                    directionBalleY = 1
                    setBriques()
                }
            }
            if (positionBalleY == 0) {
                if (Ligne0[positionBalleX] == 1) {
                    Ligne0[positionBalleX] = 0
                    directionBalleY = 1
                    setBriques()
                }
            }
        }
    }
    if (!(positionBalleX == positionRaquette && positionBalleY == 4)) {
        setBalle(positionBalleX, positionBalleY, false)
    }
    if (isStarted) {
        positionBalleX += directionBalleX
        positionBalleY += directionBalleY
    }
    setBalle(positionBalleX, positionBalleY, true)
    basic.pause(500)
}
input.onButtonPressed(Button.A, function () {
    if (positionRaquette - 1 >= 0 && isStarted) {
        led.unplot(positionRaquette, 4)
        positionRaquette += -1
        setPosRaquette(positionRaquette)
    }
})
function setPosRaquette (posX: number) {
    led.plot(posX, 4)
}
input.onButtonPressed(Button.AB, function () {
    if (!(isStarted)) {
        isStarted = true
    }
})
input.onButtonPressed(Button.B, function () {
    if (positionRaquette + 1 <= 4 && isStarted) {
        led.unplot(positionRaquette, 4)
        positionRaquette += 1
        setPosRaquette(positionRaquette)
    }
})
input.onGesture(Gesture.Shake, function () {
    if (input.buttonIsPressed(Button.AB)) {
        Init()
    }
})
function perdu () {
    isStarted = false
    lives += -1
    basic.clearScreen()
    basic.showIcon(IconNames.Skull)
    basic.pause(1000)
}
function Init () {
    lives = 3
    speedBalle = 500
    directionBalleX = -1
    directionBalleY = -1
    isStarted = false
    Ligne0 = [1, 1, 1, 1, 1]
    Ligne1 = [1, 1, 1, 1, 1]
    Score()
}
function setBalle (posX: number, posY: number, isOn: boolean) {
    if (isOn) {
        led.plot(posX, posY)
    } else {
        led.unplot(posX, posY)
    }
}
function setBriques () {
    for (let index = 0; index <= Ligne0.length - 1; index++) {
        if (Ligne0[index] == 1) {
            led.plot(index, 0)
        } else {
            led.unplot(index, 0)
        }
    }
    for (let index2 = 0; index2 <= Ligne1.length - 1; index2++) {
        if (Ligne1[index2] == 1) {
            led.plot(index2, 1)
        } else {
            led.unplot(index2, 1)
        }
    }
}
let speedBalle = 0
let Ligne0: number[] = []
let Ligne1: number[] = []
let directionBalleY = 0
let directionBalleX = 0
let positionRaquette = 0
let positionBalleY = 0
let positionBalleX = 0
let lives = 0
let isStarted = false
Init()
basic.forever(function () {
    if (isStarted) {
        moveBalle()
    }
})
