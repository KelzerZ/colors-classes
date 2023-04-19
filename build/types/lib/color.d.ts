export interface Color<T> {
    luminance(): number;
    readColor(): T;
}
