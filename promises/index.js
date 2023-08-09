const fs = require('fs/promises');
const { join } = require('path');

const readDirectory = async (path, arrayOfFiles = []) => {
  try {
    const files = await fs.readdir(path, { withFileTypes: true });

    await Promise.all(files.map(async (file) => {
      if (file.isDirectory()) {
        await readDirectory(join(path, file.name), arrayOfFiles);
      } else {
        arrayOfFiles.push(join(path, file.name));
      }
    }));
  } catch (error) {
    console.log(error.message);
  }
  
  return arrayOfFiles;
};

const calculateSize = async (arrayOfFiles) => {
  let size = 0;

  await Promise.all(arrayOfFiles.map(async (file) => {
    try {
      const fileStats = await fs.stat(file);
      size += fileStats.size;
    } catch (error) {
      console.log(error.message);
    }
  }));

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

  const arrayOfFiles = await readDirectory(path);
  return await calculateSize(arrayOfFiles);
};

module.exports = getSize;