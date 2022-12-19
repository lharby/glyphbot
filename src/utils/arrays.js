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
    'yellow',
    'white',
    'black',
    'grey',
    'silver',
    'gold',
    'beige',
    'tan'
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
