import { Rgb } from "./Rgb.js";
import { Color } from "./color";
type HexColor = `#${string}`;
export declare const HEX_SYSTEM_VALUE = 16;
export declare const MAX_BYTE_VALUE = 255;
export declare class Hex implements Color<HexColor> {
    private _hex;
    constructor(hex: HexColor);
    asRgb(): Rgb;
    luminance(): number;
    readColor(): HexColor;
}
export {};
