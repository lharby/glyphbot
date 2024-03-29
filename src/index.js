const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const dotenv = require('dotenv');

const { Configuration, OpenAIApi } = require('openai');
const Mastodon = require('mastodon-api');

const { downloadFile } = require('./utils/downloadFiles.js');
const {
    arrAlphabet,
    arrFontFamilies,
    arrColours,
} = require('./utils/arrays.js');

const now = new Date();
const today = now.toLocaleString('en-gb');
const errorFile = path.join(process.cwd(), 'log', 'errors.txt');
const errorStream = fs.createWriteStream(errorFile, { flags: 'a' });

dotenv.config();

const config = {
    access_token: process.env.NEXT_MASTODON_ACCESS_TOKEN,
    client_key: process.env.NEXT_MASTODON_CLIENT_KEY,
    client_secret: process.env.NEXT_MASTODON_CLIENT_SECRET,
    timeout_ms: 60 * 1000,
    api_url: 'https://botsin.space/api/v1/',
};

const M = new Mastodon(config);

let imagesArray = [];
let newImageNames = [];
let prompt;
let rndAlphabet;
let rndAlphabet2;
let rndFontFamily;
let rndColour;

// function to retrieve data with prompt
const fetchData = async () => {
    // set a key for the openai config
    const configuration = new Configuration({
        apiKey: process.env.NEXT_DALLE_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    // Retrieve random alphabetic character, font family and colour;
    rndAlphabet =
        arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)].toString();
    rndAlphabet2 =
        arrAlphabet[Math.floor(Math.random() * arrAlphabet.length)].toString();
    rndFontFamily =
        arrFontFamilies[
            Math.floor(Math.random() * arrFontFamilies.length)
        ].toString();
    rndColour =
        arrColours[Math.floor(Math.random() * arrColours.length)].toString();
    // create a randomised prompt;
    const intro = [`The letter ${rndAlphabet}`, `Not the letter ${rndAlphabet}`, `A malformed letter ${rndAlphabet}`, `The letters ${rndAlphabet} and ${rndAlphabet2}`];
    const rndIntro = intro[Math.floor(Math.random() * intro.length)].toString();
    prompt = `${rndIntro}, in a ${rndFontFamily} font, on a ${rndColour} coloured background`;
    imagesArray = [];
    newImageNames = [];
    // call the api with our prompt string;
    try {
        const response = await openai.createImage({
            prompt,
            n: 4,
            size: '512x512',
        });
        imagesArray = response.data.data.map(item => item.url);
        console.log(
            `${today}. Success from fetchData function. Reading with prompt ${prompt}`
        );
        if (response.data.created) {
            processData();
        }
    } catch (error) {
        if (error.response) {
            errorStream.write(
                `${today}. Error reading from fetchData, error response: ${JSON.stringify(
                    error.response.data
                )} \n`
            );
            errorStream.end();
        } else {
            errorStream.write(
                `${today}. Error reading from fetchData, error message: ${JSON.stringify(
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
        console.table(imagesArray);
        console.table(newImageNames);
        console.log(`calling processDataCallback`);
        console.log(`imagesArray.length: ${imagesArray.length}`);
        console.log(`newImageNames.length: ${newImageNames.length}`);
        postData();
    };
    try {
        const promises = imagesArray.map((item, index) => {
            const fileName = `${prompt}__${index}_${uuid.v4()}.png`;
            const filePath = path.join(
                process.cwd(),
                'img-archive',
                fileName
            );
            newImageNames.push(fileName);
            return downloadFile(item, filePath, () => {
                console.log('just wrote', filePath);
            });
        });
        Promise.all(promises).then(() => {
            processDataCallback();
        });
    } catch (error) {
        postDataFallback();
        errorStream.write(
            `${today}. Error reading from processData: ${error} \n`
        );
        errorStream.end();
    }
};

// postData function
const postData = () => {
    try {
        // Let's retrieve a random image from our images array
        const fileName =
            newImageNames[Math.floor(Math.random() * newImageNames.length)];
        const filePath = path.join(
            process.cwd(),
            'img-archive',
            fileName
        );
        // Create the raw image data
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
                    console.log(
                        `${today}. Success from postData function posting image to server. Removing file ${fileName}`
                    );
                }
            });
        });
        const removeFile = () => {
            fs.unlink(filePath, err => {
                if (err) {
                    errorStream.write(
                        `${today}. Error attempting to remove file from  postData function: ${err} \n`
                    );
                    errorStream.end();
                }
                console.log(`filePath from postData: ${filePath}`);
            });
            process.exit(0);
        };
    } catch (error) {
        postDataFallback();
        errorStream.write(`${today}. Error reading from postData: ${error} \n`);
        errorStream.end();
    }
};

// fallback if any of the methods fail
const postDataFallback = () => {
    try {
        fs.readdir(
            path.join(process.cwd(), 'img-archive'),
            (err, files) => {
                if (err) {
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
                    path.join(process.cwd(), 'img-archive', fileName)
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
                            `final response data id: ${response.data.id}`
                        );
                        if (response.data.id) {
                            removeFile();
                            console.log(
                                `${today}. Success from postDataFallback function posting image to server. Removing file: ${fileName}, file index: ${index}. Of total files: ${max}`
                            );
                        }
                    });
                });
                const removeFile = () => {
                    const filePath = path.join(
                        process.cwd(),
                        'img-archive',
                        fileName
                    );
                    fs.unlink(filePath, err => {
                        if (err) {
                            errorStream.write(
                                `${today}. Error attempting to remove file from  postDataFallback: ${err} \n`
                            );
                            errorStream.end();
                        }
                        console.log(
                            `filePath from postDataFallback: ${filePath}`
                        );
                    });
                    process.exit(0);
                };
            }
        );
    } catch (error) {
        errorStream.write(
            `${today}. Error reading from postDataFallback: ${error} \n`
        );
        errorStream.end();
        process.exit(1);
    }
};

// Run fetchData once then schedule it.
fetchData();
