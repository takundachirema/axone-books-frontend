const express = require('express');
const app = express();

app.use(express.static('prod-server'));


app.listen(3000, function () {
  console.log('App listening on port 3000');
});