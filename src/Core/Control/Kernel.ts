import MatchMaker from "../Network/MatchMaker";
import NetworkGate from "../Network/NetworkGate";
import RoomManager from "../Rooms/RoomManager";

class Kernel {
    private _matchMaker: MatchMaker;
    private _networkGate: NetworkGate;
    private _roomManager: RoomManager;

    private _serverPort: number;

    constructor(matchMaker: MatchMaker, networkGate: NetworkGate, roomManager: RoomManager) {
        this._matchMaker = matchMaker;
        this._networkGate = networkGate;
        this._roomManager = roomManager;

        let port = process.env.PORT || 5000;

        this._serverPort = parseInt(<string>port);
    }

    public start() {
        console.log("Welcome to Fightgame Server 0.0.1");
        this._matchMaker.init();
        this._initializeServers();
        this._roomManager.init();
    }

    private _initializeServers() {
        this._startMatchMaker();
    }

    //Foreign
    private _startMatchMaker() {
        this._networkGate.startServer(this._serverPort).then(() => {
            console.log(`Started Server at port ${this._serverPort}!`);
        });
    }
}

export default Kernel;