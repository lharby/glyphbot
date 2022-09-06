const Twit = require("twit");
const config = require("./config/config");

const T = new Twit(config);

const params = {
  q: "banana since:2011-07-11",
  count: 10,
};

const getData = (err, data, response) => {
  if (err) {
    console.log(`There was an error ${err}`);
  } else {
    console.log(data);
  }
};

T.get("search/tweets", params, getData);
