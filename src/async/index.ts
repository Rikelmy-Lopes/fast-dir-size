import { Dirent } from 'fs';
import { stat, readdir } from 'fs/promises';
import { join } from 'path';

const getFileSize = async (filePath: string, callback?: (err: Error) => void): Promise<number> => {
  try {
    const fileStats = await stat(filePath);
    return fileStats.size;
  } catch (error) {
    typeof callback === 'function' && callback(error as Error);
    return 0;
  }
};

const getDirEntries = async (dirPath: string, callback?: (err: Error) => void): Promise<Dirent[]> => {
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });
    return entries;
  } catch (error) {
    typeof callback === 'function' && callback(error as Error);
    return [];
  }
};

const calculateTotalDirSize = async (dirPath: string, callback?: (err: Error) => void): Promise<number> => {
  let totalSize = 0;

  const entries = await getDirEntries(dirPath, callback);

  const sizes = await Promise.all(entries.map(async (entry) => {
    const entryPath = join(dirPath, entry.name);
    return entry.isDirectory() ? await calculateTotalDirSize(entryPath, callback) :
      await getFileSize(entryPath, callback);
  }));

  totalSize = sizes.reduce((acc, size) => acc + size, 0);

  return totalSize;
};


/**
   * Calculates the total size of a folder and its subfolders.
   * @param {string} dirPath - The path to the folder.
   * @param {function} callback - A callback function that handles potential errors during the folder size calculation.
   * @returns {Promise<number>} - The total size in bytes.
   * @throws {TypeError} - Throws an error if the provided path is not a string.
   * @since v1.2.0
   */
const getDirSize = async (dirPath: string, callback?: (err: Error) => void): Promise<number> => {
  if (typeof dirPath !== 'string') {
    throw new TypeError(`Path must be a string. Received: ${typeof dirPath}`);
  }

  return await calculateTotalDirSize(dirPath, callback);
};

export default getDirSize;