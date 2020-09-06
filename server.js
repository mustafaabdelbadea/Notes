const express = require('express');
const app = express();
const bodyParser = require('body-parser').urlencoded({ extended: false })
const path = require('path');
const mongoose = require('mongoose');
var session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
var store = new MongoDBStore({
    uri: 'mongodb+srv://myDB2:myDB2@cluster0.23ygs.mongodb.net/myDB2',
    collection: 'mySessions'
  });
var multer = require('multer')
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'assets')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser)
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store
  }))
mongoose.set('useFindAndModify', false)
const indexRoute = require('./routes/index.routes')
app.use(indexRoute);


mongoose.connect("mongodb+srv://myDB2:myDB2@cluster0.23ygs.mongodb.net/myDB2", { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(process.env.PORT|| 3000, () => {
    console.log('server is running now......')
})