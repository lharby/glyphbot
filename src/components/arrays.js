const alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const arrAlphabet = [...alphabet];

const arrFontFamilies = [
    'old gothic script',
    'pixelated',
    'serif',
    'sans serif',
    'cursive',
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

export const rndAlphabet =
    arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)].toString();

export const rndFontFamily =
    arrFontFamilies[
        Math.floor(Math.random() * arrFontFamilies.length)
    ].toString();

export const rndLanguage =
    arrLanguages[Math.floor(Math.random() * arrLanguages.length)].toString();
