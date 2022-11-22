import fs from 'fs';
import client from 'https';

const downloadFile = (url, fileName, callback) => {
    client.get(url, res => {
        res.pipe(fs.createWriteStream(fileName)).on('close', callback);
    });
};

export { downloadFile };
