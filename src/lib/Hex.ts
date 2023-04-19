import { Rgb, RgbNumber } from "./Rgb";
import { Color } from "./color";

type HexType = `#${string}`;

const enum ByteLength {
	One = 8,
	Two = 16
}

export const HEX_SYSTEM_VALUE = 16;
const MAX_BYTE_VALUE = 255;

export class Hex implements Color<HexType> {
	private _hex: HexType;

	constructor(hex: HexType) {
		this._hex = hex;
	}

	public asRgb() {
		const hex = this._hex.replace("#", "");
		const hexNumber = parseInt(hex, HEX_SYSTEM_VALUE);

		const red = (hexNumber >> ByteLength.Two) as RgbNumber;
		const green = ((hexNumber >> ByteLength.One) & MAX_BYTE_VALUE) as RgbNumber;
		const blue = (hexNumber & MAX_BYTE_VALUE) as RgbNumber;

		return new Rgb({ red, green, blue });
	}

	public readColor(): HexType {
		return this._hex;
	}
}
