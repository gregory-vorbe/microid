input.onButtonPressed(Button.A, function () {
    if (positionRaquette - 1 >= 0) {
        led.unplot(positionRaquette, 4)
        positionRaquette += -1
        setPosRaquette(positionRaquette)
    }
})
function setPosRaquette (posX: number) {
    led.plot(posX, 4)
}
input.onButtonPressed(Button.B, function () {
    if (positionRaquette + 1 <= 4) {
        led.unplot(positionRaquette, 4)
        positionRaquette += 1
        setPosRaquette(positionRaquette)
    }
})
function Init () {
    Ligne0 = [1, 1, 1, 1, 1]
    Ligne1 = [1, 1, 1, 1, 1]
    setBriques()
    setBalle(2, 4, false)
    positionRaquette = 2
    setPosRaquette(positionRaquette)
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
let Ligne1: number[] = []
let Ligne0: number[] = []
let positionRaquette = 0
Init()
basic.forever(function () {
	
})