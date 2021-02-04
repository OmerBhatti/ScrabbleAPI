### Scrabble Words Generator

<pre>
JAVASCRIPT (Fetch):

    fetch('${accessURL}',
    { 
        method: "POST",
        body: JSON.stringify(["abcd",3,5])
    })
    .then(res => res.json())
    .then(data => console.log(data));

RESPONSE:

    {
        "count": 20,
        "words": [
          "add","abba","abaca","baa","bad","baba","bacca","cab","cad","caca"
          ,"dab","dad","dada","add","baa","bad","cab","cad","dab","dad"
        ]
    }
  </pre>
