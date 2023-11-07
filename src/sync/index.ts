import { ICallbackError, IOptions } from '../types';
import { parseCallback, parseOptions } from '../config/configHandler';
import { calculateTotalDirSize } from './utils/dirSizeUtils';

/**
   * Calculates the total size of a folder and its subfolders.
   * @param {string} path - The path to the folder.
   * @param {object} options - A config object.
   * @param {Function} callback - A callback function that handles potential errors during the folder size calculation.
   * @returns {number} - The total size in bytes.
   * @throws {TypeError} - Throws an error if the provided path is not a string.
   * @since v1.2.0
   */
function getDirSizeSync(path: string, callback?: ICallbackError): number;
function getDirSizeSync(path: string, options?: IOptions): number;
function getDirSizeSync(path: string, options?: IOptions, callback?: ICallbackError): number;
function getDirSizeSync(path: string, options?: IOptions | ICallbackError, callback?: ICallbackError): number {
  if (typeof path !== 'string') {
    throw new TypeError(`Path must be a string. Received: ${typeof path}`);
  }
  const parsedCallback = parseCallback(options, callback);
  const parsedOptions = parseOptions(options);

  return calculateTotalDirSize(path, parsedOptions, parsedCallback);
}

export {
  getDirSizeSync
};