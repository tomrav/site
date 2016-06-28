const http = require('http');
const https = require('https');
const fs = require('fs');

function parseData(data, res) {
  var memberData = '';
  data.on('data', (chunk) => {
    console.log('writing chunk');
    memberData += chunk;
  });
  data.on('end', () => {
    console.log('got the data!');
    fs.writeFile('C:\\Users\\jonco\\projects\\Tzibur\\site\\test\\members.json', JSON.stringify(memberData.substring(11, memberData.length - 80)), (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
  res.end();
}

function getMembers(res) {
  const options = 'https://www.oknesset.org/api/v2/member/?is_current=true';
  https.get(options, (req) => {
    console.log('response received!');
    console.log(req.headers);
    parseData(req, res);
  }).end();
}

http.createServer((req, res) => {
  console.log('server is up');
  console.log('getting Members!');
  getMembers(res);
}).listen(8080);
