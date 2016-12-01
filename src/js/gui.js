import { SHOW_HELPERS } from './constants';
import dat from 'dat-gui';

dat.GUI.prototype.removeFolder = function removeFolder(name) {
	const folder = this.__folders[name];
	if (!folder) {
		return;
	}
	folder.close();
	this.__ul.removeChild(folder.domElement.parentNode);
	delete this.__folders[name];
	this.onResize();
};

class Folder {
	add() { return this; }
	listen() { return this; }
	name() { return this; }
	open() { return this; }
	close() { return this; }
	onChange() { return this; }
	addFolder() { return this; }
	addColor() { return this; }
	removeFolder() { return this; }
	remove() { return this; }
	step() { return this; }
}

class GUIWrapper {
	add() { return this; }
	addFolder() { return new Folder(); }
	removeFolder() { return this; }
	addColor() { return this; }
	listen() { return this; }
	name() { return this; }
	close() { return this; }
	step() { return this; }
	onChange() { return this; }
	setValue() { return this; }
	remove() { return this; }
	open() { return this; }
}

let Cls = dat.GUI;

if (!SHOW_HELPERS) {
	Cls = GUIWrapper;
}

export const gui = new Cls();
export const guiFlags = gui.addFolder('flags');
export { GUIWrapper };

gui.open();
guiFlags.open();
