import { Hex, MAX_BYTE_VALUE } from "./Hex.js";
import { IntRange, Rgb, RgbNumber } from "./Rgb.js";
import { Color } from "./color";

export type HueNumber = IntRange<361>;
export type SaturationOrLightnessNumber = IntRange<101>;

export enum MaxHSLNumber {
	Hue = 360,
	SaturationOrLightness = 100
}

interface HslColor {
	hue: HueNumber;
	saturation: SaturationOrLightnessNumber;
	lightness: SaturationOrLightnessNumber;
}

export class Hsl implements Color<HslColor, Hsl> {
	private _hue: HueNumber;
	private _saturation: SaturationOrLightnessNumber;
	private _lightness: SaturationOrLightnessNumber;

	constructor({ hue, saturation, lightness }: HslColor) {
		this._hue = hue;
		this._saturation = saturation;
		this._lightness = lightness;
	}

	public asRgb(): Rgb {
		const hue = this._hue / MaxHSLNumber.Hue;
		const saturation = this._saturation / MaxHSLNumber.SaturationOrLightness;
		const lightness = this._lightness / MaxHSLNumber.SaturationOrLightness;

		if (saturation === 0) {
			// Max byte value is 255, and max rgb value is 255
			return new Rgb({
				red: (lightness * MAX_BYTE_VALUE) as RgbNumber,
				green: (lightness * MAX_BYTE_VALUE) as RgbNumber,
				blue: (lightness * MAX_BYTE_VALUE) as RgbNumber
			});
		}

		const q =
			lightness < 0.5
				? lightness * (1 + saturation)
				: lightness + saturation - lightness * saturation;
		const p = 2 * lightness - q;

		return new Rgb({
			red: this._hslNumberToRgbNumber(p, q, hue + 1 / 3),
			green: this._hslNumberToRgbNumber(p, q, hue),
			blue: this._hslNumberToRgbNumber(p, q, hue - 1 / 3)
		});
	}

	public asHex(): Hex {
		return this.asRgb().asHex();
	}

	public random(): Hsl {
		const hue = ((Math.random() * MaxHSLNumber.Hue + 1) >> 0) as HueNumber;
		const saturation = ((Math.random() * MaxHSLNumber.SaturationOrLightness +
			1) >>
			0) as SaturationOrLightnessNumber;
		const lightness = ((Math.random() * MaxHSLNumber.SaturationOrLightness +
			1) >>
			0) as SaturationOrLightnessNumber;

		return new Hsl({
			hue: hue,
			saturation: saturation,
			lightness: lightness
		});
	}

	public luminance(): number {
		return this.asRgb().luminance();
	}

	public readColor(): HslColor {
		return {
			hue: this._hue,
			saturation: this._saturation,
			lightness: this._lightness
		};
	}

	private _hslNumberToRgbNumber(p: number, q: number, t: number): RgbNumber {
		if (t < 0) t += 1;
		if (t > 1) t -= 1;
		// Max byte value is 255, and max rgb value is 255
		if (t < 1 / 6) return ((p + (q - p) * 6 * t) * MAX_BYTE_VALUE) as RgbNumber;
		if (t < 1 / 2) return (q * MAX_BYTE_VALUE) as RgbNumber;
		if (t < 2 / 3)
			return ((p + (q - p) * (2 / 3 - t) * 6) * MAX_BYTE_VALUE) as RgbNumber;
		return (p * MAX_BYTE_VALUE) as RgbNumber;
	}
}
