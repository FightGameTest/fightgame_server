import mongoose from "mongoose";

class ModelFactory {
    constructor() {

    }

    public createModel(name: string, schema: any) {
        const schemaData = new mongoose.Schema(schema);

        let model = mongoose.model(name, schemaData);

        return model;
    }

    public createNew(): ModelFactory {
        return new ModelFactory();
    }
}

export default ModelFactory;