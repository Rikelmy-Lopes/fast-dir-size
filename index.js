const fs = require('fs');
const { join } = require('path');
const getSize = require('./promises/index.js')

const calculateSize = (path) => {
  let size = 0
    try {
      const entries = getEntries(path);
      const len = entries.length

      for (let i = 0; i < len; i += 1) {
        if (entries[i].isDirectory()) {
          size += calculateSize(join(path, entries[i].name));
        } else {
          size += getFileSize(join(path, entries[i].name));
        }
      }

    } catch (error) {
      console.log(error.message);
    }
    
    return size;
  };

const getFileSize = (filePath) => {
  const fileStats = fs.statSync(filePath);

  return fileStats.size;
}

const getEntries = (path) => {
  return fs.readdirSync(path, { withFileTypes: true });
  }

  
  /**
   * Calculates the total size of a folder and its subfolders.
   * @param {string} path - The path to the folder.
   * @returns {number} - The total size in bytes.
   * @throws {TypeError} - Throws an error if the provided path is not a string.
   * @since v1.0.0
   */
  const getSizeSync = (path) => {
    if (typeof path !== 'string') {
      throw new TypeError(`Path must be a string. Received: ${typeof path}`)
    }

    return calculateSize(path);
  }
  
  module.exports = {
    getSize,
    getSizeSync
  }