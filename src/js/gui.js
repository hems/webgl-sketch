import dat from 'dat-gui';

class Folder{
	add(){}
	listen(){}
	name(){}
	open(){}
	onChange(){}
}

class GUIWrapper{
	add(){}
	addFolder(){}
	addColor(){}
	listen(){}
	name(){}
	close(){}
	step(){}
	onChange(){}
	setValue(){}
}

export default function( enable = false ){

	let Cls = dat.GUI;

	if(enable){
		Cls = GUIWrapper();
	}

	new Cls();
}