const fs = require('fs');
const path = require('path');

fs.readdir(path.join(process.cwd(), 'src', 'img-archive'), (err, files) => {
    console.log(err, files);

    let max = files.length - 1;
    let min = 0;

    let index = Math.round(Math.random() * (max - min) + min);
    let file = files[index];

    console.log('Random file is', file);
});
