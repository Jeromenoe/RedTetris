import path from 'path';
import express from 'express';
import { addEventsHandlers } from './socket_manager/socketManager.js'
import { Server } from 'socket.io';

const app = express();
const __dirname = path.resolve();
export var io = null;

const reactFolder = process.env.NODE_ENV === "production" ? "public" : "../client/public"

app.use(express.static(path.join(__dirname, reactFolder)));

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, reactFolder, 'index.html'));
});

export const httpServer = app.listen(process.env.PORT || 3001, () => {
   console.log('Http server listening on port 3001')
});

const initSocketIO = () => {
   io = new Server(httpServer, {
       cors: {
          orgin: '*',
       }
    });
   addEventsHandlers(io);
}

initSocketIO();