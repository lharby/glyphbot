import fs from "fs";
import fetch from "node-fetch";

const downloadFile = async (url, path, cb) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(path, buffer);
    cb();
    console.log('file download complete from utils/downloadFile.js');
  }

export { downloadFile };