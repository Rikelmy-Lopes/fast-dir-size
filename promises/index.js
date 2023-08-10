const fs = require('fs/promises');
const { join } = require('path');

const getFileSize = async (filePath) => {
  const fileStats = await fs.stat(filePath);
  return fileStats.size;
};

const getEntries = async (path) => {
  return await fs.readdir(path, { withFileTypes: true });
};

const calculateSize = async (path) => {
  let size = 0;
  try {
    const entries = await getEntries(path);

    await Promise.all(entries.map(async (entry) => {
      if (entry.isDirectory()) {
        size += await calculateSize(join(path, entry.name));
      } else {
        size += await getFileSize(join(path, entry.name));
      }
    }));

    // for (const entry of entries) {
    //   if (entry.isDirectory()) {
    //     size += await calculateSize(join(path, entry.name));
    //   } else {
    //     size += await getFileSize(join(path, entry.name));
    //   }
    // }

  } catch (error) {
    console.log(error.message);
  }

  return size;
};

/**
   * Calculates the total size of a folder and its subfolders.
   * @param {string} path - The path to the folder.
   * @returns {Promise<number>} - The total size in bytes.
   * @throws {TypeError} - Throws an error if the provided path is not a string.
   * @since v1.0.0
   */
const getSize = async (path) => {
  if (typeof path !== 'string') {
    throw new TypeError(`Path must be a string. Received: ${typeof path}`);
  }
  const size = await calculateSize(path);
  return size;
};

module.exports = getSize;