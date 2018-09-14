import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import logger from 'morgan';
import mongoose from 'mongoose';
import bb from 'express-busboy';
import SourceMapSupport from 'source-map-support';
import session from 'express-session'
var fs = require('fs')

var MongoStore = require('connect-mongo')(session);

// import routes
// import {router as todoRoutes} from './routes/todo.server.route';
import router  from './routes/api'

const app = express();


// express-busboy to parse multipart/form-data
bb.extend(app);

//connect to MongoDB
mongoose.connect('mongodb://localhost:27017/userbase');
var userdb = mongoose.connection;

//mongoose.createConnection('mongodb://localhost:27017/todobase');
//var tododb = mongoose.connection;
//mongoose.createConnection('mongodb://localhost:27017/nodebase');
//var nodedb = mongoose.connection;

//handle mongo error
// userdb.on('error', console.error.bind(console, 'connection error:'));
// userdb.once('open', function () {
//   // we're connected!
//   console.log("Userbase is connected")
// });
//
// tododb.on('error', console.error.bind(console, 'connection error:'));
// tododb.once('open', function () {
//   // we're connected!
//   console.log("Todobase is connected")
// });
//
// nodedb.on('error', console.error.bind(console, 'connection error:'));
// nodedb.once('open', function () {
//   // we're connected!
//   console.log("Nodebase is connected")
// });


//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: userdb
  })
}));

// allow-cors
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE")
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept,x-access-token, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, *");
  next();
})

// configure app
app.use(logger('dev'));


// app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/*+json' }));
app.use(bodyParser.urlencoded({extended:false}));
// app.use(bodyParser.urlencoded({ extended:true }));
// app.use(bodyParser.json({ type: 'application/json' }));
// app.use(bodyParser.json({ type: 'application/*+json' }));
// app.use(bodyParser.json({ type: 'application/json' }));
// app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

// set the port
const port = process.env.PORT || 4001;

// // connect to userdase
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/userbase', {
//   useMongoClient: true,
// });
//
// // connect to database
// mongoose.createConnection('mongodb://localhost:27017/todobase', {
//   useMongoClient: true,
// });


// add Source Map Support
SourceMapSupport.install();

// app.use('/api', todoRoutes);
app.use('/api', router);

app.get('/', (req,res) => {
  return res.end('Api working');
})



// catch 404
app.use((req, res, next) => {
  res.status(404).send('<h2 align=center>Page Not Found!</h2>');
});

// start the server
app.listen(port,() => {
  console.log(`App Server Listening at ${port}`);
});
