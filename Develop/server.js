const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection'); // Import your Sequelize connection

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// Sync Sequelize models to the database
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}!`);
  });
});

const expressListEndpoints = require('express-list-endpoints');

// Log all routes
console.log(expressListEndpoints(app));
