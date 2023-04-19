import { HEX_SYSTEM_VALUE, Hex, MAX_BYTE_VALUE } from "./Hex";
export class Rgb {
    _red;
    _green;
    _blue;
    constructor({ red, green, blue }) {
        this._red = red;
        this._green = green;
        this._blue = blue;
    }
    asHex() {
        const hexRed = this._red.toFixed(HEX_SYSTEM_VALUE);
        const hexGreen = this._green.toFixed(HEX_SYSTEM_VALUE);
        const hexBlue = this._green.toFixed(HEX_SYSTEM_VALUE);
        return new Hex(`#${hexRed}${hexGreen}${hexBlue}`);
    }
    luminance() {
        const redLuminance = this._red * 0.2126 /* LuminanceRatio.Red */;
        const greenLuminance = this._green * 0.7152 /* LuminanceRatio.Green */;
        const blueLuminance = this._blue * 0.0722 /* LuminanceRatio.Blue */;
        const luminance = redLuminance + greenLuminance + blueLuminance;
        // Max rgb value is 255, and max byte value is 255
        return Math.ceil(luminance / MAX_BYTE_VALUE);
    }
    readColor() {
        return {
            red: this._red,
            green: this._green,
            blue: this._blue
        };
    }
}
