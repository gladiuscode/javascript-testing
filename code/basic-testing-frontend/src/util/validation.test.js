import { it, expect, describe } from 'vitest';
import {validateNumber, validateStringNotEmpty} from "./validation";

/*
    When we have multiple units in the same test file, we can leverage
    test suites to properly group them and make them clearer
 */

describe('validateStringNotEmpty()', () => {
    it ('should yield undefined when input is a valid string', () => {
        const input = 'valid';
        const expectedResult = undefined;

        const result = validateStringNotEmpty(input);

        expect(result).toBe(expectedResult);
    });

    it ('should throw error when input is an empty string', () => {
        const input = '';

        const resultFn = () => {
            validateStringNotEmpty(input);
        };

        expect(resultFn).toThrowError(/must not be empty/);
    });

    it ('should throw error when input is undefined', () => {
        const input = undefined;

        const resultFn = () => {
            validateStringNotEmpty(input);
        };

        expect(resultFn).toThrow();
    });
})

describe('validateNumber()', () => {
    it('should yield undefined when input is a valid number', () => {
        const input = 1;
        const expectedResult = undefined;

        const result = validateNumber(input);

        expect(result).toBe(expectedResult);
    });

    it('should throw an error when input isn\'t a numeric string', () => {
        const input = 'invalid';

        const resultFn = () => validateNumber(input);

        expect(resultFn).toThrowError(/Invalid number input/);
    });

    it('should throw an error when input is undefined', () => {
        const input = undefined;

        const resultFn = () => validateNumber(input);

        expect(resultFn).toThrowError(/Invalid number input/);
    });
});
