const http = require('http');
const https = require('https');
const fs = require('fs');
const streamWriter = fs.createWriteStream('billFull.json', {encoding: 'utf8'});
let count = 0;
let billResponse = '';
const FETCHTYPES = {
  REPS: { name: 'reps', index: 0, query: 'https://www.oknesset.org/api/v2/member/?is_current=true',
          filename: 'reps.json' },
  PARTY: { name: 'party', index: 1, query: 'https://www.oknesset.org/api/v2/party/?format=json',
          filename: 'parties.json' },
  VOTE: { name: 'vote', index: 2, query: 'https://www.oknesset.org/api/v2/vote/?format=json',
          filename: 'votes.json' },
  BILL: { name: 'bill', index: 2, query: 'https://www.oknesset.org/api/v2/bill/?limit=100',
          filename: 'bills.json' },
};

function getURIs(jsonFile) {
  // streamWriter.write('[');
  for (const element of jsonFile) {
    const currBill = element;
    ((crBill) => {
      https.get('https://www.oknesset.org' + crBill.resource_uri + '?=format=json', (res) => {
        responseHandler(res);
      });
    })(currBill);
  }
}

function responseHandler(res) {
  res.on('data', (chunk) => {
    billResponse += chunk;
  });
  res.on('end', () => {
    count++;
    console.log('wrote another bill ' + count + '\n');
    if (count === 100) {
      fs.writeFile('bill2.json', billResponse);
      streamWriter.end();
      console.log('entered exit conditional');
    }
  });
}

function parseData(data, res, filename, callback) {
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
      callback(jsonFile);
    });
    res.end(responseString);
  });
}

function getOkData(res, fetchType, filename, callback) {
  https.get(fetchType, (req) => {
    parseData(req, res, filename, callback);
  });
}

http.createServer((req, res) => {
//  for (var fetchName in FETCHTYPES) {
//    const fetchtype = FETCHTYPES[fetchName];
//    ((ftch) => {
//      getOkData(res, ftch.query, ftch.filename);
//    })(fetchtype);
//  }
  getOkData(res, FETCHTYPES.BILL.query, FETCHTYPES.BILL.filename, getURIs);
}).listen(8080);

streamWriter.on('end', () => {
  console.log('file written');
});
