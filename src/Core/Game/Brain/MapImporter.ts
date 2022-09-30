type SImage = {
        imageName : string,
        x : number,
        y : number
    };

import Box from "../GameObjects/Box";

class MapImporter {
    private _box: Box;

    constructor (box: Box) {
        this._box = box;
    }

    public interpret(sImages : SImage[]): Box[] {
        console.log("Interpreting...")
        let boxes: Box[] = [];

        sImages.forEach((sImage: SImage) => {
            let box = this._box.createNew();
            box.position.x = sImage.x;
            box.position.y = 4000 - sImage.y;

            if (sImage.imageName == "block") {
                box.display.width = 435;
                box.display.height = 152;
            } else if (sImage.imageName == "platform") {
                box.display.width = 2127;
                box.display.height = 149;
            }

            box.position.anchorX = 0.5;
            box.position.anchorY = 0.5;

            box.position.y = box.position.y - (box.display.height / 2)
            box.position.x = box.position.x + (box.display.width / 2);
            

            boxes.push(box);
        });

        return boxes;
    }


}

export default MapImporter;


