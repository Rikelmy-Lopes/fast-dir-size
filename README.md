# fast-dir-size

Calculates the total size of a folder and its subfolders.


## Usage

Install with npm

```
npm i fast-dir-size
```

```js
// load using import
import { getDirSize, getDirSizeSync } from 'fast-dir-size'
// or using commonjs
const { getDirSize, getDirSizeSync } = require('fast-dir-size')


const os = require('os');
const { join } = require('path');
const path = join(os.homedir(), 'Downloads');

// Example using asynchronous function
getDirSize(path)
  .then((size) => console.log(`Size: ${size} bytes`)); // Output: Size: 338160322 bytes

// Example using synchronous function
const size = getDirSizeSync(path);
console.log(`Size: ${size} bytes`); // Output: Size: 338160322 bytes
```


<h2> Author </h2>

<p> <strong> Rikelmy Lopes </strong> </p>

<p> Made with ❤️ by Rikelmy Lopes! Get in touch! </p>

<div>
  <a href="https://www.linkedin.com/in/rikelmy-lopes/" target="_blank"><img-- height='30em' src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
  <a href="https://rikelmy-lopes.github.io/" target="_blank"><img-- height='30em' src="https://img.shields.io/badge/Portfolio-%23000000.svg?style=for-the-badge&logo=firefox&logoColor=#FF7139" target="_blank"></a>
  <a href = "mailto:rikelmylopes899@gmail.com"><img height='30em' src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://www.instagram.com/rikelmy_lopes18/" target="_blank"><img height='30em' src="https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white" target="_blank"></a>

</div> 
