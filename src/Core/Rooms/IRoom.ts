import ISocket from "../Plugins/ISocket";

interface IRoom {
    totalPlayers: number;
    url: string;
    socket: ISocket;

    create(): void;
    onConnection(socket: any): Promise<unknown>;
    onDisconnection(socket: any): Promise<unknown>;
    onMessage(scoket: any, message: any): Promise<unknown>;
    createNew(): IRoom;
}

export default IRoom;