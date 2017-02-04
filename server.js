var express = require('express')
var app = express();

var mongoose = require('mongoose')
var morgan = require('morgan')

var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
var bodyParser = require('body-parser');





app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.use(express.static(__dirname + '/public/'));

mongoose.connect('mongodb://admin:meninblack2@jello.modulusmongo.net:27017/newE9dod');


//creating schema
//     var todoSchema = new Schema(
//       {
//         text : {type : String}
//       }
//     );
//
// //creating a model with Schema
// var Todo = mongoose.model('Todo', todoSchema);



var Todo = mongoose.model('Todo', {
  text : String,
  married : Boolean
});

// app.get('/api/todo',getTodos);

app.get('/print/:name',function(req, res){
  res.send("sandeep is "+req.params.name);
})



app.post('/api/todo', function(req, res){
// todo. create requires two arguments
console.log("hey i am runnig the api/ost")
console.log(req.body)
Todo.create({
  text : req.body.text,
  married : false,

}, function(err, todo){
  if(err)
    res.send(err)

  Todo.find(function(err, todos) {
                      if (err)
                          res.send(err)
                      res.json(todos);
                  });
});
})

app.get('/api/todo', function(req, res){

  console.log("Trying to get the data from the server");

  Todo.find(function(err, todos){
    if(err)
      res.send(err)
    res.json(todos)
  })
})

app.delete('/api/todo/:todo_id', function(req, res){
  console.log("SERVER: trying to del")
  Todo.remove({
    _id : req.params.todo_id
  }, function(err, todo){
    if (err)
      res.send(err)
    Todo.find(function(err, todos){
      if (err)
        res.send(err)
      res.json(todos)
    })
  })
});

app.get('*', function(req, res) {
                  res.sendFile(__dirname +'public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
              });


// app.use(function (req, res, next) {
//   console.log('Time:', Date.now())
//   next()
// })






var port;
port = 2000
app.listen(port);
console.log("the app is running at port : "+ port)
