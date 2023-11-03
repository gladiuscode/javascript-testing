import { it, expect } from 'vitest';
import {validateNotEmpty} from "./validation";

it('should throw an error when an empty string is provided', () => {
    const testInput = '';

    const resultFn = () => validateNotEmpty(testInput);

    expect(resultFn).toThrow();
});

it('should throw an error when a string with only blanks is provided', () => {
    const testInput = '   ';

    const resultFn = () => validateNotEmpty(testInput);

    expect(resultFn).toThrow();
});

it('should throw a validation error', () => {
    const testInput = '   ';
    const testError = 'Test';

    const resultFn = () => validateNotEmpty(testInput, testError);

    expect(resultFn).toThrow(testError);
});
