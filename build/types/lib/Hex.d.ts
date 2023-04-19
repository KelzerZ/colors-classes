import { Rgb } from "./Rgb";
import { Color } from "./color";
type HexType = `#${string}`;
export declare const HEX_SYSTEM_VALUE = 16;
export declare const MAX_BYTE_VALUE = 255;
export declare class Hex implements Color<HexType> {
    private _hex;
    constructor(hex: HexType);
    asRgb(): Rgb;
    luminance(): number;
    readColor(): HexType;
}
export {};
