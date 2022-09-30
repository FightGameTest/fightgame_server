import IPhysicsEntity from "../../../Common/Data/IPhysicsEntity";
import IDirection from "../../../Common/Data/IDirection";
import Player from "../GameObjects/Player";
import NewPhysics from "../../../Common/Brain/NewPhysics";
import MapImporter from "../Brain/MapImporter";

class Environment {
    private _player: Player;
    private _newPhysics: NewPhysics;

    private _playerBox: Player[];
    private _mapImporter: MapImporter;

    private _playerCat: number;



    get playerBox(): Player[] {
        return this._playerBox;
    }

    constructor(player: Player, newphysics: NewPhysics, mapImporter: MapImporter) {
        this._player = player;
        this._newPhysics = newphysics;
        this._mapImporter = mapImporter;

        this._playerCat = 2;



        this._playerBox = [];


        console.log("Environment creation!");
    }

    public init() {
        let map = {"sImages":[{"uniqueId":3,"tags":[],"x":878,"y":649,"originX":217.5,"originY":76,"layerName":"Default","imageName":"block"},{"uniqueId":4,"tags":[],"x":96,"y":199,"originX":1011.5,"originY":74.5,"zIndex":1,"layerName":"Default","imageName":"platform"}]};

        this._loadMap(map);
    }

    public onNewPlayer() {
        let playerInfo: IPhysicsEntity = this._getPlayerInfo();
        let player = this._createNewPlayer(playerInfo);

        this._addPlayer(player);

        return player;
    }

    public onDisconnect(id: number) {
        let i = this._getPlayerIndex(id);

        if (i > -1) {
            this._removePlayerElement(i);
        } else {
            console.warn("Didn't find the socket to remove!");
        }
    }

    public recieveMove(player: Player, direction: IDirection) {

        player.animation = direction.animation;
        player.scaleX = direction.scaleX;
        player.scaleY = direction.scaleY;

        this._moveTowardsAngle(player, direction);

        //console.log(`Moving player with id ${player.id} to direction x: ${direction.vectorX} and y: ${direction.vectorY}`);
    }

    public removePlayer(id: number) {
        for (let c = 0; c < this._playerBox.length; c++) {
            let player = this._playerBox[c];
            if (player.id == id) {
                this._playerBox.splice(c, 1);
                return;
            }
        }
    }

    public createNew(): Environment {
        console.log("Creating new environment");
        let player = this._player.createNew();
        let NewPhysics = this._newPhysics.createNew();

        return new Environment(player, NewPhysics, this._mapImporter);
    }

    public update() {
        this._newPhysics.update(0);
    }

    private _loadMap(map: any) {
        let boxes = this._mapImporter.interpret(map.sImages);

        boxes.forEach((box: any) => {
            this._newPhysics.addObject(box);
            this._newPhysics.setStatic(box, true);
            this._newPhysics.setCategory(box, 1);
        })

    }

    private _moveTowardsAngle(player: Player, direction: IDirection) {
        if (direction.vectorY > 0) {
            this._newPhysics.setContVector(player, {x: direction.vectorX, y: direction.vectorY});
        } else {
            this._newPhysics.setVelocity(player, {x: direction.vectorX, y: direction.vectorY});
        }
    }

    private _addPlayer(player: Player) {
        console.log("Setting player group to: ", this._playerCat);

        this._playerBox.push(player);
        this._newPhysics.addObject(player,  {isStatic: false});
        this._newPhysics.setCategory(player, this._playerCat);
        this._newPhysics.setMask(player, 1);

        this._playerCat += 2;
    }

    private _removePlayerElement(index: number) {
        let player = this._playerBox[index];

        this._newPhysics.removeObject(player);

        return this._playerBox.splice(index, 1);
    }

    private _createNewPlayer(playerInfo: IPhysicsEntity) {
        let player = this._createEmptyPlayer();

        player.position.anchorX = 0.5;
        player.position.anchorY = 0.5;
        player.position.x = playerInfo.position.x;
        player.position.y = playerInfo.position.y;

        player.display.width = playerInfo.display.width;
        player.display.height = playerInfo.display.height;

        return player;
    }

    private _getPlayerInfo() {
        let xy = this._getRandomXY();
        let width = 188.15999999999997; //Temp should be replaced along with height with real values
        let height = 188.15999999999997 ;

        let tempPlayer = this._createEmptyPlayer();
        tempPlayer.position.x = xy.x;
        tempPlayer.position.y = xy.y;
        tempPlayer.display.width = width;
        tempPlayer.display.height = height;

        return tempPlayer;
    }

    private _getPlayerIndex(id: number) {
        for (let c = 0; c < this._playerBox.length; c++) {
            let elm = this._playerBox[c];

            if (elm.id == id) return c;
        }

        return -1;
    }

    private _getRandomXY(): { x: number, y: number } {
        return { x: 250, y: 3568 - 2000 }
    }

    private _createEmptyPlayer(): Player {
        return this._player.createNew();
    }

}

export default Environment;