import fs from 'fs';
import client from 'https';
import path from 'path';
import uuid from 'uuid';
import dotenv from 'dotenv';

import { Dalle } from 'dalle-node';
import { rndAlphabet, rndFontFamily } from './components/arrays.js';

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const str = `The letter ${rndAlphabet} in a ${rndFontFamily} font.`;
console.log(str);

function downloadImage(url, filepath) {
    client.get(url, res => {
        res.pipe(fs.createWriteStream(filepath));
    });
}

const dalle = new Dalle(process.env.NEXT_DALLE_API_KEY);

const generations = await dalle.generate(str);

const imagesArray = generations.data.map(item => item.generation.image_path);

imagesArray.forEach(item => {
    const fileName = uuid.v4() + '.webp';
    return downloadImage(item, path.join('src', 'img', fileName));
});
