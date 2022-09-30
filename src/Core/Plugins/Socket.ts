import WebSocket, { WebSocketServer } from 'ws';
import { Server } from 'http';
import ISocket from "./ISocket";
import ICommunication from '../../Common/Data/ICommunication';

class Socket implements ISocket {
    private _wss: WebSocketServer;
    private _connections: WebSocket[];

    constructor() {
        this._wss = new WebSocketServer({ noServer: true });

        this._connections = [];
    }

    get wss(): WebSocketServer {
        return this._wss;
    }

    public handleSend(socket: WebSocket, data: ICommunication) {

        //console.log(JSON.stringify(data));

        socket.send(JSON.stringify(data), { binary: false });
    }

    public setOnConnection(onNewConnection: Function, onDisconnection: Function, messageFunction: Function) {
        console.log("Setting connections!");

        this._wss.on('connection', (ws: WebSocket) => {
            this._connections.push(ws);

            onNewConnection(ws);

            ws.on('message', (data: any) => {
                messageFunction(ws, JSON.parse(data));
            });

            ws.on('close', () => {
                onDisconnection(ws);
            })
        });
    }

    public createNew(): ISocket {
        return new Socket();
    }
}

export default Socket;