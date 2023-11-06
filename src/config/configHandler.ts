import { IOptions } from '../types/index';
import { ICallbackError } from '../types';
import { DEFAULT_CONFIG } from './defaultConfig';


const getCallbackError = (options: IOptions | ICallbackError | undefined, callback: ICallbackError | undefined): undefined | ICallbackError => {
  if (typeof options === 'function') {
    return options;
  }
  return callback;
};

const handleConfig = (options: IOptions | ICallbackError | undefined): IOptions => {
  if (typeof options === 'object') {
    validateConfig(options);
    return {
      recursive: options.recursive ?? DEFAULT_CONFIG.recursive
    };
  } else {
    return DEFAULT_CONFIG;
  }
};

const validateConfig = (options: IOptions) => {
  if (options.recursive !== undefined && typeof options.recursive !== 'boolean') {
    throw new TypeError(`Recursive must be a boolean. Received: ${typeof options.recursive}`);
  }
};


export {
  getCallbackError,
  handleConfig,
};