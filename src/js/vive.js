import VREffect from './lib/three/examples/VREffect';
import ViveController from './lib/three/examples/ViveController';
import VRControls from './lib/three/examples/VRControls';
import {
	cameraUser,
} from './cameras';
import renderer from './renderer';

const controls = new VRControls(cameraUser);
// controls.standing = true;

const controller0 = new ViveController(0);
controller0.standingMatrix = controls.getStandingMatrix();

const controller1 = new ViveController(1);
controller1.standingMatrix = controls.getStandingMatrix();

const effect = new VREffect(renderer);

export {
	effect,
	controls,
	controller0,
	controller1,
};
