import { MAX_BYTE_VALUE } from "./Hex.js";
import { Rgb } from "./Rgb.js";
export const MAX_HUE_VALUE = 360;
export const MAX_SATURATION_OR_LIGHTNESS_VALUE = 100;
export class Hsl {
    _hue;
    _saturation;
    _lightness;
    constructor({ hue, saturation, lightness }) {
        this._hue = hue;
        this._saturation = saturation;
        this._lightness = lightness;
    }
    asRgb() {
        const hue = this._hue / MAX_HUE_VALUE;
        const saturation = this._saturation / MAX_SATURATION_OR_LIGHTNESS_VALUE;
        const lightness = this._lightness / MAX_SATURATION_OR_LIGHTNESS_VALUE;
        if (saturation === 0) {
            // Max byte value is 255, and max rgb value is 255
            return new Rgb({
                red: (lightness * MAX_BYTE_VALUE),
                green: (lightness * MAX_BYTE_VALUE),
                blue: (lightness * MAX_BYTE_VALUE)
            });
        }
        const q = lightness < 0.5
            ? lightness * (1 + saturation)
            : lightness + saturation - lightness * saturation;
        const p = 2 * lightness - q;
        return new Rgb({
            red: this._hueToRgb(p, q, hue + 1 / 3),
            green: this._hueToRgb(p, q, hue),
            blue: this._hueToRgb(p, q, hue - 1 / 3)
        });
    }
    asHex() {
        return this.asRgb().asHex();
    }
    luminance() {
        return this.asRgb().luminance();
    }
    readColor() {
        return {
            hue: this._hue,
            saturation: this._saturation,
            lightness: this._lightness
        };
    }
    _hueToRgb(p, q, t) {
        if (t < 0)
            t += 1;
        if (t > 1)
            t -= 1;
        // Max byte value is 255, and max rgb value is 255
        if (t < 1 / 6)
            return ((p + (q - p) * 6 * t) * MAX_BYTE_VALUE);
        if (t < 1 / 2)
            return (q * MAX_BYTE_VALUE);
        if (t < 2 / 3)
            return ((p + (q - p) * (2 / 3 - t) * 6) * MAX_BYTE_VALUE);
        return (p * MAX_BYTE_VALUE);
    }
}
