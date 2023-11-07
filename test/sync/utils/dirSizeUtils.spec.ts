import { expect, describe, test } from 'vitest';
import { calculateTotalDirSize } from '../../../src/sync/utils/dirSizeUtils'
import { join } from 'path';

describe('dirSizeUtils', () => {
    describe('calculateTotalDirSize Function', () => {
        const CALLBACK = () => undefined;
        test('should return the total size of a folder when called with a valid path and recursive equals true', () => {
            const path1 = join(__dirname, '../../.for-testes-only');
            const path2 = join(__dirname, '../../.for-testes-only/folder1');
            const options = { recursive: true }

            const size1 = calculateTotalDirSize(path1, options, CALLBACK);
            const size2 = calculateTotalDirSize(path2, options, CALLBACK);

            expect(size1).toBe(32719);
            expect(size2).toBe(14477);
        })

        test('should return the total size of a folder when called with a valid path and recursive equals false', () => {
            const path1 = join(__dirname, '../../.for-testes-only');
            const path2 = join(__dirname, '../../.for-testes-only/folder1');
            const options = { recursive: false }

            const size1 = calculateTotalDirSize(path1, options, CALLBACK);
            const size2 = calculateTotalDirSize(path2, options, CALLBACK);

            expect(size1).toBe(10911);
            expect(size2).toBe(7196);
        })

        test('should return 0 when called with a invalid path', () => {
            const path = join(__dirname, '../../.for-testes-only/does-not-exist');
            const options = { recursive: true }

            const size = calculateTotalDirSize(path, options, CALLBACK);

            expect(size).toBe(0);
        })
    })
})