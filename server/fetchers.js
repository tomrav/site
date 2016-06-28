const http = require('http');
const https = require('https');
const fs = require('fs');
const FETCHTYPES = {
  REPS: { name: 'reps', index: 0, query: 'https://www.oknesset.org/api/v2/member/?is_current=true',
          filename: 'reps.json' },
  PARTY: { name: 'party', index: 1, query: 'https://www.oknesset.org/api/v2/party/?format=json',
          filename: 'parties.json' },
  VOTE: { name: 'vote', index: 2, query: 'https://www.oknesset.org/api/v2/vote/?format=json',
          filename: 'votes.json' },
};

function parseData(data, res, filename) {
  let responseString = '';
  data.on('data', (chunk) => {
    responseString += chunk;
  });
  data.on('end', () => {
    const jsonFile = JSON.parse(responseString.substring(11, responseString.lastIndexOf(']') + 1));
    fs.writeFile(filename, JSON.stringify(jsonFile), (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
  res.end();
}

function getOkData(res, fetchType, filename) {
  https.get(fetchType, (req) => {
    parseData(req, res, filename);
  }).end();
}

http.createServer((req, res) => {
  for (var fetchName in FETCHTYPES) {
    console.log(fetchName);
    const fetchtype = FETCHTYPES[fetchName];
    getOkData(res, fetchtype.query, fetchtype.filename);
  }
}).listen(8080);
