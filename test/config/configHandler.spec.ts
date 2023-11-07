import { expect, describe, test } from 'vitest';
import { parseCallback, parseOptions, validateOptions } from '../../src/config/configHandler';

describe('configHandler', () => {
    describe('parseOptions Function', () => {
        test('should return default options when called with undefined', () => {
            const result = parseOptions(undefined);

            expect(result).toMatchObject({ recursive: true });
        });

        test('should return provided options when called with an object', () => {
            const options = { recursive: false };

            const result = parseOptions(options);

            expect(result).toMatchObject(options);
        });

        test('should return default options when called with an empty object', () => {
            const options = {};

            const result = parseOptions(options);

            expect(result).toMatchObject({ recursive: true });
        });
        test('should return default options when called with an function', () => {
            const options = () => undefined;

            const result = parseOptions(options);

            expect(result).toMatchObject({ recursive: true });
        });
    });

    describe('validateOptions Function', () => {
        test('should throw a TypeError when called with invalid options', () => {
            expect(() => validateOptions({ recursive: '' })).toThrowError(TypeError);
            expect(() => validateOptions({ recursive: 123 })).toThrowError(TypeError);
            expect(() => validateOptions({ recursive: [] })).toThrowError(TypeError);
            expect(() => validateOptions({ recursive: {} })).toThrowError(TypeError);
            expect(() => validateOptions({ recursive: null })).toThrowError(TypeError);
        });

        test('should not throw a TypeError when called with a empty obejct', () => {
            expect(() => validateOptions({})).not.toThrowError(TypeError);
            expect(() => validateOptions({ recursive: undefined })).not.toThrowError(TypeError);
        });
    })

    describe('parseCallback Function', () => {
        test('should return an function when called with undefined', () => {
            const callback = parseCallback(undefined, undefined);

            expect(callback).toBeTruthy()
        });

        test('should return an function when called with a function', () => {
            const callback1 = parseCallback(() => undefined, undefined);
            const callback2 = parseCallback(undefined, () => undefined);

            expect(callback1).toBeTruthy();
            expect(callback2).toBeTruthy();
        });
    });
});
