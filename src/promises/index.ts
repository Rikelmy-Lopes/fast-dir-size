import { Dirent } from 'fs';
import { stat, readdir } from 'fs/promises';
import { join } from 'path';

const getFileSize = async (filePath: string, callback?: (err: unknown) => void): Promise<number> => {
  try {
    const fileStats = await stat(filePath);
    return fileStats.size;
  } catch (error) {
    typeof callback === 'function' && callback(error);
    return 0;
  }
};

const getDirEntries = async (dirPath: string, callback?: (err: unknown) => void): Promise<Dirent[]> => {
  try {
    const entries = await readdir(dirPath, { withFileTypes: true });
    return entries;
  } catch (error) {
    typeof callback === 'function' && callback(error);
    return [];
  }
};

const calculateTotalDirSize = async (dirPath: string, callback?: (err: unknown) => void): Promise<number> => {
  let totalSize = 0;

  const entries = await getDirEntries(dirPath, callback);

  const sizes = await Promise.all(entries.map(async (entry) => {
    const entryPath = join(dirPath, entry.name);
    return entry.isDirectory() ? await calculateTotalDirSize(entryPath, callback) : await getFileSize(entryPath, callback);
  }));

  totalSize = sizes.reduce((acc, size) => acc + size, 0);

  return totalSize;
};

const getDirSize = async (dirPath: string, callback?: (err: unknown) => void): Promise<number> => {
  if (typeof dirPath !== 'string') {
    throw new TypeError(`Path must be a string. Received: ${typeof dirPath}`);
  }

  return await calculateTotalDirSize(dirPath, callback);
};

export default getDirSize;