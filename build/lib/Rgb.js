import { HEX_SYSTEM_VALUE, Hex, MAX_BYTE_VALUE } from "./Hex.js";
import { Hsl, MaxHSLNumber } from "./Hsl.js";
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
        const hexRed = this._rgbNumberAsHexNumber(this._red);
        const hexGreen = this._rgbNumberAsHexNumber(this._green);
        const hexBlue = this._rgbNumberAsHexNumber(this._blue);
        return new Hex(`#${hexRed}${hexGreen}${hexBlue}`);
    }
    asHsl() {
        // Max byte value is 255, and max rgb value is 255
        const red = this._red / MAX_BYTE_VALUE;
        const green = this._green / MAX_BYTE_VALUE;
        const blue = this._green / MAX_BYTE_VALUE;
        const max = Math.max(red, green, blue);
        const min = Math.min(red, green, blue);
        let hue = 0;
        let saturation = 0;
        const lightness = (max + min) * 0.5;
        if (max !== min) {
            const delta = max - min;
            saturation =
                lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);
            switch (max) {
                case red:
                    hue = (green - blue) / delta + (green < blue ? 6 : 0);
                    break;
                case green:
                    hue = (blue - red) / delta + 2;
                    break;
                case blue:
                    hue = (red - green) / delta + 4;
                    break;
            }
            hue /= 6;
        }
        return new Hsl({
            hue: (hue * MaxHSLNumber.Hue),
            saturation: (saturation *
                MaxHSLNumber.SaturationOrLightness),
            lightness: (lightness *
                MaxHSLNumber.SaturationOrLightness)
        });
    }
    random() {
        const red = ((Math.random() * MAX_BYTE_VALUE + 1) >> 0);
        const green = ((Math.random() * MAX_BYTE_VALUE + 1) >> 0);
        const blue = ((Math.random() * MAX_BYTE_VALUE + 1) >> 0);
        return new Rgb({
            red,
            green,
            blue
        });
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
    _rgbNumberAsHexNumber(color) {
        const hexColor = color.toString(HEX_SYSTEM_VALUE);
        return hexColor.length === 1 ? `0${hexColor}` : hexColor;
    }
}
