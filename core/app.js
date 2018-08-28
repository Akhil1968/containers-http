/* 
 * core. It has  local & remote GET methods
 */

const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');

const PORT = process.env.PORT || 8035;
var count = 0;

const app = express();

app.use(morgan('[:date[iso]] :method :url\t:status'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));


app.get('/local', function(req, res){
  const opr = req.query.opr;
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);
  
  const localresult = {
    mode: "local",
    Operation: opr,
    num1: num1,
    num2: num2,
    result: (num1+num2)
  };
  console.log(localresult);
  res.status(200).send(localresult);
});

app.get('/remote', function(req, res){
  const request = require('request');
  const opr = req.query.opr;
  const num1 = parseInt(req.query.num1);
  const num2 = parseInt(req.query.num2);

  const options = {  
      url: 'http://' + process.env.ALBURL + ':8039/calc?opr=' + opr + '&num1=' + num1 + '&num2=' + num2,
      method: 'GET',
      headers: {
          'Accept': 'application/json',
          'Accept-Charset': 'utf-8'
      }
  };

  request(options, function(err, response, body) {  
    
      var callresult = {
        mode: "remote",
        Operation: opr,
        num1: num1,
        num2: num2,
        result: JSON.parse(body).result
      };
      console.log(callresult);
      res.status(200).send(callresult);
  });

  
  
});



app.listen(PORT);
console.log('Running on http://localhost:' + PORT);
