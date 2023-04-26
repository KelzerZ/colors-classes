# Colors-classes

This package is designed for people who want to work with different color schemes in OOP format.

## Install

```
npm install colors-classes
yarn add colors-classes
pnpm install colors-classes
```

## Getting Started

Depending on which modules you use (Es6 or CommonJS), you import the package and can safely use it.
For example, I will import using Es6 modules.

```ts
import { Rgb } from "colors-classes";

const rgb = new Rgb({
	red: 255,
	green: 50,
	blue: 100
});

console.log(rgb.luminance()); // You'll see a value from 0 to 1
console.log(rgb.random()); // You'll see a new rgb color
console.log(rgb.readColor()); // You'll see a value as { red, green, blue }
console.log(rgb.asHex()); // You'll see a value as #HexValue
```

## API

At the moment there are 3 classes defining color systems **(Hex and Rgb, Hsl)**
And all classes have 3 common methods: **luminance**, **readColor**, **random**.

In addition, each class has a method that allows you to convert the value of one color system to another.
All such methods are called using **_as_**, followed by the name of the color system, that is: asRgb, asHex, etc.

## Review

If you want to write a review on my package, you can do it on the github repository page

https://github.com/KelzerZ/colors-classes

I hope you will find any errors in my project in order to point them out to me and I was able to make the project much better.
