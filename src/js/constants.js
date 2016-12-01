import { IS_DESKTOP } from '@stinkdigital/detector';

export const DEV = true;
export const SHOW_HELPERS = true;
export const SHOW_STATS = true;

export const BASE_URL = '/';
export const JSON_DIR = `${BASE_URL}assets/json/`;
export const AUDIO_DIR = `${BASE_URL}assets/audio/`;
export const IMAGE_DIR = `${BASE_URL}assets/image/`;
export const IMAGE_PLATFORM = IS_DESKTOP ? 'desktop' : 'device';
export const JSON_PLATFORM = IS_DESKTOP ? 'desktop' : 'device';

export const IMAGE_DIR_SCENE_DEFAULT = `${IMAGE_DIR}webgl/${IMAGE_PLATFORM}/default`;
export const JSON_DIR_SCENE_DEFAULT = `${JSON_DIR}webgl/${JSON_PLATFORM}/default`;
export const AUDIO_DIR_SCENE_DEFAULT = `${AUDIO_DIR}webgl/default`;
