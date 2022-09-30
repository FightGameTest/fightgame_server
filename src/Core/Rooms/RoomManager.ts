import Config from "../Control/Config";
import IPostman from "../Plugins/IPostman";
import IRoom from "./IRoom";

class RoomManager {
    private _postman: IPostman;
    private _config: Config;

    private _rooms: IRoom[];
    private _maxPlayers: number;

    constructor(postman: IPostman, config: Config) {
        this._postman = postman;
        this._config = config;

        this._rooms = [];
        this._maxPlayers = 4;
    }

    public init() {
        this._setupPostman();
    }

    private _getEmptyRooms(): IRoom[] {
        let rooms: IRoom[] = [];

        for (let c = 0; c < this._rooms.length; c++) {
            let room = this._rooms[c];

            console.log(`room.totalPlayers: ${room.totalPlayers} < this._maxPlayers: ${this._maxPlayers}`);

            if (room.totalPlayers < this._maxPlayers) rooms.push(room);
        }

        return rooms;
    }

    public _addRoom(room: IRoom) {
        room.create();
        this._rooms.push(room);
    }

    private _findSocket(path: string) {
        for (let c = 0; c < this._rooms.length; c++) {
            let room = this._rooms[c];
            //console.log(`room.url = '${room.url} == '${path}'`);
            if (room.url == path) return room.socket.wss;
        }

        return null;
    }

    //Foreign objects
    private _getTotalPlayers(room: IRoom): number {
        return room.totalPlayers;
    }

    private _setupPostman() {
        let findSocket = this._config.POSTMAN.FIND_SOCKET;
        let getEmptyRooms = this._config.POSTMAN.GET_EMPTY_ROOMS;
        let addRoom = this._config.POSTMAN.ADD_ROOM;

        this._postman.addAddress(findSocket, this._findSocket.bind(this));
        this._postman.addAddress(getEmptyRooms, this._getEmptyRooms.bind(this));
        this._postman.addAddress(addRoom, this._addRoom.bind(this));
    }
}

export default RoomManager;