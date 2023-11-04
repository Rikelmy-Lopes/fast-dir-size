import { options } from './../types/index';
import { callbackError } from '../types';
import { calculateTotalDirSize, calculateTotalDirSizeRecursive } from '../main/folderSize';

const getCallbackError = (options: options | callbackError | undefined, callback: callbackError | undefined): undefined | callbackError => {
  if (typeof options === 'function') {
    return options;
  }
  return callback;
};


const getRecursiveOption = (options: options | callbackError | undefined) => {
  if (!options || typeof options === 'function') {
    return calculateTotalDirSizeRecursive;
  }

  if (options.recursive !== undefined && typeof options.recursive !== 'boolean') {
    throw new TypeError(`Recursive option must be a boolean. Received: ${typeof options.recursive}`);
  }

  if (options.recursive) {
    return calculateTotalDirSizeRecursive;
  } else {
    return calculateTotalDirSize;
  }
};

export {
  getCallbackError,
  getRecursiveOption,
};