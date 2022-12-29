import { promises as fs} from "fs";
import fetch from "node-fetch";

const downloadFile = async (url, path) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFile(path, buffer);
  }

export { downloadFile };