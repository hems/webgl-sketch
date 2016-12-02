import VREffect from './lib/three/vr-effect';
import ViveController from './lib/three/vive-controller';
import VRControls from './lib/three/vr-controls';
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
