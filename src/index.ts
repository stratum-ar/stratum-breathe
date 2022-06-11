import { App } from "stratumkit-node/lib/app";
import { Graphics } from "stratumkit-node/lib/llui";
import { UI } from "stratumkit-node/lib/ui";
import { Alignment } from "stratumkit-node/lib/ui/enums/enums";

const app = new App()
const ui = new UI(app)

app.onInput = input => ui.handleInput(input)

app.start(process.argv[2])?.then(() => {
    let counter = 0
    let isExhaling = false

    setInterval(() => {
        const gfx = new Graphics()

        const f = counter / 19
        const lum = Math.floor(255 * f)

        gfx.drawEllipse(50, 50, 140, 140, 50, 50, 50)

        if (isExhaling) {
            const radius = (1 - f) * 40 + 30
            gfx.drawEllipse(
                Math.round(120 - radius),
                Math.round(120 - radius),
                Math.round(radius * 2),
                Math.round(radius * 2),
                0, 255 - lum, 0
            )

            gfx.drawAlignedText(
                0, 0, 240, 240,
                Alignment.MIDDLE, "Exhale",
                255 - lum, 255, 255 - lum
            )
        } else {
            const radius = f * 40 + 30
            gfx.drawEllipse(
                Math.round(120 - radius),
                Math.round(120 - radius),
                Math.round(radius * 2),
                Math.round(radius * 2),
                0, 0, lum
            )

            gfx.drawAlignedText(
                0, 0, 240, 240,
                Alignment.MIDDLE, "Inhale",
                lum, lum, 255
            )
        }

        app.sendCommand(0x10, gfx.toBuffer())

        counter++

        if (counter >= 20) {
            isExhaling = !isExhaling
            counter = 0
        }
    }, 250)
})