export interface Color<T, U> {
	luminance(): number;
	random(): U;

	readColor(): T;
}
