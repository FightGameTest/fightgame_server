interface IWebServer {
    listen(port: number): Promise<unknown>;
    handleGet(url: string, handler: Function): void;
}

export default IWebServer;