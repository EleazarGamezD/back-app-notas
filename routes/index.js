// ./routes/index.js

const express = require('express');
const router = express.Router();

app.get ('*', (req, res) => {
  res.status (404).send ('Esta página no existe :(');
});


module.exports = router;
