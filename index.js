const fs = require('fs');
const { join } = require('path');
const dirSize = require('./promises/index.js');

const getFileSize = (filePath, callback) => {
  try {
    const fileStats = fs.statSync(filePath);
    return fileStats.size;
  } catch (error) {
    typeof callback === 'function' && callback(error);
    return 0;
  }
};

const getEntries = (path, callback) => {
  try {
    return fs.readdirSync(path, { withFileTypes: true });
  } catch (error) {
    typeof callback === 'function' && callback(error);
    return [];
  }
};

const calculateDirSize = (path, callback) => {
  let totalSize = 0;
  const entries = getEntries(path, callback);
  const len = entries.length;

  for (let i = 0; i < len; i += 1) {
    const entryPath = join(path, entries[i].name);
    totalSize += entries[i].isDirectory() ? calculateDirSize(entryPath, callback) : getFileSize(entryPath, callback);
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
const dirSizeSync = (path, callback) => {
  if (typeof path !== 'string') {
    throw new TypeError(`Path must be a string. Received: ${typeof path}`);
  }

  return calculateDirSize(path, callback);
};
  
module.exports = {
  dirSize,
  dirSizeSync
};