import { Hsl } from "./Hsl.js";
import { Rgb } from "./Rgb.js";
import { Color } from "./color";
type HexColor = `#${string}`;
export declare const HEX_SYSTEM_VALUE = 16;
export declare const MAX_BYTE_VALUE = 255;
export declare class Hex implements Color<HexColor, Hex> {
    private _hex;
    constructor(hex: HexColor);
    asRgb(): Rgb;
    asHsl(): Hsl;
    random(): Hex;
    luminance(): number;
    readColor(): HexColor;
}
export {};
