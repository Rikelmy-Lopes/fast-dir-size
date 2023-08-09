const fs = require('fs');
const { join } = require('path');
const getSize = require('./promises/index.js')

const readDirectory = (path, arrayOfFiles = []) => {
    try {
      const files = fs.readdirSync(path, { withFileTypes: true })
  
       files.map((file) => {
        if (file.isDirectory()) {
           readDirectory(join(path, file.name), arrayOfFiles);
        } else {
          arrayOfFiles.push(join(path, file.name));
        }
      });
    } catch (error) {
      console.log(error.message)
    }
    
    return arrayOfFiles;
  };
  
  const calculateSize = (arrayOfFiles) => {
    let size = 0;
  
     arrayOfFiles.map( (file) => {
      try {
        const fileStats = fs.statSync(file);
        size += fileStats.size;
      } catch (error) {
        console.log(error.message)
      }
    });
  
    return size;
  };
  
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
    const arrayOfFiles = readDirectory(path);
    return calculateSize(arrayOfFiles);
  }
  
  module.exports = {
    getSize,
    getSizeSync
  }