"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("stratumkit-node/lib/app");
var llui_1 = require("stratumkit-node/lib/llui");
var ui_1 = require("stratumkit-node/lib/ui");
var enums_1 = require("stratumkit-node/lib/ui/enums/enums");
var app = new app_1.App();
var ui = new ui_1.UI(app);
app.onInput = function (input) { return ui.handleInput(input); };
(_a = app.start(process.argv[2])) === null || _a === void 0 ? void 0 : _a.then(function () {
    var counter = 0;
    var isExhaling = false;
    setInterval(function () {
        var gfx = new llui_1.Graphics();
        var f = counter / 19;
        var lum = Math.floor(255 * f);
        gfx.drawEllipse(50, 50, 140, 140, 50, 50, 50);
        if (isExhaling) {
            var radius = (1 - f) * 40 + 30;
            gfx.drawEllipse(Math.round(120 - radius), Math.round(120 - radius), Math.round(radius * 2), Math.round(radius * 2), 0, 255 - lum, 0);
            gfx.drawAlignedText(0, 0, 240, 240, enums_1.Alignment.MIDDLE, "Exhale", 255 - lum, 255, 255 - lum);
        }
        else {
            var radius = f * 40 + 30;
            gfx.drawEllipse(Math.round(120 - radius), Math.round(120 - radius), Math.round(radius * 2), Math.round(radius * 2), 0, 0, lum);
            gfx.drawAlignedText(0, 0, 240, 240, enums_1.Alignment.MIDDLE, "Inhale", lum, lum, 255);
        }
        app.sendCommand(0x10, gfx.toBuffer());
        counter++;
        if (counter >= 20) {
            isExhaling = !isExhaling;
            counter = 0;
        }
    }, 250);
});
