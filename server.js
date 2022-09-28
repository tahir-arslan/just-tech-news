const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// turn on routes
app.use(routes);

// turn on connection to db and server. `sync` means Sequelize takes models and connects
// them to associated db tables. if `{ force: true }` that would tell Sequelize to drop and re-create
// all of the database tables on startup, which will be helpful if database needs to be updated
// due to changes.  
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});