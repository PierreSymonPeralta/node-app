const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;
const handlers = require('./handlers');
const router = require('./router');


module.exports = (req, res) => {
    
    // Get parsed URL
    const parsedUrl = url.parse(req.url, true); 

    // Get path
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, ''); 
     
    // Get method
    const method = req.method.toLocaleLowerCase(); 
    
    // Get query object
    const queryObject = parsedUrl.query; 
    
    // Get header
    const headers = req.headers; 

    // Get payload
    const decoder = new StringDecoder('utf-8'); 
    let buffer = '';
    req.on('data', data => buffer += decoder.write(data));
    req.on('end', _ => {
        buffer += decoder.end();

        // Choose the handler 
        const choosenHandler = typeof(router[trimmedPath]) !== 'undefined' ? 
            router[trimmedPath] : 
            handlers.notFound;

        // Build the data
        const data = {
            trimmedPath: trimmedPath,
            query: queryObject,
            method: method,
            header: headers,
            payload: buffer
        }

        // Route the request to the handler
        choosenHandler(data, (statusCode, payload) => {
            // Create default status code and payload
            statusCode = typeof(statusCode) === 'number' ? statusCode: 200;
            payload = typeof(payload) === 'object' ? payload : {};

            // Convert the payload to string
            const payloadString = JSON.stringify(payload);

            // Return the response
            res.setHeader('Content-Type','application/json');
            res.writeHead(statusCode);
            res.end(payloadString);

            console.log('Returning this reponse:', statusCode);
        });
    }); 
};