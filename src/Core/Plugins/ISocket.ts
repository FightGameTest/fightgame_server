import WebSocket, { WebSocketServer } from 'ws';
import { Server } from 'http';
import ICommunication from '../../Common/Data/ICommunication';

interface ISocket {
    wss: WebSocketServer;

    handleSend(socket: WebSocket, data: ICommunication): void;
    setOnConnection(onNewConnection: Function, onDisconnection: Function, messageFunction: Function): void;
    createNew(): ISocket;
}

export default ISocket;