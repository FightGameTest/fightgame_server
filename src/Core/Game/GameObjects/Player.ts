import IPhysicsEntity from "../../../Common/Data/IPhysicsEntity";
import { Engine, World, Composite, Body, Bodies, Constraint} from 'matter-js';
import {MaxMin} from "../../../Common/Data/AnimationDir";

class Player implements IPhysicsEntity {
    public position: { x: number, y: number, anchorX: number, anchorY: number };
    public body: Body | null;
    public display: { width: number, height: number };

    public id: number;
    public timeSlotA: number;
    public defaultTime: number;

    public animation: MaxMin | null;
    public scaleX: number;
    public scaleY: number;

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
        this.timeSlotA = -1;
        this.defaultTime = -1;

        this.animation = null;
        this.scaleX = 1;
        this.scaleY = 1;
    }

    public createNew(): Player {
        return new Player();
    }

    public toJSON() {
        return {
            position: this.position,
            display: this.display,
            id: this.id,
            timeSlotA: this.timeSlotA,
            defaultTime: this.defaultTime,
            animation: this.animation,
            scaleX: this.scaleX,
            scaleY: this.scaleY
        }
    }

    private _createID() {
        let min = 0;
        let max = 500;

        return Date.now() + Math.floor(min + Math.random() * (max + 1 - min));
    }
}

export default Player;