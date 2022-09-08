import fs from 'fs';
import client from 'https';
import uuid from 'uuid';
import { Dalle } from 'dalle-node';
import { configDalle } from '../config/config.js';
import { rndAlphabet, rndFontFamily } from './components/arrays.js';

const imageFolder = './img';
const str = `The letter ${rndAlphabet} in a ${rndFontFamily} font.`;
console.log(str);

function downloadImage(url, filepath) {
    client.get(url, res => {
        res.pipe(fs.createWriteStream(filepath));
    });
}

const dalle = new Dalle(configDalle);

const generations = await dalle.generate(str);

const imagesArray = generations.data.map(item => item.generation.image_path);

imagesArray.forEach(item => {
    const fileName = uuid.v4() + '.webp';
    return downloadImage(item, `${imageFolder}/${fileName}`);
});
