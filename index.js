const express = require('express');
const routes = require('./routes');
const paypalIntegration = require('./paypalIntegration'); // Adjust the path if needed
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
