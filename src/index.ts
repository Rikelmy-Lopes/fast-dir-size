import getDirSize from './promises/index';
import { callbackError, options } from './types';
import { getCallbackError, getRecursiveOption } from './utils/configHandler';

const init = (dirPath: string, options?: options | callbackError , callback?: callbackError): number => {
  const callbackError = getCallbackError(options, callback);
  const calculate = getRecursiveOption(options);

  return calculate(dirPath, callbackError);
};


/**
   * Calculates the total size of a folder and its subfolders.
   * @param {string} dirPath - The path to the folder.
   * @param {function} callback - A callback function that handles potential errors during the folder size calculation.
   * @returns {number} - The total size in bytes.
   * @throws {TypeError} - Throws an error if the provided path is not a string.
   * @since v1.2.0
   */
const getDirSizeSync = (dirPath: string, options?: options | callbackError , callback?: callbackError): number => {
  if (typeof dirPath !== 'string') {
    throw new TypeError(`Path must be a string. Received: ${typeof dirPath}`);
  }

  return init(dirPath, options, callback);
};

export {
  getDirSize,
  getDirSizeSync
};