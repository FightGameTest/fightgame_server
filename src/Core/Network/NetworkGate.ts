import IWebServer from "../Plugins/IWebServer";
import IPostman from "../Plugins/IPostman";
import Config from "../Control/Config";

class NetworkGate {
    private _webServer: IWebServer;
    private _postman: IPostman;
    private _config: Config;

    private _url: string;

    constructor(webServer: IWebServer, postman: IPostman, config: Config) {
        this._webServer = webServer;
        this._postman = postman;
        this._config = config;

        this._url = '/join_game';
    }

    public async startServer(port: number) {
        await this._startListening(port);
        this._setupRest();
    }

    private _setupRest() {
        this._handleGet(this._url, this._getMessage.bind(this));
    }


    //Foreign
    private _handleGet(url: string, handler: Function) {
        this._webServer.handleGet(url, handler);
    }

    private async _startListening(port: number) {
        return this._webServer.listen(port);
    }

    private _getMessage() {
        return this._postman.sendMessage(this._config.POSTMAN.FIND_ROOM, null);
    }
}

export default NetworkGate;