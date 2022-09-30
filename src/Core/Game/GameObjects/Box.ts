import IPhysicsEntity from "../../../Common/Data/IPhysicsEntity";
import { Engine, World, Composite, Body, Bodies, Constraint} from 'matter-js';

class Box {
    public position: { x: number, y: number, anchorX: number, anchorY: number };
    public body: Body | null;
    public display: { width: number, height: number };
    
    public id: number;

    constructor() {
        this.position = {
            x: 0,
            y: 0,
            anchorX: 0.5,
            anchorY: 0.5
        }

        this.body = null;

        this.display = {
            width: 0,
            height: 0
        }

        this.id = this._createID();
    }

    public createNew(): Box {
        return new Box();
    }

    private _createID() {
        let min = 0;
        let max = 500;

        return Date.now() + Math.floor(min + Math.random() * (max + 1 - min));
    }

}

export default Box;