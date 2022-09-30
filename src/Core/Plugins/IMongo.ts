import mongoose from 'mongoose';

interface IMongo {
    getModel(name: string, schema: any): mongoose.Model<any, {}, {}, {}>;

    findElements(model: mongoose.Model<any, {}, {}, {}>, data: any): Promise<any[]>;

    addElement(model: mongoose.Model<any, {}, {}, {}>, data: any): Promise<void>;

    saveElement(elm: any): Promise<any>;

    createNew(): IMongo
}

export default IMongo;