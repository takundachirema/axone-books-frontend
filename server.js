const express = require('express');
const path = require('path');
const app = express();
const history = require('connect-history-api-fallback');
var port = process.env.PORT || 8080 

const staticFileMiddleware = express.static(path.join(__dirname + '/prod-server'));

/** Only for google verification **/
app.use(express.static(path.join(__dirname, '/')));

app.get('/googleb09f743d2a62a4db.html', function (req, res) {
  res.render(path.join(__dirname + '/googleb09f743d2a62a4db.html'));
});
/** Finished google verification **/

app.use(staticFileMiddleware);

app.use(history({
  disableDotRule: true,
  verbose: true
}));

app.use(staticFileMiddleware);

app.listen(port, function () {
  console.log('App listening on port '+port);
});