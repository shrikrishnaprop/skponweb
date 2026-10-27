# libhsciifp

React font picker for the xi38asc WOFF2 font family set.

## Install

```sh
npm install libhsciifp
```

The picker code is licensed under MIT (`LICENSE`). The included font files are licensed under SIL Open Font License 1.1 (`fonts/OFL.txt`). Font files and derivatives must remain under OFL; they may be bundled with software but may not be sold by themselves. See the [official OFL text](https://openfontlicense.org/open-font-license-official-text/).

## Next.js usage

Import the font stylesheet once from the root app layout:

```tsx
import "libhsciifp/fonts.css";
```

Then render the picker in a client component:

```tsx
"use client";
import { FontPicker } from "libhsciifp";

export function SiteFontPicker() {
  return <FontPicker />;
}
```

`FontPicker` saves the selected font in local storage and applies it to the document body. The package also exports `LocalFontPicker` and `Hsciifontpicker` aliases, `FONT_CATALOG`, `DEFAULT_FONT_ID`, and `applyFont`.

## Refresh font assets

Run `python scripts/create_libhsciifp.py --source "C:\xpzs\pff\xnglofonts\woff2\xi38woff2\xi38asc" --output .` from this package directory. It copies the current `.woff2` set and regenerates `font-catalog.json` and `fonts.css`.
