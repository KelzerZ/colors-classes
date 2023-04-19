import { HEX_SYSTEM_VALUE, Hex } from "./Hex";
import { Color } from "./color";

type IntRange<
	N extends number,
	Acc extends number[] = []
> = Acc["length"] extends N
	? Acc[number]
	: IntRange<N, [...Acc, Acc["length"]]>;

export type RgbNumber = IntRange<256>;

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

	public readColor(): RgbColor {
		return {
			red: this._red,
			green: this._green,
			blue: this._blue
		};
	}
}
