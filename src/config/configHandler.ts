import { IOptions } from '../types/index';
import { ICallbackError } from '../types';
import { DEFAULT_CONFIG } from './defaultConfig';


const parseCallback = (options: IOptions | ICallbackError | undefined, callback: ICallbackError | undefined): ICallbackError => {
  if (typeof options === 'function') {
    return options;
  }

  if (callback) {
    return callback;
  }

  return function() {return undefined;};
};

const parseOptions = (options: IOptions | ICallbackError | undefined): IOptions => {
  if (typeof options === 'object') {
    validateOptions(options);
    return {
      recursive: options.recursive ?? DEFAULT_CONFIG.recursive
    };
  } else {
    return DEFAULT_CONFIG;
  }
};

const validateOptions = (options: IOptions) => {
  if (options.recursive !== undefined && typeof options.recursive !== 'boolean') {
    throw new TypeError(`Recursive must be a boolean. Received: ${typeof options.recursive}`);
  }
};


export {
  parseCallback,
  parseOptions,
};