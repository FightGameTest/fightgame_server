import IFunObj from "../../../Common/Data/IFunObj";

class Loop {
    private _funObj: IFunObj;

    private _funList: IFunObj[];
    private _defaultDelay: number;

    constructor(funObj: IFunObj) {
        this._funObj = funObj;

        this._funList = [];
        this._defaultDelay = 1000/60;
    }

    public createNew(): Loop {
        return new Loop(this._funObj.createNew());
    }

    public start(delay: number = this._defaultDelay) {
        let startTime = Date.now();

        this._executeAll(startTime, delay);
    }

    public addFunction(foo: Function, context: any) {
        let fObj = this._createFunObj();
        fObj.init(foo, context);

        if (!this._exists(fObj)) {
            this._addFunction(fObj);
        } else {
            console.error("Function already added!");
        }
    }

    public removeFunction(fObj: IFunObj) {
        let i = this._indexOfFun(fObj);

        if (i > -1) {
            this._removeFunData(i, 1);
        } else {
            console.error("Function asked for deletion doesn't exist.");
        }
    }

    private _executeAll(startTime: number, delay: number) {
        for (let c = 0; c < this._funList.length; c++) {
            let elm = this._funList[c];

            elm.execute(Date.now() - startTime);
        }

        setTimeout(() => {
            this._executeAll(startTime, delay);
        }, delay);
    }

    private _addFunction(fObj: IFunObj) {
        this._funList.push(fObj);
    }

    private _exists(fObj: IFunObj) {
        if (this._indexOfFun(fObj) > -1) {
            return true;
        } else {
            return false;
        }
    }

    private _indexOfFun(fObj: IFunObj) {
        for (let c = 0; c < this._funList.length; c++) {
            let elm = this._funList[c];

            if (elm.function == fObj.function) return c;
        }

        return -1;
    }

    private _removeFunData(start: number, deleteCount: number) {
        return this._funList.splice(start, deleteCount);
    }


    //Foreign
    private _createFunObj(): IFunObj {
        return this._funObj.createNew();
    }
}

export default Loop;