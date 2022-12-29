
import { arrAlphabet, arrFontFamilies, arrColours } from './utils/arrays.js';

let rndAlphabet;
let rndFontFamily;
let rndColour;

const interval = 1000;

// Create a random time of day to post to the API
const rndIntervalFunction = () => {
    const nextRunIn = Math.floor(Math.random() * interval);
    rndAlphabet = arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)].toString();
    rndFontFamily = arrFontFamilies[Math.floor(Math.random() * arrFontFamilies.length)].toString();
    rndColour = arrColours[Math.floor(Math.random() * arrColours.length)].toString();
    const hms = new Date(nextRunIn).toLocaleTimeString('en-GB');
    console.log(`nextRunIn: ${hms}`);
    console.log(rndAlphabet, rndFontFamily, rndColour);
};

// Run this function every 24 hours
setInterval(rndIntervalFunction, interval);
rndIntervalFunction();