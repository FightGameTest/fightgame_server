type Address = { label: string, fooList: Function[] };

class Postman {
    private _addresses: Address[];

    constructor() {
        this._addresses = [];
    }

    public addAddress(label: string, foo: Function) {
        if (!this._exists(label)) {
            let address = this._createEmptyAddress(label);
            address.label = label;
            address.fooList.push(foo);

            this._addresses.push(address);
        } else {
            console.error(`Address with label '${label}' already exists.`);
        }
    }

    public sendMessage(label: string, message: any) {
        let address = this._getAddress(label);

        if (address != null) {
            return this._execute(address.fooList, message);
        } else {
            console.warn(`Address with label '${label}' doesn't exist.`);
        }
    }

    private _execute(fooList: Function[], message: any) {
        if (fooList.length == 1) {
            return fooList[0](message);
        }
        for (let c = 0; c < fooList.length; c++) {
            let f = fooList[c];
            f(message);
        }
    }

    private _exists(label: string) {
        let address = this._getAddress(label);

        if (address != null) {
            return true;
        } else {
            return false;
        }
    }

    private _getAddress(label: string): Address | null {
        for (let c = 0; c < this._addresses.length; c++) {
            let address = this._addresses[c];

            if (address.label == label) return address;
        }

        return null;
    }

    private _createEmptyAddress(label: string) {
        let fooList: Function[] = [];

        return { label: label, fooList: fooList };
    }
}

export default Postman;