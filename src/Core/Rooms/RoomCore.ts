import IPlayerConnection from "./IPlayerConnection";
import ISocket from "../Plugins/ISocket";
import ICommunication from "../../Common/Data/ICommunication";

class RoomCore {
    protected _players: IPlayerConnection[];
    protected _onConnection: Function;

    private _socketBackend: ISocket;

    get totalPlayers(): number {
        return this._players.length;
    }

    constructor(socket: ISocket) {
        this._socketBackend = socket;

        this._players = [];
        this._onConnection = () => { };
    }

    protected _getTotalPlayers() {
        return this._players.length;
    }

    protected _sendAll(data: ICommunication) {
        for (let c = 0; c < this._players.length; c++) {
            let playerConnection = this._players[c];

            this._socketBackend.handleSend(playerConnection.socket, data);
        }
    }

    protected _initCore(onConnection: Function, onDisconnection: Function, onMessage: Function) {
        console.log("init Core");

        let socket = ((<any>this).socket);

        socket.setOnConnection(onConnection, onDisconnection, onMessage);
    }

    protected _addPlayer(player: IPlayerConnection) {
        this._players.push(player);
    }

    protected _removePlayer(socket: any) {
        for (let c = 0; c < this._players.length; c++) {
            let player = this._players[c];
            if (player.socket == socket) {
                this._players.splice(c, 1);
                //console.log(`Removed the socket at index ${c}`);
                return player.data.id;
            }
        }

        console.warn("Could not find socket!");

        return -1;
    }

    protected _updateAll(message: string, data: any) {
        for (let c = 0; c < this._players.length; c++) {
            let player = this._players[c];
            player.socket.emit(message, data);
        }
    }

    protected _getPlayer(socket: any) {
        for (let c = 0; c < this._players.length; c++) {
            let player = this._players[c];

            if (socket == player.socket) {
                return player.data;
            }
        }

        return null;
    }

}

export default RoomCore;