import ControlContainer from './Dep/ControlContainer';

import Kernel from './Core/Control/Kernel';

let controlContainer = new ControlContainer();
let kernel = <Kernel>controlContainer.getMain();

kernel.start();