import { HEX_SYSTEM_VALUE, Hex, MAX_BYTE_VALUE } from "./Hex.js";
import {
	Hsl,
	HueNumber,
	MaxHSLNumber,
	SaturationOrLightnessNumber
} from "./Hsl.js";
import { Color } from "./color";

export type IntRange<
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

export class Rgb implements Color<RgbColor, Rgb> {
	private _red: RgbNumber;
	private _green: RgbNumber;
	private _blue: RgbNumber;

	constructor({ red, green, blue }: RgbColor) {
		this._red = red;
		this._green = green;
		this._blue = blue;
	}

	public asHex(): Hex {
		const hexRed = this._rgbNumberAsHexNumber(this._red);
		const hexGreen = this._rgbNumberAsHexNumber(this._green);
		const hexBlue = this._rgbNumberAsHexNumber(this._blue);

		return new Hex(`#${hexRed}${hexGreen}${hexBlue}`);
	}

	public asHsl(): Hsl {
		// Max byte value is 255, and max rgb value is 255
		const red = this._red / MAX_BYTE_VALUE;
		const green = this._green / MAX_BYTE_VALUE;
		const blue = this._green / MAX_BYTE_VALUE;

		const max = Math.max(red, green, blue);
		const min = Math.min(red, green, blue);

		let hue = 0;
		let saturation = 0;
		const lightness = (max + min) * 0.5;

		if (max !== min) {
			const delta = max - min;

			saturation =
				lightness > 0.5 ? delta / (2 - max - min) : delta / (max + min);

			switch (max) {
				case red:
					hue = (green - blue) / delta + (green < blue ? 6 : 0);
					break;
				case green:
					hue = (blue - red) / delta + 2;
					break;
				case blue:
					hue = (red - green) / delta + 4;
					break;
			}
			hue /= 6;
		}

		return new Hsl({
			hue: (hue * MaxHSLNumber.Hue) as HueNumber,
			saturation: (saturation *
				MaxHSLNumber.SaturationOrLightness) as SaturationOrLightnessNumber,
			lightness: (lightness *
				MaxHSLNumber.SaturationOrLightness) as SaturationOrLightnessNumber
		});
	}

	public random(): Rgb {
		const red = ((Math.random() * MAX_BYTE_VALUE + 1) >> 0) as RgbNumber;
		const green = ((Math.random() * MAX_BYTE_VALUE + 1) >> 0) as RgbNumber;
		const blue = ((Math.random() * MAX_BYTE_VALUE + 1) >> 0) as RgbNumber;

		return new Rgb({
			red,
			green,
			blue
		});
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

	private _rgbNumberAsHexNumber(color: RgbNumber): string {
		const hexColor = color.toString(HEX_SYSTEM_VALUE);

		return hexColor.length === 1 ? `0${hexColor}` : hexColor;
	}
}
