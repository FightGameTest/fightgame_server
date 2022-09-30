interface IPostman {
    addAddress(label: string, foo: Function): void;
    sendMessage(label: string, message: any): any;
}

export default IPostman;