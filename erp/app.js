/* 
 * core. It has  local & remote GET methods
 */

const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser');

const PORT = process.env.PORT || 8039;
var count = 0;

var app = express();

app.use(morgan('[:date[iso]] :method :url\t:status'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));


app.get('/calc', function(req, res){
  var opr = req.query.opr;
  var num1 = parseInt(req.query.num1);
  var num2 = parseInt(req.query.num2);

  res.status(200).send({
    Operation: opr,
    num1: num1,
    num2: num2,
    result: (num1+num2)
  });
});



app.listen(PORT);
console.log('HTTP server is ON at:' + PORT);
