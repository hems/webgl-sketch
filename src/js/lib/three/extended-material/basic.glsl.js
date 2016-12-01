export default {
	vertex(prehooks = '', mainhooks = '', endhooks = '') {
		return `
		#include <common>
		#include <uv_pars_vertex>
		#include <uv2_pars_vertex>
		#include <envmap_pars_vertex>
		#include <color_pars_vertex>
		#include <morphtarget_pars_vertex>
		#include <skinning_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		${prehooks}

		void main() {

			#include <uv_vertex>
			#include <uv2_vertex>
			#include <color_vertex>
			#include <skinbase_vertex>

			#ifdef USE_ENVMAP

			#include <beginnormal_vertex>
			#include <morphnormal_vertex>
			#include <skinnormal_vertex>
			#include <defaultnormal_vertex>

			#endif

			#include <begin_vertex>

			${mainhooks}

			#include <morphtarget_vertex>
			#include <skinning_vertex>
			#include <project_vertex>
			#include <logdepthbuf_vertex>

			#include <worldpos_vertex>
			#include <clipping_planes_vertex>
			#include <envmap_vertex>

			${endhooks}
		}
		`;
	},
	fragment(prehooks = '', mainhooks = '', endhooks = '') {
		return `
		uniform vec3 diffuse;
		uniform float opacity;

		#ifndef FLAT_SHADED

			varying vec3 vNormal;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <uv_pars_fragment>
		#include <uv2_pars_fragment>
		#include <map_pars_fragment>
		#include <alphamap_pars_fragment>
		#include <aomap_pars_fragment>
		#include <envmap_pars_fragment>
		#include <fog_pars_fragment>
		#include <specularmap_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		${prehooks}

		void main() {

			#include <clipping_planes_fragment>

			vec4 diffuseColor = vec4( diffuse, opacity );

			#include <logdepthbuf_fragment>
			#include <map_fragment>
			#include <color_fragment>
			#include <alphamap_fragment>
			#include <alphatest_fragment>
			#include <specularmap_fragment>

			ReflectedLight reflectedLight;
			reflectedLight.directDiffuse = vec3( 0.0 );
			reflectedLight.directSpecular = vec3( 0.0 );
			reflectedLight.indirectDiffuse = diffuseColor.rgb;
			reflectedLight.indirectSpecular = vec3( 0.0 );

			#include <aomap_fragment>

			vec3 outgoingLight = reflectedLight.indirectDiffuse;

			${mainhooks}

			#include <normal_flip>
			#include <envmap_fragment>

			gl_FragColor = vec4( outgoingLight, diffuseColor.a );

			#include <premultiplied_alpha_fragment>
			#include <tonemapping_fragment>
			#include <encodings_fragment>
			#include <fog_fragment>

			${endhooks}
		}
		`;
	},
}
