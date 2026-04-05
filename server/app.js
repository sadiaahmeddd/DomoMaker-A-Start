//from documentation

const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const compression = require('compression')
const favicon = require('serve-favicon')
const expressHandlebars = require('express-handlebars')
// const expressHandlebars = require('express-handlebars')
const helmet = require('helmet')

//domomaker-B
const session = require('express-session');

const router = require('./router.js')


const port = process.env.PORT || process.env.NODE_PORT || 3000;

const dbURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1/DomoMaker';

mongoose.connect(dbURI).catch((err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

const app = express();

app.use(helmet());
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//domomaker-B
app.use(session({
  key: 'sessionid',
  secret: 'Domo Arigato',
  resave: false,
  saveUninitialized: false,
}));


app.engine('handlebars', expressHandlebars.engine({ defaultLayout: '' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);

router(app);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }


  console.log(`Listening on port ${port}`);
});