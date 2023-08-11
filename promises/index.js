const fs = require('fs/promises');
const { join } = require('path');

const getFileSize = async (filePath, callback) => {
  try {
    const fileStats = await fs.stat(filePath);
    return fileStats.size;
  } catch (error) {
    typeof callback === 'function' && callback(error);
    return 0;
  }
};

const getEntries = async (path) => {
  return await fs.readdir(path, { withFileTypes: true });
};

const calculateSize = async (path, callback) => {
  let totalSize = 0;
  try {
    const entries = await getEntries(path);

    const sizes = await Promise.all(entries.map(async (entry) => {
      const entryPath = join(path, entry.name);
      return entry.isDirectory() ? await calculateSize(entryPath, callback) : await getFileSize(entryPath, callback);
    }));

    totalSize = sizes.reduce((acc, size) => acc + size, 0);


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
   * @returns {Promise<number>} - The total size in bytes.
   * @throws {TypeError} - Throws an error if the provided path is not a string.
   * @since v1.0.0
   */
const getSize = async (path, callback) => {
  if (typeof path !== 'string') {
    throw new TypeError(`Path must be a string. Received: ${typeof path}`);
  }

  return await calculateSize(path, callback);
};

module.exports = getSize;