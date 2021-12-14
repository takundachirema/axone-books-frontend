const express = require('express');
const path = require('path');
const app = express();
const history = require('connect-history-api-fallback');
var port = process.env.PORT || 8080 


const staticFileMiddleware = express.static(path.join(__dirname + '/prod-server'));

app.use(staticFileMiddleware);
app.use(history({
  disableDotRule: true,
  verbose: true
}));
app.use(staticFileMiddleware);

app.get('/', function (req, res) {
  res.render(path.join(__dirname + '/prod-server/index.html'));
});

app.listen(port, function () {
  console.log('App listening on port '+port);
});