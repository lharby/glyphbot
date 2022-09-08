import fs from 'fs';
import client from 'https';
import path from 'path';

function downloadImage(url, fileName, callback) {
    client.get(url, res => {
        res.pipe(fs.createWriteStream(fileName)).on('close', callback);
    });
}

const callback = () => console.log('done');

downloadImage(
    'https://www.google.com/images/srpr/logo3w.png',
    path.join('src', 'img', 'google.png'),
    callback
);
