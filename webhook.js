
"use strict";
const http = require('http');
const crypto = require('crypto');
const args = require('minimist')(process.argv.slice(2)); // Get arguments by name rather than by index

// Configuration
const PORT = args["port"] || process.env.port || "4567"; // default port is for local testing only and has to match what was used with ngrok
const SECRET = args["secret"] || process.env.secret || "c984a37c4083a5add4ca905e34542643eace096a"; // default secret is for local testing only

http.createServer(async (req, res) => {
    const buffers = [];
    for await (const chunk of req) {
        buffers.push(chunk);
    }
    const data = Buffer.concat(buffers);
    // GitHub will use the secret to sign (checksum) the data
    const signature = `sha1=${crypto
        .createHmac('sha1', SECRET)
        .update(data)
        .digest('hex')}`;
    const isAllowed = req.headers['x-hub-signature'] === signature;
    if (isAllowed) {
        const event = JSON.parse(data.toString());
        // Here we would process the event, but for sake of this demo, just log it's properties
        console.log(event);
    }
    res.end();
}).listen(PORT, () => console.log(`Node.js server started on port ${PORT}.`));