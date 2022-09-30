const fs = require('fs');

class CopyCommon {
  constructor() {

  }

  replaceAll(repStr, source, dest) {
    while (true) {
      let result = repStr.replace(source, dest);
      if (result == repStr) {
        repStr = result;
        break;
      } else {
        repStr = result;
      }
    }

    return repStr;
  }

  createFolder(filePath) {
    let dlim = '/';


    let pathArray = filePath.split('/');
    let fileName = pathArray[pathArray.length -1];

    let folderName = filePath.substr(0, filePath.length - fileName.length);

    console.log(`FolderName: "${folderName}"\n\n\n\n`);

    fs.mkdirSync(folderName, {recursive: true}, (err) => {
      console.error(`Error: ${err}`);
    });
  }

  copyFiles(files) {
    for (let c = 0; c < files.length; c++) {
      let source = files[c];
      source = this.replaceAll(source, "\\", "/");

      let dest = "";

      dest = source.substr(source.indexOf('/src/') + 5);
      dest = './src/Common/' + dest;

      dest = dest.replace('Common/Common', 'Common');

      console.log(`Source: "${source}"\nDest: "${dest}"`);

      this.createFolder(dest);

      fs.copyFileSync(source, dest);

      //console.log("Copied!\n\n");
    }
  }
}


let cCommon = new CopyCommon();

cCommon.copyFiles([
  '../fightgame_frontend/components/Game/src/Common/Data/AnimationDir.ts',
  '../fightgame_frontend/components/Game/src/Common/Data/FunObj.ts',
  '../fightgame_frontend/components/Game/src/Common/Data/IFunObj.ts',
  '../fightgame_frontend/components/Game/src/Common/Data/IDirection.ts',
  '../fightgame_frontend/components/Game/src/Common/Data/IPhysicsEntity.ts',
  '../fightgame_frontend/components/Game/src/Common/Data/CommonConfig.ts',
  '../fightgame_frontend/components/Game/src/Common/Data/ICommonConfig.ts',
  '../fightgame_frontend/components/Game/src/Common/Data/ICommunication.ts',
  '../fightgame_frontend/components/Game/src/Common/Data/IChatData.ts',
  '../fightgame_frontend/components/Game/src/Common/Data/SocketTypes.ts',

  '../fightgame_frontend/components/Game/src/Common/Brain/NewPhysics.ts'
]);