import {it, expect, describe} from 'vitest';
import {cleanNumbers, transformToNumber} from "./numbers";

describe('transformToNumber()', () => {
    it('should yield a valid string number as a valid number', () => {
        const stringNumber = '1';
        const expectedResult = +stringNumber;

        const result = transformToNumber(stringNumber);

        expect(result).toBe(expectedResult);
        // expect(result).toBeTypeOf('number');
    });

    it('should yield NaN if provided with an undefined argument', () => {
        const input = undefined;

        const result = transformToNumber(input);

        expect(result).toBeNaN();
    });
});

/*
    This can be called Integration Test, since we are testing a function that leverages smallest
    units to properly work. Integration Test are valid because even when units work
    correctly, we may introduce an error into this macro function.
    They allow us to test the combination of the smallest units.
 */
describe('cleanNumbers()', () => {
    it('should retrun an array of number values if ana array of string number values is provided', () => {
        const numberValues = ['1', '2'];

        const result = cleanNumbers(numberValues);

        expect(result[0]).toBeTypeOf('number');
    })

    it('should throw an error if an array with at least one empty string is provided', () => {
        const numberValues = ['', ''];

        const resultFn = () => cleanNumbers(numberValues);

        expect(resultFn).toThrow();
    })
});

/*
    Integration Test vs Unit Test

    We should try to be as granular as possible, therefore splitting up our code when
    it DOES make sense, when we can achieve a better readability and testability of the
    standalone sub-features that make up our feature in the end.
    We can nail down errors by being granular, although we should test the main
    macro functions that leverage many units.
 */
