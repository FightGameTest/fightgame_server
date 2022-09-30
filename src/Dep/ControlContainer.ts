import SmartDepend from '../Dep/SmartDepend';

import ChatBackup from '../Core/Control/ChatBackup';
import Config from '../Core/Control/Config';
import Kernel from '../Core/Control/Kernel';
import Environment from '../Core/Game/Brain/Environment';
import Loop from '../Core/Game/Brain/Loop';
import MapImporter from '../Core/Game/Brain/MapImporter';
import Box from '../Core/Game/GameObjects/Box';
import Player from '../Core/Game/GameObjects/Player';
import MatchMaker from '../Core/Network/MatchMaker';
import NetworkGate from '../Core/Network/NetworkGate';
import Mongo from '../Core/Plugins/Mongo';
import ModelFactory from '../Core/Plugins/Mongoose/ModelFactory';
import Postman from '../Core/Plugins/Postman';
import Socket from '../Core/Plugins/Socket';
import WebServer from '../Core/Plugins/WebServer';
import GameArena from '../Core/Rooms/GameArena';
import RoomCore from '../Core/Rooms/RoomCore';
import RoomManager from '../Core/Rooms/RoomManager';
import NewPhysics from '../Common/Brain/NewPhysics';
import AnimationDir from '../Common/Data/AnimationDir';
import CommonConfig from '../Common/Data/CommonConfig';
import FunObj from '../Common/Data/FunObj';
import SocketTypes from '../Common/Data/SocketTypes';




class ControlContainer {
  private _smartDepend: SmartDepend;

  protected _ChatBackup: any;
protected _Config: any;
protected _Kernel: any;
protected _Environment: any;
protected _Loop: any;
protected _MapImporter: any;
protected _Box: any;
protected _Player: any;
protected _MatchMaker: any;
protected _NetworkGate: any;
protected _Mongo: any;
protected _ModelFactory: any;
protected _Postman: any;
protected _Socket: any;
protected _WebServer: any;
protected _GameArena: any;
protected _RoomCore: any;
protected _RoomManager: any;
protected _NewPhysics: any;
protected _AnimationDir: any;
protected _CommonConfig: any;
protected _FunObj: any;
protected _SocketTypes: any;


  constructor() {
    this._smartDepend = new SmartDepend();

    this._addModules();
    this._addDepends();
  }

  public getMain(): Kernel {
    let spEntity = <Kernel>this._smartDepend.resolve(this._Kernel);

    return spEntity;
  }

  private _addModules() {
    this._ChatBackup = this._smartDepend.addModule(ChatBackup, false);
this._Config = this._smartDepend.addModule(Config, false);
this._Kernel = this._smartDepend.addModule(Kernel, false);
this._Environment = this._smartDepend.addModule(Environment, false);
this._Loop = this._smartDepend.addModule(Loop, false);
this._MapImporter = this._smartDepend.addModule(MapImporter, false);
this._Box = this._smartDepend.addModule(Box, false);
this._Player = this._smartDepend.addModule(Player, false);
this._MatchMaker = this._smartDepend.addModule(MatchMaker, false);
this._NetworkGate = this._smartDepend.addModule(NetworkGate, false);
this._Mongo = this._smartDepend.addModule(Mongo, false);
this._ModelFactory = this._smartDepend.addModule(ModelFactory, false);
this._Postman = this._smartDepend.addModule(Postman, true);
this._Socket = this._smartDepend.addModule(Socket, false);
this._WebServer = this._smartDepend.addModule(WebServer, false);
this._GameArena = this._smartDepend.addModule(GameArena, false);
this._RoomCore = this._smartDepend.addModule(RoomCore, false);
this._RoomManager = this._smartDepend.addModule(RoomManager, false);
this._NewPhysics = this._smartDepend.addModule(NewPhysics, false);
this._AnimationDir = this._smartDepend.addModule(AnimationDir, false);
this._CommonConfig = this._smartDepend.addModule(CommonConfig, false);
this._FunObj = this._smartDepend.addModule(FunObj, false);
this._SocketTypes = this._smartDepend.addModule(SocketTypes, false);

  }

  private _addDepends() {
    this._smartDepend.addDependency(this._ChatBackup, this._Mongo);


this._smartDepend.addDependency(this._Kernel, this._MatchMaker);
this._smartDepend.addDependency(this._Kernel, this._NetworkGate);
this._smartDepend.addDependency(this._Kernel, this._RoomManager);


this._smartDepend.addDependency(this._Environment, this._Player);
this._smartDepend.addDependency(this._Environment, this._NewPhysics);
this._smartDepend.addDependency(this._Environment, this._MapImporter);


this._smartDepend.addDependency(this._Loop, this._FunObj);


this._smartDepend.addDependency(this._MapImporter, this._Box);


this._smartDepend.addDependency(this._MatchMaker, this._Postman);
this._smartDepend.addDependency(this._MatchMaker, this._Config);
this._smartDepend.addDependency(this._MatchMaker, this._GameArena);


this._smartDepend.addDependency(this._NetworkGate, this._WebServer);
this._smartDepend.addDependency(this._NetworkGate, this._Postman);
this._smartDepend.addDependency(this._NetworkGate, this._Config);


this._smartDepend.addDependency(this._Mongo, this._ModelFactory);


this._smartDepend.addDependency(this._WebServer, this._Config);
this._smartDepend.addDependency(this._WebServer, this._Postman);


this._smartDepend.addDependency(this._GameArena, this._Socket);
this._smartDepend.addDependency(this._GameArena, this._Loop);
this._smartDepend.addDependency(this._GameArena, this._Environment);
this._smartDepend.addDependency(this._GameArena, this._ChatBackup);
this._smartDepend.addDependency(this._GameArena, this._SocketTypes);


this._smartDepend.addDependency(this._RoomCore, this._Socket);


this._smartDepend.addDependency(this._RoomManager, this._Postman);
this._smartDepend.addDependency(this._RoomManager, this._Config);



  }

}

export default ControlContainer;