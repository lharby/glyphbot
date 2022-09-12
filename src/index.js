import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Stream } from 'stream';

import Twit from 'twit';
import { rndAlphabet, rndFontFamily } from './components/arrays.js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

let today = new Date();
today = today.toLocaleString('en-gb');
const errorFile = path.join('src', 'log', 'errors.txt');
const stream = fs.createWriteStream(errorFile, { flags: 'a' });

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

const readImageFile = () => {
    fs.readdir(path.join('src', 'img'), (err, files) => {
        if (err || files.length !== 1) {
            console.log(`There was an error reading the file: ${err}`);
            stream.write(`${today}. Error reading from file: ${err} \n`);
            stream.end();
        } else {
            processFiles(files[0]);
        }
    });

    const processFiles = fileName => {
        // Read the file
        const imageContent = fs.readFileSync(
            path.join('src', 'img', `${fileName}`),
            { encoding: 'base64' }
        );

        // Upload the media
        T.post('media/upload', { media_data: imageContent }, mediaUploaded);
    };
};

const mediaUploaded = (err, data, response) => {
    if (err) {
        console.log(`There was a mediaUploaded error: ${err}`);
        stream.write(`${today}. Error from mediaUploaded: ${err} \n`);
        stream.end();
    } else {
        // Now we can reference the media and post a tweet
        // with the media attached
        const mediaIdStr = data.media_id_string;
        const params = {
            media_ids: [mediaIdStr],
        };

        // Post tweet
        T.post('statuses/update', params, postData);
    }
};

const postData = (err, data, response) => {
    if (err) {
        console.log(`There was an postData error: ${err}`);
        stream.write(`${today}. Error from postData: ${err} \n`);
        Stream.end();
    } else {
        console.log(`success!: ${JSON.stringify(data.created_at)}`);
    }
};

readImageFile();
