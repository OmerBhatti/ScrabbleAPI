const http = require('http');
const fs= require('fs');
const port = process.env.PORT || 3000;

const accessURL = 'https://apiscrabble.herokuapp.com/';
const requestListener = function (req, res) 
{
  if (req.method == 'POST') {
    var body = '';
    req.on('data', function (data) {
        body += data;
        if (body.length > 1e6) 
        {
            req.connection.destroy();
        }
    });
    req.on('end', function () { 
      var postData;
      var wordPassed;
      var minLen;
      var maxLen;

      try {
        postData = JSON.parse(body);
        wordPassed = postData[0];
        minLen = postData[1];
        maxLen = postData[2];
      } catch (error) {
        wordPassed = body;
        minLen = 2;
        maxLen = body.length;
      }

      console.log(postData);
        if(maxLen < minLen)
        {
          res.end("Passing data format  ['letters',Minimum Length, Maximum Length]");
        }
        else
        {
          var matched = 0;
          var found = [];
          words = getFile('words.txt');
          words.map(function (word){
            if(containLetters(wordPassed,word)){
              if(word.length>=minLen &&word.length<=maxLen){
                matched++;
                found.push(word);
              }
            }
          });
          const dataToSend = {
            'count':matched,
            'words':found
          }
          res.end(JSON.stringify(dataToSend),null,3);
        }
    });
  }
  else{
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end(`Please Make POST request LIKE : \n
  JAVASCRIPT:\n
    fetch('${accessURL}',
    { 
      method: "POST",
      body: JSON.stringify(["abcd",3,5])
    })
    .then(res => res.json())
    .then(data => console.log(data));
  
  CURL:\n
    curl -X POST https://apiscrabble.herokuapp.com/ -H "Content-Type: application/json" -d "[\"abcd\",3,5]"
        
  RESPONSE:
    {
      "count": 20,
      "words": [
        "add","abba","abaca","baa","bad","baba","bacca","cab","cad","caca","dab","dad","dada","add","baa","bad","cab","cad","dab","dad"
      ]
    }


  DEVELOPER : M OMER BHATTI
  Github : "https://github.com/omerbhatti"
  WEBSITE : "https://omerbhatti.me"
    `);
  }
}

const server = http.createServer(requestListener);
server.listen(port);
console.log("Listening...");

const getFile = (fileName)=>{
    var data = fs.readFileSync(fileName,'utf8').toString().split("\n");
    return data;
}

const containLetters = (word,word2)=>{      
  for (var i = 0; i < word2.length; i++){
      if (!word.includes(word2[i])){
          return false;
      }
  }
  return true;
}
