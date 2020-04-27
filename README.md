# P5 Sketches

This is a repo containing my [p5js](https://p5js.org/) sketches.

## Requirements

The only requirement to use this repo is having [npm](https://www.npmjs.com/) installed.

Run `npm install` in the project's root.

## Sketching

Place your sketch (`ts` files) inside the `src` 
directory. Note that this is compiled as a single 
*module*, so any classes or functions declared in the 
global scope can be used inside any other file an be 
careful how you name then since they will hide each other. 

There's a specific order to how `tsc` compiles files
that you can modify inside the `.tsconfig` file.

The entrypoint for rendering a sketch is the `src/index.ts` file, which
typically contains the following:

```typescript
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const factory = ((): Sketch => new Sketch())();

const setup = (): void => factory.setup();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const draw = (): void => factory.draw();
```

A `p5` sketch is comprised of two (three) main 
functions, I've modeled this with the `ISketch`
interface located inside `src/interfaces/ISketch.ts`, the `Sketch` type
you can see in the code above is supposed to implement `ISketch`, but since
this is *typescript*, any type that is *structurally typed* like an `ISketch`
may be used. These types should define `setup` and `draw` (hadn't had the
need for the `preload` function yet).

So, the workflow would be along the following:

* Create a new type that implements `ISketch`.
* Define two functions for that type, namely `setup` and `draw`.
* Sketch inside those functions
* Instance the new *sketch-like* type inside the right hand-side of factory.

### Hot reloading

Since `p5` sketches are supposed to run in the browser (not really, but here 
they do :)), in order to see the currently instanced sketch, you have to run
`npm start` which will run a server with *hot reloading* that will watch
the files inside `src` for changes (It has a bug, when saving it reloads twice,
but that isn't really a problem when you're seeding the `random`s).

Enjoy!


