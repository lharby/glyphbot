const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const arrAlphabet = [...alphabet];

const arrFontFamilies = [
    'old gothic script',
    'pixelated',
    'serif',
    'sans serif',
    'cursive',
    'monospace',
];

const arrLanguages = [
    'Arabic',
    'Aramaic',
    'Armenian',
    'Brahmi',
    'Cyrillic',
    'Georgian',
    'Greek',
    'Latin',
];

const arrColours = [
    'red',
    'orange',
    'yellow',
    'green',
    'cyan',
    'blue',
    'magenta',
    'fuchsia',
    'purple',
    'white',
    'black',
    'grey',
    'silver',
    'gold',
    'pink',
    'maroon',
    'brown',
    'beige',
    'tan',
    'lime',
    'olive',
    'turquoise',
    'teal',
    'pale blue',
    'navy blue',
    'indigo',
    'violet',
];

export const rndAlphabet =
    arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)].toString();

export const rndFontFamily =
    arrFontFamilies[
        Math.floor(Math.random() * arrFontFamilies.length)
    ].toString();

export const rndLanguage =
    arrLanguages[Math.floor(Math.random() * arrLanguages.length)].toString();

export const rndColour =
    arrColours[Math.floor(Math.random() * arrColours.length)].toString();
