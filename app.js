const express = require('express');
const { ValidationError, NotFoundError } = require('./lib/errors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//import routes
const routes = require('./routes');
const pets = require('./routes/pets');

//app
const app = express();

//db
mongoose.connect(`mongodb://localhost/test`,{
  useNewUrlParser:true,
  useUnifiedTopology:true
})
.then(() =>{console.log("db connected")})
.catch((err)=>{console.log("error connecting to database")})

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}))
app.use(express.json({ limit: '100kb' }));

//routes middleware
app.use('/pets',pets)


app.use('/', routes);

app.use('/', (err, req, res, next) => {
  // default to 500 internal server error unless we've defined a specific error
  let code = 500;
  if (err instanceof ValidationError) {
    code = 400;
  }
  if (err instanceof NotFoundError) {
    code = 404;
  }
  res.status(code).json({
    message: err.message,
  });
});

app.listen(27017,() =>{
  console.log("listening at 27017")
})
module.exports = app;