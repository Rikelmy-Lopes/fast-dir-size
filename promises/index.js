const { stat, readdir } = require('fs/promises');
const { join } = require('path');

const getFileSize = async (filePath, callback) => {
  try {
    const fileStats = await stat(filePath);
    return fileStats.size;
  } catch (error) {
    typeof callback === 'function' && callback(error);
    return 0;
  }
};

const getDirEntries = async (dirPath, callback) => {
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });
    return entries;
  } catch (error) {
    typeof callback === 'function' && callback(error);
    return [];
  }
};

const calculateTotalDirSize = async (dirPath, callback) => {
  let totalSize = 0;

  const entries = await getDirEntries(dirPath, callback);

  const sizes = await Promise.all(entries.map(async (entry) => {
    const entryPath = join(dirPath, entry.name);
    return entry.isDirectory() ? await calculateTotalDirSize(entryPath, callback) : await getFileSize(entryPath, callback);
  }));

  totalSize = sizes.reduce((acc, size) => acc + size, 0);

  return totalSize;
};


/**
   * Calculates the total size of a folder and its subfolders.
   * @param {string} dirPath - The path to the folder.
   * @param {function(Error): void=} callback - A callback function that handles potential errors during the folder size calculation.
   * @returns {Promise<number>} - The total size in bytes.
   * @throws {TypeError} - Throws an error if the provided path is not a string.
   * @since v1.0.0
   */
const getDirSize = async (dirPath, callback) => {
  if (typeof dirPath !== 'string') {
    throw new TypeError(`Path must be a string. Received: ${typeof dirPath}`);
  }

  return await calculateTotalDirSize(dirPath, callback);
};

module.exports = getDirSize;