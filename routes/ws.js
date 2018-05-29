let  express = require('express');
const app = express();
const router = express.Router();
let  expressWS = require('express-ws');

class WSRouter {
    constructor(server) {
        this.server = server;
        return this.exec();
    }

    exec() {
        expressWS(app, this.server);
        router.ws('/', (ws, req) => {
            ws.on('message', msg => {
                console.log(msg);
                // ws.send(msg);
            })
        });
        app.use('/common', router);
    }
}

module.exports = WSRouter