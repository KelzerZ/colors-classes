import { HEX_SYSTEM_VALUE, Hex, MAX_BYTE_VALUE } from "./Hex.js";
import { Color } from "./color";

type IntRange<
	N extends number,
	Acc extends number[] = []
> = Acc["length"] extends N
	? Acc[number]
	: IntRange<N, [...Acc, Acc["length"]]>;

export type RgbNumber = IntRange<256>;

const enum LuminanceRatio {
	Red = 0.2126,
	Green = 0.7152,
	Blue = 0.0722
}

interface RgbColor {
	red: RgbNumber;
	green: RgbNumber;
	blue: RgbNumber;
}

export class Rgb implements Color<RgbColor> {
	private _red: RgbNumber;
	private _green: RgbNumber;
	private _blue: RgbNumber;

	constructor({ red, green, blue }: RgbColor) {
		this._red = red;
		this._green = green;
		this._blue = blue;
	}

	public asHex(): Hex {
		const hexRed = this._red.toFixed(HEX_SYSTEM_VALUE);
		const hexGreen = this._green.toFixed(HEX_SYSTEM_VALUE);
		const hexBlue = this._green.toFixed(HEX_SYSTEM_VALUE);

		return new Hex(`#${hexRed}${hexGreen}${hexBlue}`);
	}

	public luminance(): number {
		const redLuminance = this._red * LuminanceRatio.Red;
		const greenLuminance = this._green * LuminanceRatio.Green;
		const blueLuminance = this._blue * LuminanceRatio.Blue;

		const luminance = redLuminance + greenLuminance + blueLuminance;

		// Max rgb value is 255, and max byte value is 255
		return Math.ceil(luminance / MAX_BYTE_VALUE);
	}

	public readColor(): RgbColor {
		return {
			red: this._red,
			green: this._green,
			blue: this._blue
		};
	}
}
