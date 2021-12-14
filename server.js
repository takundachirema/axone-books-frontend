const express = require('express');
const app = express();

app.use(express.static('prod-server'));

var port = process.env.PORT || 8080

app.listen(port, function () {
  console.log('App listening on port '+port);
});