# px2v

[px2v on gh-pages](https://iguacel.github.io/px2v/)

## Developing

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```





Functionality
- Accepted files should not be an array. I just want the current accepted file, take data from it (width, height, number of pixels, name of the bitmap) and put that on a store. When an accepted file gets drop and the conversion succeed the component must be replaced for the newly generated svg. If error, show error.

Over the svg when it succeeds, an absolute positioned div, with flexbox or grid. 2 equal columns over the svg

* FIRST COL BUTTON Save as SVG - the button must be a css square with SVG written inside *

Options
The simple checkbox:
1) compound path
2) remove alpha 0
3) preffer viewbox

* SECOND Col BUTTON Save as JSON * the button must be a css square with JSON written inside

Options
1) Option minify json.

A div at the top of this one, prints the name of the file, small type the widthxheight in pixels and number of pixels. On the bottom of this a button that says: "Convert anohther image" This resets the app and makes the drop visible again.

The options must be reactive even after the svg is dropped, Maybe use a store., include a minimal checkbox component with squared corners.

---

Please give me linted individual and complete files to copy and paste
