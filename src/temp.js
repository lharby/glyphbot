import { Dalle } from 'dalle-node';
import { configDalle } from '../config/config.js';
import fs from 'fs';
import client from 'https';
import uuid from 'uuid';

const imageFolder = './img';

function downloadImage(url, filepath) {
    client.get(url, res => {
        res.pipe(fs.createWriteStream(`${imageFolder}/${filepath}`));
    });
}

const dalle = new Dalle(configDalle);

// const generations = await dalle.generate('The letter d in pixelated font');

const imagesArray = ['image1', 'image2', 'image3'];

imagesArray.forEach(item => {
    const fileName1 = uuid.v4() + '.webp';
    const fileName2 = new Date().getTime().toString();
    // downloadImage(item, fileName1);
    console.log(fileName1, fileName2, typeof fileName1, typeof fileName2);
});

console.log(imagesArray);
