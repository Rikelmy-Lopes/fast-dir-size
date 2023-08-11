const fs = require('fs');
const { join } = require('path');
const getSize = require('./promises/index.js');

const getFileSize = (filePath, callback) => {
  try {
    const fileStats = fs.statSync(filePath);
    return fileStats.size;
  } catch (error) {
    typeof callback === 'function' && callback(error);
    return 0;
  }
};

const getEntries = (path) => {
  return fs.readdirSync(path, { withFileTypes: true });
};

const calculateSize = (path, callback) => {
  let totalSize = 0;
  try {
    const entries = getEntries(path);
    const len = entries.length;

    for (let i = 0; i < len; i += 1) {
      const entryPath = join(path, entries[i].name);
      totalSize += entries[i].isDirectory() ? calculateSize(entryPath, callback) : getFileSize(entryPath, callback);
    }

  } catch (error) {
    typeof callback === 'function' && callback(error);
    return 0;
  }
    
  return totalSize;
  
};




  
/**
   * Calculates the total size of a folder and its subfolders.
   * @param {string} path - The path to the folder.
   * @param {function(Error): void=} callback - A callback function that handles potential errors during the folder size calculation.
   * @returns {number} - The total size in bytes.
   * @throws {TypeError} - Throws an error if the provided path is not a string.
   * @since v1.0.0
   */
const getSizeSync = (path, callback) => {
  if (typeof path !== 'string') {
    throw new TypeError(`Path must be a string. Received: ${typeof path}`);
  }

  return calculateSize(path, callback);
};
  
module.exports = {
  getSize,
  getSizeSync
};