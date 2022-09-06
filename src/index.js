const Twit = require('twit');
const config = require('../config/config');
const arrays = require('./components/data');

console.log(arrays.rndAdjective, arrays.rndNoun);

const T = new Twit(config);

const params = {
  status: `This is a ${arrays.rndAdjective} ${arrays.rndNoun} generated sentence.`,
};

const getData = (err, data, response) => {
  if (err) {
    console.log(`There was an error ${err}`);
  } else {
    console.log(data);
  }
};

T.post('statuses/update', params, getData);
