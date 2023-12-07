// just a sketch, being tested for production

import { readdirSync, statSync } from 'fs';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

class Stack<T> {
  private itens: T[];

  constructor() {
    this.itens = [];
  }

  add(item: T): void {
    this.itens.push(item);
  }

  pop(): T | undefined {
    return this.itens.pop();
  }

  peek(): T {
    return this.itens[this.itens.length - 1];
  }

  isEmpty(): boolean {
    return this.itens.length === 0;
  }

  log(): void {
    console.log(this.itens);
  }
}

async function getSize(path: string): Promise<number> {
  try {
    const stats = await stat(path);
    return stats.size;
  } catch (error) {
    return 0;
  }
}


function readAllFilesSync(path: string) {
  const stack = new Stack<string>();
  let size = 0;
  stack.add(path);

  while (!stack.isEmpty()) {
    const entries = readdirSync(stack.peek(), { withFileTypes: true });
    const len = entries.length;
    const currentPath = stack.pop() as string;

    for (let i = 0; i < len; i += 1) {
      const entryPath = join(currentPath, entries[i].name);
      if (entries[i].isDirectory()) {
        stack.add(entryPath);
      } else {
        try {
          size += statSync(entryPath).size;
        } catch (error) {
          size += 0;
        }
      }
    }
  }

  return size;
}


async function readAllFilesFor(path: string) {
  const stack = new Stack<string>();
  let size = 0;
  stack.add(path);

  while (!stack.isEmpty()) {
    const entries = await readdir(stack.peek(), { withFileTypes: true });
    const len = entries.length;
    const currentPath = stack.pop() as string;


    for (let i = 0; i < len; i += 1) {
      const entryPath = join(currentPath, entries[i].name);
      if (entries[i].isDirectory()) {
        stack.add(entryPath);
      } else {
        size += await getSize(entryPath);
      }
    }
  }

  return size;
}

export {
  readAllFilesFor,
  readAllFilesSync,
};