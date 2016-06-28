const http = require('http');
const https = require('https');
const fs = require('fs');

function parseData(data, res) {
  var memberData = '';
  data.on('data', (chunk) => {
    memberData += chunk;
  });
  data.on('end', () => {
    var jsonFile = JSON.parse(memberData.substring(11, memberData.length - 80));
    fs.writeFile('C:\\Users\\jonco\\projects\\Tzibur\\site\\test\\members.json', JSON.stringify(jsonFile), (err) => {
      if (err) {
        console.log(err);
      }
    });
  });
  res.end();
}

function getMembers(res) {
  const options = 'https://www.oknesset.org/api/v2/member/?is_current=true';
  const filename = 'members.json';
  https.get(options, (req) => {
    parseData(req, res);
  }).end();
}

http.createServer((req, res) => {
  getMembers(res);
}).listen(8080);
