import { Hsl } from "./Hsl.js";
import { Rgb, RgbNumber } from "./Rgb.js";
import { Color } from "./color";

type HexColor = `#${string}`;

const enum ByteLength {
	One = 8,
	Two = 16
}

export const HEX_SYSTEM_VALUE = 16;
export const MAX_BYTE_VALUE = 255;

export class Hex implements Color<HexColor, Hex> {
	private _hex: HexColor;

	constructor(hex: HexColor) {
		this._hex = hex;
	}

	public asRgb(): Rgb {
		const hex = this._hex.replace("#", "");
		const hexNumber = parseInt(hex, HEX_SYSTEM_VALUE);

		const red = (hexNumber >> ByteLength.Two) as RgbNumber;
		const green = ((hexNumber >> ByteLength.One) & MAX_BYTE_VALUE) as RgbNumber;
		const blue = (hexNumber & MAX_BYTE_VALUE) as RgbNumber;

		return new Rgb({ red, green, blue });
	}

	public asHsl(): Hsl {
		return this.asRgb().asHsl();
	}

	public random(): Hex {
		const hexValues = "0123456789abcdef";

		let result = "#";

		for (let i = 0; i < 6; i++) {
			result += hexValues[Math.random() * hexValues.length];
		}

		return new Hex(result as HexColor);
	}

	public luminance(): number {
		return this.asRgb().luminance();
	}

	public readColor(): HexColor {
		return this._hex;
	}
}
