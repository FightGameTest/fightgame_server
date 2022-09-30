import mongoose from 'mongoose';
import ModelFactory from "./Mongoose/ModelFactory";

import IMongo from "./IMongo";

class Mongo implements IMongo {
    private _modelFactory: ModelFactory;

    constructor(modelFactory: ModelFactory) {
        this._modelFactory = modelFactory;
    }

    /*
        non-existent database would be created
    */
    public startDatabase(name: string): Promise<any> {
        return new Promise((resolve: Function, reject: Function) => {
            let url = "mongodb://localhost/" + name;

            mongoose.connect(url, (error: any) => {
                if (error) {
                    reject(error);
                } else {
                    resolve();
                }
            })
        })
    }

    public getModel(name: string, schema: any) {
        let model = this._modelFactory.createModel(name, schema);
        console.log("Sending model");
        return model;
    }

    public async findElements(model: mongoose.Model<any, {}, {}, {}>, data: any) {
        let elms = await model.find(data);

        return elms;
    }

    public async addElement(model: mongoose.Model<any, {}, {}, {}>, data: any) {
        let elm = await model.create(data);

        this.saveElement(elm);
    }

    public async saveElement(elm: any) {
        await elm.save();
    }

    public createNew(): IMongo {
        return new Mongo(this._modelFactory.createNew());
    }
}

export default Mongo;