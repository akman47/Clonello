const path = require('path');
const express = require('express');
const routes = require('./controllers/');
const sequelize = require('./config/connection.js');
const helpers = require('./utils/helpers');
const seeder = require('./seeds/status-seeds');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({ helpers, seeder });
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'I will never tell!',
  rolling: true,
  cookie: {
    expires: 5*60*1000
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(routes);

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});