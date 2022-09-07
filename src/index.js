import Twit from 'twit';
import { configTwitter } from '../config/config.js';
import { rndAlphabet, rndFontFamily } from './components/arrays.js';

const T = new Twit(configTwitter);

const params = {
    status: `The letter ${rndAlphabet} in a ${rndFontFamily} font.`,
};

console.log(params);

const getData = (err, data, response) => {
    if (err) {
        console.log(`There was an error ${err}`);
    } else {
        console.log(data);
    }
};

// T.post('statuses/update', params, getData);
