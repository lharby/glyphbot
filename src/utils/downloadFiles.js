const fs = require('fs');
const fetch = require('node-fetch');

const downloadFile = async (url, path) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFile(path, buffer, (err) => {
        if (err) {
            console.log(`Error from downloadFile, writeFile function ${err}`);
        }
    });
}

exports.downloadFile = downloadFile;