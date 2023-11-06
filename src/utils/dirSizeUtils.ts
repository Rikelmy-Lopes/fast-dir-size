import { ICallbackError, IOptions } from './../types/index';
import { join } from 'path';
import { getDirEntries, getFileSize } from './fsUtils';
import { handleConfig } from './configHandler';


const calculateTotalDirSize = (path: string, options?: IOptions | ICallbackError, callback?: (err: Error) => void): number => {
  let totalSize = 0;
  const entries = getDirEntries(path, callback);
  const len = entries.length;
  const isRecursive = handleConfig(options).recursive;
  
  for (let i = 0; i < len; i += 1) {
    const entryPath = join(path, entries[i].name);
    if (isRecursive) {
      totalSize += entries[i].isDirectory() ? calculateTotalDirSize(entryPath, options, callback) : 
        getFileSize(entryPath, callback);
    } else {
      totalSize += entries[i].isFile() ? getFileSize(entryPath, callback) : 0;
    }
  }
      
  return totalSize;
};

// const calculateTotalDirSize = (path: string, callback?: (err: Error) => void) => {
//   let totalSize = 0;
//   const entries = getDirEntries(path, callback);
//   const len = entries.length;
    
//   for (let i = 0; i < len; i += 1) {
//     const entryPath = join(path, entries[i].name);
//     totalSize += entries[i].isFile() ? getFileSize(entryPath, callback) : 0;
//   }
        
//   return totalSize;
// };

export {
  calculateTotalDirSize,
};