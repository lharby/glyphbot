import dotenv from 'dotenv';
import Twit from 'twit';
import { rndAlphabet, rndFontFamily } from './components/arrays.js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const configTwitter = {
    consumer_key: process.env.NEXT_TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.NEXT_TWITTER_CONSUMER_SECRET,
    access_token: process.env.NEXT_TWITTER_ACCESS_TOKEN,
    access_token_secret: process.env.NEXT_TWITTER_ACCESS_TOKEN_SECRET,
};

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

T.get('search/tweets', { q: 'banana since:2011-07-11', count: 3 }, getData);

// T.post('statuses/update', params, getData);
