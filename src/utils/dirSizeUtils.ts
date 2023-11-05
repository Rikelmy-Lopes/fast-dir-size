import { join } from 'path';
import { getDirEntries, getFileSize } from './fsUtils';


const calculateTotalDirSizeRecursive = (dirPath: string, callback?: (err: Error) => void): number => {
  let totalSize = 0;
  const entries = getDirEntries(dirPath, callback);
  const len = entries.length;
  
  for (let i = 0; i < len; i += 1) {
    const entryPath = join(dirPath, entries[i].name);
    totalSize += entries[i].isDirectory() ? calculateTotalDirSizeRecursive(entryPath, callback) : 
      getFileSize(entryPath, callback);
  }
      
  return totalSize;
};

const calculateTotalDirSize = (dirPath: string, callback?: (err: Error) => void) => {
  let totalSize = 0;
  const entries = getDirEntries(dirPath, callback);
  const len = entries.length;
    
  for (let i = 0; i < len; i += 1) {
    const entryPath = join(dirPath, entries[i].name);
    totalSize += entries[i].isFile() ? getFileSize(entryPath, callback) : 0;
  }
        
  return totalSize;
};

export {
  calculateTotalDirSizeRecursive,
  calculateTotalDirSize,
};