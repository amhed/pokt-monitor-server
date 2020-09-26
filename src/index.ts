const https = require('https')
const fs = require('fs')

import app from './server'
import { Logger } from './helpers/Logger'

var options = {
  key: fs.readFileSync( './server.key' ),
  cert: fs.readFileSync( './server.cert' ),
  requestCert: false,
  rejectUnauthorized: false
};

const port = process.env.PORT || 3000;
const server = https.createServer( options, app );

server.listen(port, () => {
  console.log( 'Express server listening on port ' + server.address().port );
} );