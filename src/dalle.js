import { Dalle } from 'dalle-node';
import { configDalle } from '../config/config.js';
import fs from 'fs';
import client from 'https';
import uuid from 'uuid';

const imageFolder = './img';

function downloadImage(url, filepath) {
    client.get(url, res => {
        res.pipe(fs.createWriteStream(filepath));
    });
}

const dalle = new Dalle(configDalle);

const generations = await dalle.generate('The letter E in gothic script font');

const imagesArray = generations.data.map(item => item.generation.image_path);

console.log(`${imagesArray}`);

imagesArray.forEach(item => {
    const fileName = uuid.v4() + '.webp';
    // const fileName = new Date().getTime().toString() + '.webp';
    return downloadImage(item, `${imageFolder}/${fileName}`);
});
