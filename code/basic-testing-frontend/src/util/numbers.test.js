import { it, expect } from 'vitest';
import { transformToNumber } from "./numbers";

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
