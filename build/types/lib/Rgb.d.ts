import { Hex } from "./Hex.js";
import { Hsl } from "./Hsl.js";
import { Color } from "./color";
export type IntRange<N extends number, Acc extends number[] = []> = Acc["length"] extends N ? Acc[number] : IntRange<N, [...Acc, Acc["length"]]>;
export type RgbNumber = IntRange<256>;
interface RgbColor {
    red: RgbNumber;
    green: RgbNumber;
    blue: RgbNumber;
}
export declare class Rgb implements Color<RgbColor> {
    private _red;
    private _green;
    private _blue;
    constructor({ red, green, blue }: RgbColor);
    asHex(): Hex;
    asHsl(): Hsl;
    luminance(): number;
    readColor(): RgbColor;
}
export {};
