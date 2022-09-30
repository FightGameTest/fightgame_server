import IRoom from "./IRoom";
import ISocket from "../Plugins/ISocket";
import RoomCore from "./RoomCore";
import Loop from "../Game/Brain/Loop";
import Environment from "../Game/Brain/Environment";
import IPlayerConnection from "./IPlayerConnection";
import Player from "../Game/GameObjects/Player";
import IDirection from "../../Common/Data/IDirection";
import ICommunication from "../../Common/Data/ICommunication";
import ChatBackup from "../Control/ChatBackup";
import SocketTypes from "../../Common/Data/SocketTypes";

class GameArena extends RoomCore implements IRoom {
    private _socket: ISocket;
    private _loop: Loop;
    private _environment: Environment;
    private _chatBackup: ChatBackup;
    private _socketTypes: SocketTypes;

    get socket(): ISocket {
        return this._socket;
    }

    constructor(socket: ISocket, loop: Loop, environment: Environment, chatBackup: ChatBackup,
        socketTypes: SocketTypes) {
        super(socket.createNew());

        this._socket = socket;
        this._loop = loop;
        this._environment = environment;
        this._chatBackup = chatBackup;
        this._socketTypes = socketTypes;

        this._initCore(this.onConnection.bind(this), this.onDisconnection.bind(this), this.onMessage.bind(this));

        console.log("GameArena created!");
    }

    get totalPlayers(): number {
        return this._getTotalPlayers();
    }

    get url(): string {
        return "/game_arena";
    }

    public create() {
        console.log("On Arena Create!");
        this._loop.addFunction(this._update, this);
        this._loop.start();

        let sendLoop = this._loop.createNew();
        sendLoop.addFunction(this._updateNewPosition, this);
        sendLoop.start(40);

        this._environment.init();
    }

    public async onConnection(socket: any) {
        console.log("<on Connection> Arena - ");
    }

    public async onDisconnection(socket: any) {
        console.log("Disconnecting Socket...");
        let playerId = this._removePlayer(socket);

        if (playerId > -1) {
            this._environment.removePlayer(playerId)
        }

        this._sendAll({
            type: this._socketTypes.REMOVE_PLAYER,
            data: {
                id: playerId
            }
        })
    }

    public async onMessage(socket: any, message: ICommunication) {
        if (message.type == this._socketTypes.ADD_CONNECTION) {
            this._addConnection(socket);
        } else if (message.type == this._socketTypes.MOVE_PLAYER) {
            this._movePlayer(socket, message.data);
        } else if (message.type == this._socketTypes.CHAT_MESSAGE) {
            this._addChatMessage(message);
        } else if (message.type == this._socketTypes.TEST_PING) {
            this._testPing(socket, message);
        }
    }

    private _testPing(socket: any, message: ICommunication) {
        this._socket.handleSend(socket, {
            type: this._socketTypes.TEST_PING,
            data: {
                time: message.data.time
            }
        })
    }

    private _addChatMessage(message: ICommunication) {
        this._chatBackup.addMessage(message.data)

        this._sendAll(message);
    }

    private _addConnection(socket: any) {
        let player = this._addPlayerToEnvironment();

        this._addPlayer({ socket: socket, data: player });

        //console.log("Added Player", this._players);
    }

    private _movePlayer(socket: any, data: any) {
        let player = <Player>this._getPlayer(socket);
        let direction = data.direction;

        this._sendMove(player, direction);
    }

    private _update(time: number) {
        this._environment.update();
    }

    public createNew(): GameArena {
        let soc = this._socket.createNew();
        let lop = this._loop.createNew();
        let env = this._environment.createNew();
        let cbk = this._chatBackup.createNew();
        let sty = this._socketTypes.createNew();

        return new GameArena(soc, lop, env, cbk, sty);
    }

    private _updateNewPosition() {
        let playerList = this._getPlayerList();

        for (let c = 0; c < this._players.length; c++) {
            let playerCommunication = this._players[c];

            this._socket.handleSend(playerCommunication.socket, {
                type: this._socketTypes.WORLD_UPDATE,
                data: {
                    players: playerList,
                    id: playerCommunication.data.id
                }
            })
        }
    }

    private _getPlayerList() {
        return this._environment.playerBox;
    }

    private _addPlayerToEnvironment() {
        return this._environment.onNewPlayer();
    }

    private _sendMove(player: Player, direction: IDirection) {
        this._environment.recieveMove(player, direction);
    }
}

export default GameArena;