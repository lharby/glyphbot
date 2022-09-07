import Twit from 'twit';
import { configTwitter } from '../config/config.js';
import { rndAdjective, rndNoun } from './components/data.js';

console.log(rndAdjective, rndNoun);

const T = new Twit(configTwitter);

const params = {
    status: `This is a ${rndAdjective} ${rndNoun} generated sentence.`,
};

const getData = (err, data, response) => {
    if (err) {
        console.log(`There was an error ${err}`);
    } else {
        console.log(data);
    }
};

// T.post('statuses/update', params, getData);
