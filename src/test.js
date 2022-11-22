import path from 'path';
import uuid from 'uuid';

import { downloadFile } from './utils/downloadFiles.js';
const prompt = 'file';
const timestamp = new Date().getTime();

const fetchImage = () => {
    const fileName = `${prompt}-${timestamp}__${uuid.v4()}.png`;
    const filePath = path.join('src', 'img', fileName);
    try {
        downloadFile(
            'https://www.google.com/images/srpr/logo3w.png',
            filePath,
            fetchImageCallback
        );
    } catch (err) {
        console.log('err: ', err);
    }
};

const fetchImageCallback = () => console.log('done');

fetchImage();
