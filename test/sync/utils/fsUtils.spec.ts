import { expect, describe, test } from 'vitest';
import { getFileSize, getDirEntries } from '../../../src/sync/utils/fsUtils'
import { join } from 'path';

describe('fsUtils', () => {
    const CALLBACK = () => undefined;

    describe('getFileSize Function', () => {
        test('should return the size of a file when called with a valid path', () => {
            const path1 = join(__dirname, '../../.for-testes-only/text1.txt');
            const path2 = join(__dirname, '../../.for-testes-only/text2.txt');

            const size1 = getFileSize(path1, CALLBACK);
            const size2 = getFileSize(path2, CALLBACK);

            expect(size1).toBe(3562);
            expect(size2).toBe(3633);
        })

        test('should return 0 when called with a invalid path', () => {
            const path = join(__dirname, '../../.for-testes-only/does-not-exist');

            const size = getFileSize(path, CALLBACK);

            expect(size).toBe(0);
        })
    })

    describe('getDirEntries Function', () => {
        test('should return a array of Dirent when called with a valid path', () => {
            const path1 = join(__dirname, '../../.for-testes-only/');
            const path2 = join(__dirname, '../../.for-testes-only/folder1');
            const path3 = join(__dirname, '../../.for-testes-only/folder2');

            const result1 = getDirEntries(path1, CALLBACK);
            const result2 = getDirEntries(path2, CALLBACK);
            const result3 = getDirEntries(path3, CALLBACK);

            expect(result1.length).toBe(5);
            expect(result2.length).toBe(3);
            expect(result3.length).toBe(2);
        })

        test('should return an empty array when called with a invalid path', () => {
            const path = join(__dirname, '../../.for-testes-only/does-not-exist');

            const result = getDirEntries(path, CALLBACK);

            expect(result.length).toBe(0);
        })
    })
})