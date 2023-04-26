import { Hex } from "./Hex.js";
import { IntRange, Rgb } from "./Rgb.js";
import { Color } from "./color";
export type HueNumber = IntRange<361>;
export type SaturationOrLightnessNumber = IntRange<101>;
export declare enum MaxHSLNumber {
    Hue = 360,
    SaturationOrLightness = 100
}
interface HslColor {
    hue: HueNumber;
    saturation: SaturationOrLightnessNumber;
    lightness: SaturationOrLightnessNumber;
}
export declare class Hsl implements Color<HslColor, Hsl> {
    private _hue;
    private _saturation;
    private _lightness;
    constructor({ hue, saturation, lightness }: HslColor);
    asRgb(): Rgb;
    asHex(): Hex;
    random(): Hsl;
    luminance(): number;
    readColor(): HslColor;
    private _hslNumberToRgbNumber;
}
export {};
