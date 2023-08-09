# fast-dir-size

Calculates the total size of a folder and its subfolders.


## Usage

Install with npm

```
npm i fast-dir-size
```

```js
// load using import
import { getSize, getSizeSync } from 'fast-dir-size'
// or using commonjs
const { getSize, getSizeSync } = require('fast-dir-size')


const os = require('os');
const path = require('path')

// Example using asynchronous function
getSize(path.join(os.homedir(), 'Downloads'))
    .then((size) => console.log(`Size: ${size} bytes`)) // Output: Size: 338160322 bytes

// Example using synchronous function
const size = getSizeSync(path.join(os.homedir(), 'Downloads'));
console.log(`Size: ${size} bytes`); // Output: Size: 338160322 bytes
```
