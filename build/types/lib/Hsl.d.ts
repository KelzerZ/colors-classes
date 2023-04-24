import { Hex } from "./Hex.js";
import { IntRange, Rgb } from "./Rgb.js";
import { Color } from "./color";
export type HueNumber = IntRange<361>;
export type SaturationOrLightnessNumber = IntRange<101>;
export declare const MAX_HUE_VALUE = 360;
export declare const MAX_SATURATION_OR_LIGHTNESS_VALUE = 100;
interface HslColor {
    hue: HueNumber;
    saturation: SaturationOrLightnessNumber;
    lightness: SaturationOrLightnessNumber;
}
export declare class Hsl implements Color<HslColor> {
    private _hue;
    private _saturation;
    private _lightness;
    constructor({ hue, saturation, lightness }: HslColor);
    asRgb(): Rgb;
    asHex(): Hex;
    luminance(): number;
    readColor(): HslColor;
    private _hueToRgb;
}
export {};
