import fs from 'fs';
import path from 'path';
import uuid from 'uuid';
import dotenv from 'dotenv';

import { Configuration, OpenAIApi } from 'openai';
import Mastodon from 'mastodon-api';

import { downloadFile } from './utils/downloadFiles.js';
import { rndAlphabet, rndFontFamily, rndColour } from './utils/arrays.js';

const now = new Date();
const today = now.toLocaleString('en-gb');
const interval = 1000 * 60 * 60 * 24; // 24 hours
const errorFile = path.join(process.cwd(), 'src', 'log', 'errors.txt');
const errorStream = fs.createWriteStream(errorFile, { flags: 'a' });

if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const config = {
    access_token: process.env.NEXT_MASTODON_ACCESS_TOKEN,
    timeout_ms: 60 * 1000,
    api_url: 'https://botsin.space/api/v1/',
};

const M = new Mastodon(config);

let imagesArray = [];
let newImageNames = [];

const arrKeys = [
    process.env.NEXT_DALLE_API_KEY_1,
    process.env.NEXT_DALLE_API_KEY_2,
    process.env.NEXT_DALLE_API_KEY_3,
    process.env.NEXT_DALLE_API_KEY_4,
];

// get random api key
const rndKey = arrKeys[Math.floor(Math.random() * arrKeys.length)];

// set a key for the openai config
const configuration = new Configuration({
    apiKey: rndKey,
});
const openai = new OpenAIApi(configuration);

// prompt and call the api with our string
const prompt = `The letter ${rndAlphabet} in a ${rndFontFamily} font on a ${rndColour} coloured background.`;

// function to retrieve data with prompt
const fetchData = async () => {
    try {
        const response = await openai.createImage({
            prompt,
            n: 4,
            size: '512x512',
        });
        imagesArray = response.data.data.map(item => item.url);
        processData();
    } catch (error) {
        if (error.response) {
            errorStream.write(
                `${today}. Error reading from fetchData and error response: ${JSON.stringify(
                    error.response.data
                )} \n`
            );
            errorStream.end();
        } else {
            errorStream.write(
                `${today}. Error reading from fetchData and error message: ${JSON.stringify(
                    error.message
                )} \n`
            );
            errorStream.end();
        }
        postDataFallback();
    }
};

// for each image downloaded add a filename
// using the prompt and a random uuid
const processData = () => {
    const processDataCallback = () => {
        postData();
    };
    try {
        imagesArray.forEach((item, index) => {
            const fileName = `${prompt}__${index}_${uuid.v4()}.png`;
            const filePath = path.join(
                process.cwd(),
                'src',
                'img-archive',
                fileName
            );
            newImageNames.push(fileName);
            return downloadFile(item, filePath, processDataCallback);
        });
    } catch (error) {
        errorStream.write(
            `${today}. Error reading from processData: ${error} \n`
        );
        errorStream.end();
        postDataFallback();
    }
};

// postData function
const postData = () => {
    try {
        const fileName =
            newImageNames[Math.floor(Math.random() * newImageNames.length)];
        const filePath = path.join(
            process.cwd(),
            'src',
            'img-archive',
            fileName
        );
        const fileStream = fs.createReadStream(filePath);
        const responseParams = {
            file: fileStream,
            description: prompt,
        };
        M.post('media', responseParams).then(response => {
            const mediaId = response.data.id;
            const mediaParams = {
                status: '',
                media_ids: [mediaId],
            };
            M.post('statuses', mediaParams).then(response => {
                if (response.data.id) {
                    removeFile();
                    console.log(`Removing file ${fileName}`);
                }
            });
        });
        const removeFile = () => {
            fs.rmSync(
                path.join(process.cwd(), 'src', 'img-archive', fileName),
                {
                    force: true,
                }
            );
        };
    } catch (error) {
        errorStream.write(`${today}. Error reading from postData: ${error} \n`);
        errorStream.end();
        postDataFallback();
    }
};

// fallback if any of the methods fail
const postDataFallback = () => {
    try {
        fs.readdir(
            path.join(process.cwd(), 'src', 'img-archive'),
            (err, files) => {
                if (err) {
                    console.log('err:', err);
                    errorStream.write(
                        `${today}. Error reading from postDataFallback read files: ${err} \n`
                    );
                    errorStream.end();
                }
                const max = files.length - 1;
                const min = 0;
                const index = Math.round(Math.random() * (max - min) + min);
                const fileName = files[index];
                const fileStream = fs.createReadStream(
                    path.join(process.cwd(), 'src', 'img-archive', fileName)
                );
                const promptFallback = fileName.split('__')[0];
                const responseParams = {
                    file: fileStream,
                    description: promptFallback,
                };
                M.post('media', responseParams).then(response => {
                    const mediaId = response.data.id;
                    const mediaParams = {
                        status: '',
                        media_ids: [mediaId],
                    };
                    M.post('statuses', mediaParams).then(response => {
                        console.log(
                            'final response data id: ',
                            response.data.id
                        );
                        if (response.data.id) {
                            removeFile();
                            console.log(`Removing file ${fileName}`);
                        }
                    });
                });

                const removeFile = () => {
                    fs.rmSync(
                        path.join(
                            process.cwd(),
                            'src',
                            'img-archive',
                            fileName
                        ),
                        {
                            force: true,
                        }
                    );
                };
            }
        );
    } catch (error) {
        errorStream.write(
            `${today}. Error reading from postDataFallback: ${error} \n`
        );
        errorStream.end();
    }
};

// Run fetchData once then schedule it.
fetchData();

if (process.env.NODE_ENV !== 'production') {
    // Create a random time of day to post to the API
    const rndIntervalFunction = () => {
        const nextRunIn = Math.floor(Math.random() * interval);
        setTimeout(fetchData, nextRunIn);
    };

    // Run this function every 24 hours
    setInterval(rndIntervalFunction, interval);

    rndIntervalFunction();
}
