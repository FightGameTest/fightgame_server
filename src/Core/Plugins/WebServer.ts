import express from 'express';
import cors from 'cors';

import { Server, IncomingMessage } from 'http';
import { parse } from 'url';
import { WebSocketServer } from 'ws';
import Config from '../Control/Config';
import IPostman from './IPostman';

const app = express();

import IWebServer from "./IWebServer";

class WebServer implements IWebServer {
    private _express: express.Express;
    private _server: Server | null;
    private _config: Config;
    private _postman: IPostman;

    constructor(config: Config, postman: IPostman) {
        this._config = config;
        this._postman = postman;

        this._express = express();
        this._server = null;
    }

    public async listen(port: number) {
        return new Promise((resolve: Function, reject: Function) => {
            this._express.use(cors({
                origin: '*'
            }));

            this._server = this._express.listen(port, () => {
                this._addUpgrade();
                resolve();
            })
        })
    }

    public handleGet(url: string, handler: Function) {
        this._express.get(url, (request: express.Request, response: express.Response) => {
            response.send(handler(request.params, request.query));
        })
    }

    private _addUpgrade() {
        if (this._server) {
            this._server.on('upgrade', (req: IncomingMessage, socket: any, head: any) => {
                const { pathname } = parse(<any>req.url);
                let socketServer = this._getSocketForPath(<string><any>pathname);

                if (socketServer) {
                    socketServer.handleUpgrade(req, socket, head, (ws: any) => {
                        (<any>socketServer).emit('connection', ws, req);
                    })
                } else {
                    console.error(`Can not find socket for the path "${pathname}"`);
                    socket.destroy();
                }
            })
        }
    }

    //Foreign
    private _getSocketForPath(path: string): WebSocketServer | null {
        let findSocket = this._config.POSTMAN.FIND_SOCKET;

        let soc = this._postman.sendMessage(findSocket, path);

        //console.log("soc = ", soc);

        return soc;
    }
}

export default WebServer;