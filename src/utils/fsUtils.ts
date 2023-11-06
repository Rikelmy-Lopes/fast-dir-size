import { statSync, readdirSync, Dirent } from 'fs';

const getFileSize = (filePath: string, callback?: (err: Error) => void): number => {
  try {
    const fileStats = statSync(filePath);
    return fileStats.size;
  } catch (error) {
    typeof callback === 'function' && callback(error as Error);
    return 0;
  }
};
  
const getDirEntries = (path: string, callback?: (err: Error) => void): Dirent[] => {
  try {
    return readdirSync(path, { withFileTypes: true });
  } catch (error) {
    typeof callback === 'function' && callback(error as Error);
    return [];
  }
};

export {
  getFileSize,
  getDirEntries,
};