import {
	WebGLRenderer,
} from 'three';

/**
 * @author mrdoob / http://mrdoob.com/
 * @author jetienne / http://jetienne.com/
 */
/** @namespace */
var THREEx = THREEx || {}

/**
 * provide info on THREE.WebGLRenderer
 *
 * @param {Object} renderer the renderer to update
 * @param {Object} Camera the camera to update
 */
THREEx.RendererStats = function() {

	var msMin = 100;
	var msMax = 0;

	var container = document.createElement('div');
	container.style.cssText = 'width:80px;opacity:0.9;cursor:pointer';

	var msDiv = document.createElement('div');
	msDiv.style.cssText = 'padding:0 0 3px 3px;text-align:left;background-color:rgb(0, 0, 34);';
	container.appendChild(msDiv);

	var msText = document.createElement('div');
	msText.style.cssText = 'color:rgb(0, 255, 255);font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
	msText.innerHTML = 'WebGLRenderer';
	msDiv.appendChild(msText);

	var msTexts = [];
	var nLines = 9;
	for (var i = 0; i < nLines; i++) {
		msTexts[i] = document.createElement('div');
		msTexts[i].style.cssText = 'color:rgb(0, 255, 255);background-color:rgb(0, 0, 34);font-family:Helvetica,Arial,sans-serif;font-size:9px;font-weight:bold;line-height:15px';
		msDiv.appendChild(msTexts[i]);
		msTexts[i].innerHTML = '-';
	}


	var lastTime = Date.now();
	return {
		domElement: container,

		update: function(webglRenderer) {
			// sanity check
			console.assert(webglRenderer instanceof WebGLRenderer)

			// refresh only 30time per second
			if (Date.now() - lastTime < 1000 / 30) return;
			lastTime = Date.now()

			var i = 0;
			msTexts[i++].textContent = "=== Memory ===";
			msTexts[i++].textContent = "Programs: " + webglRenderer.info.programs.length;
			msTexts[i++].textContent = "Geometries: " + webglRenderer.info.memory.geometries;
			msTexts[i++].textContent = "Textures: " + webglRenderer.info.memory.textures;

			msTexts[i++].textContent = "=== Render ===";
			msTexts[i++].textContent = "Calls: " + webglRenderer.info.render.calls;
			msTexts[i++].textContent = "Vertices: " + webglRenderer.info.render.vertices;
			msTexts[i++].textContent = "Faces: " + webglRenderer.info.render.faces;
			msTexts[i++].textContent = "Points: " + webglRenderer.info.render.points;
		}
	}
};

export default THREEx.RendererStats;
