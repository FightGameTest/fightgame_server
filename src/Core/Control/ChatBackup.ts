import IChatData from "../../Common/Data/IChatData";
import IMongo from "../Plugins/IMongo";

class ChatBackup {
    private _mongo: IMongo;

    private _messages: IChatData[];
    private _maxMessages: number;

    constructor(mongo: IMongo) {
        this._mongo = mongo;

        this._messages = [];
        this._maxMessages = 100;
    }

    public addMessage(data: IChatData) {
        let cleanedMessage = this._sanitize(data.message);
        data.message = cleanedMessage;

        this._insertMessage(data);
    }

    public getMessages(): IChatData[] {
        return this._messages;
    }

    public createNew(): ChatBackup {
        return new ChatBackup(this._mongo.createNew());
    }

    private _insertMessage(data: IChatData) {
        if (this._messages.length > this._maxMessages) this._messages.shift();

        this._messages.push(data);
    }

    private _sanitize(text: string) {
        /* No Need to sanitize for now */
        return text;
    }
}

export default ChatBackup;