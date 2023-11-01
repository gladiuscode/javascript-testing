import { it, expect } from 'vitest';
import { add } from "./math";

/*
   AAA - Arrange, Act, Assert

   Arrange - Define the testing environment & values
   Act - Run the actual code / function that should be tested
   Assert - Evaluate the produced value / result and compare it to the expected value / result
 */

/*
   Keep your test simple so that you can quickly change it on demand
 */

/*
   Write multiple tests to cover different kind of expected result.
   For example you may want to assert that your unit throws error when an invalid input
   gets supplied ecc ecc
 */

/*
   Writing tests is an iterative process, you may write some initial tests, then go around your
   codebase to change stuff and come back to properly extend your tests to actually cover new
   requirements
 */

// This test is not following AAA practice
// it('should summarize all number values in an array', () => {
//   const result = add([1, 2, 3]);
//   expect(result).toBe(6);
// });

it('should summarize all number values in an array', () => {
    // Arrange
    const numbers = [1, 2, 3];
    const expectedResult = numbers.reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    // Act
    const result = add(numbers);

    // Assert
    expect(result).toBe(expectedResult);
});

it('should yield NaN if at least one invalid number is provided', () => {
    // Arrange
    const numbers = [1, 'invalid'];

    // Act
    const result = add(numbers);

    // Assert
    expect(result).toBeNaN();
});

it('should yield a correct sum if an array of numeric string values is provided', () => {
    // Arrange
    const numbers = ['1', '2', '3', '4'];
    const expectedResult = numbers.reduce((previousValue, currentValue) => +previousValue + +currentValue, 0);

    // Act
    const result = add(numbers);

    // Assert
    expect(result).toBe(expectedResult);
});

it('should yield 0 if an empty array is provided', () => {
    // Arrange
    const numbers = [];
    const expectedResult = numbers.reduce((previousValue, currentValue) => +previousValue + +currentValue, 0);

    // Act
    const result = add(numbers);

    // Assert
    expect(result).toBe(expectedResult);
});

it('should throw an error if no value is passed into the function', () => {
    const resultFn = () => {
        add();
    };

    expect(resultFn).toThrow();
});

it('should throw an error if provided with multiple arguments instead of an array', () => {
    const num1 = 1;
    const num2 = 1;

    const resultFn = () => {
        add(num1, num2);
    };

    expect(resultFn).toThrow();
});
