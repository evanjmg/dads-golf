
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const staticPath = path.resolve(__dirname, './');

app.use(express.static(staticPath));
app.get('*', function (req, res) {
  res.header({ 'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': 0 });
  res.sendFile(path.join(staticPath, 'index.html'));
});

const server = app.listen(port, function () {
  console.log('😎 server listening on port ' + port);
});
