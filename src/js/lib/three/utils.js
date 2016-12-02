import {
	CatmullRomCurve3,
	JSONLoader,
	Vector3,
	Mesh,
	MeshBasicMaterial,
	SphereGeometry,
	LineBasicMaterial,
	Geometry,
	Line,
	BoxGeometry,
	TextGeometry,
	FontLoader,
} from 'three';
import {
	JSON_DIR,
} from '../../constants';

/**
 * Creates a smooth spline from a set of positions
 * @param  {[,Vector3]} positions
 * @param  {Number} [totalPoints=10]
 * @return {Array}
 */
export function createSmoothSpline(positions, totalPoints = 10) {

	let points = [];
	positions.forEach(position => {
		points.push(position.clone());
	});
	let curve = new CatmullRomCurve3(points);
	points = curve.getPoints(totalPoints);
	curve = new CatmullRomCurve3(points);
	return {
		curve,
		points,
	};
}

/**
 * Parses loaded json of a geometry
 * @param  {Object} json
 * @return {Geometry}
 */
export function parseGeometry(json) {
	const loader = new JSONLoader(json);
	return loader.parse(json).geometry;
}

/**
 * Return the face center vector
 * @return {Vector}
 */
export function faceCenter(v0, v1, v2) {
	const x = (v0.x + v1.x + v2.x) / 3;
	const y = (v0.y + v1.y + v2.y) / 3;
	const z = (v0.z + v1.z + v2.z) / 3;
	return new Vector3(x, y, z);
}

/**
 * Return the face center vector
 * @return {Vector}
 */
export function createSphere(position, color) {
	const geometry = new SphereGeometry(2);
	const material = new MeshBasicMaterial({
		color,
	});
	const mesh = new Mesh(geometry, material);
	mesh.position.copy(position);
	return mesh;
}


export function createLine(scene, points, color = 0xFFFFFF) {
	const geometry = new Geometry();
	points.forEach(point => {
		geometry.vertices.push(point.clone());
	});

	const material = new LineBasicMaterial({
		color: color,
		transparent: true,
		linewidth: 5,
	});

	const mesh = new Line(geometry, material);
	scene.add(mesh);
	return mesh;
}


export function BoundsHelper(size) {
	const geometry = new BoxGeometry(size, size, size);
	const material = new MeshBasicMaterial({
		color: 0x00FF00,
		wireframe: true,
		depthWrite: false,
		wireframeLinewidth: 2,
	});
	const mesh = new Mesh(geometry, material);
	return mesh;
}

export class TextHelper {
	load() {
		return new Promise((resolve, reject) => {
			const loader = new FontLoader();
			loader.load(`${JSON_DIR}webgl/helvetiker_regular.typeface.json`, (response) => {
				if (response) {
					resolve(response);
				} else {
					reject('font not loaded');
				}
			});
		});
	}

	create(str, container, settings = {}) {
		const _settings = Object.assign({}, {
			size: 10,
			height: 1,
			color: 0xFFFFFF,
		}, settings);
		this.load().then(response => {
			const geometry = new TextGeometry(str, {
				font: response,
				size: _settings.size,
				height: _settings.height,
				curveSegments: 10,
				material: 0,
				extrudeMaterial: 1,
			});

			const mesh = new Mesh(geometry, new MeshBasicMaterial({
				color: settings.color,
			}));

			mesh.geometry.computeBoundingBox();

			const size = mesh.geometry.boundingBox.getSize();

			mesh.position.x -= size.x / 2;
			mesh.position.y -= size.y / 2;
			mesh.position.z -= size.z / 2;

			container.add(mesh);
		});
	}
}

export function addNoiseToVector(base, noise) {
	const x = (Math.random() - 0.5) * noise.x;
	const y = (Math.random() - 0.5) * noise.y;
	const z = (Math.random() - 0.5) * noise.z;
	return new Vector3().copy(base).add(new Vector3(x, y, z));
}

/**
 * Dispose for GC
 */
export function dispose(object, parent) {

	if (object === null || object === undefined) {
		return;
	}
	parent.remove(object);
	if (object.dispose) {
		object.dispose();
	}
	if (object.geometry) {
		object.geometry.dispose();
	}
	if (object.material) {
		object.material.dispose();
	}
	if (object.children) {
		let i = 0
		const l = object.children.length
		while (i < l) {
			dispose(object.children[0], object)
			i++
		}
	}
	object = null;
}

export function getCameraDirection(camera) {
	const cameraDirection = new Vector3(0, 0, -1);
	cameraDirection.applyEuler(camera.rotation, camera.rotation.order);
	return cameraDirection;
}

/**
 * http://stackoverflow.com/questions/27409074/three-js-converting-3d-position-to-2d-screen-position-r69
 * Convert 3d point to 2d screenspace
 */
export function toScreenPosition(position, camera, renderer) {
	const vector = position.clone();

	// map to normalized device coordinate (NDC) space
	vector.project(camera);

	// map to 2D screen space
	vector.x = Math.round((vector.x + 1) * renderer.domElement.width / 2);
	vector.y = Math.round((-vector.y + 1) * renderer.domElement.height / 2);
	vector.z = 0;

	return {
		x: vector.x,
		y: vector.y,
	};
};
