import { Rgb } from "./Rgb.js";
export const HEX_SYSTEM_VALUE = 16;
export const MAX_BYTE_VALUE = 255;
export class Hex {
    _hex;
    constructor(hex) {
        this._hex = hex;
    }
    asRgb() {
        const hex = this._hex.replace("#", "");
        const hexNumber = parseInt(hex, HEX_SYSTEM_VALUE);
        const red = (hexNumber >> 16 /* ByteLength.Two */);
        const green = ((hexNumber >> 8 /* ByteLength.One */) & MAX_BYTE_VALUE);
        const blue = (hexNumber & MAX_BYTE_VALUE);
        return new Rgb({ red, green, blue });
    }
    asHsl() {
        return this.asRgb().asHsl();
    }
    luminance() {
        return this.asRgb().luminance();
    }
    readColor() {
        return this._hex;
    }
}
