import { IOptions } from '../types/index';
import { ICallbackError } from '../types';
import { defaultConfig } from './defaultConfig';


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
      recursive: options.recursive ?? defaultConfig.recursive
    };
  } else {
    return defaultConfig;
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