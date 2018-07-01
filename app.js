// Dependencies
const http = require('http');
const https = require('https');
const fs = require('fs');

const unifiedServer = require('./unifiedServer');
const config = require('./config');

const _data = require('./lib/data');

_data.read('test', 'newFile', (err, data)=>{
    console.log('Error', err);
    console.log('Data', data);
})

// Intantiating the http server
const httpServer = http.createServer(unifiedServer);

// Start http server 
httpServer.listen(config.httpPort, ()=>{
    console.log('Http server listening to', config.httpPort);
});


// Intantiating the http server
const httpsServerOptions = {
    key: fs.readFileSync('./https/key.pem'),
    cert: fs.readFileSync('./https/cert.pem')
};
const httpsServer = https.createServer(httpsServerOptions, unifiedServer);

// Start http server 
httpsServer.listen(config.httpsPort, ()=>{
    console.log('Https server listening to', config.httpsPort);
});

