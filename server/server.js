const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./dbConnection');

const app = express();
const server = require('http').Server(app);

app.options('*', cors());
app.use(cors());
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

db.connectToServer( function( err, client ) {
  console.log('==== Database Connected Successfully ====');
});

require('./router')(app);
require('./socketConnect').initSocket(server);
server.listen(3212, () => {
    console.log('[+] Listening @ 3212');
});
