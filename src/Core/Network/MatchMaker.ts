import IRoom from "../Rooms/IRoom";
import GameArena from "../Rooms/GameArena";

import RoomManager from "../Rooms/RoomManager";
import IPostman from "../Plugins/IPostman";
import Config from "../Control/Config";

class MatchMaker {
    private _postman: IPostman;
    private _gameArena: GameArena;
    private _config: Config;

    constructor(postman: IPostman, config: Config, gameArena: GameArena) {
        this._postman = postman;
        this._config = config;
        this._gameArena = gameArena;
    }

    public init() {
        this._addListen();
    }

    private _addListen() {
        this._postman.addAddress(this._config.POSTMAN.FIND_ROOM, this._getRoomUrl.bind(this));
    }

    private _getRoomUrl(): string {
        let room = this._findRooms();
        return room.url;
    }

    private _findRooms(): IRoom {
        let emptyRooms = this._getEmptyRooms();

        if (emptyRooms.length > 0) {
            return this._selectRoom(emptyRooms);
        } else {
            let newRoom = this._createNewRoom();
            this._addRoom(newRoom);

            return newRoom;
        }
    }

    private _selectRoom(rooms: IRoom[]): IRoom {
        let maxI = rooms.length - 1;

        return this._getRandomRoom(rooms);
    }

    private _getRandomRoom(rooms: IRoom[]): IRoom {
        let maxI = rooms.length - 1;
        let i = this._randomIntFromInterval(0, maxI);

        return rooms[i];
    }


    private _randomIntFromInterval(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    //Foreign
    private _getEmptyRooms(): IRoom[] {
        let getEmptyRooms = this._config.POSTMAN.GET_EMPTY_ROOMS;

        return this._postman.sendMessage(getEmptyRooms, null);
    }

    private _createNewRoom(): IRoom {
        let ga = this._gameArena.createNew();

        return ga;
    }

    private _addRoom(room: IRoom) {
        let addRoom = this._config.POSTMAN.ADD_ROOM;
        this._postman.sendMessage(addRoom, room);
    }
}

export default MatchMaker;