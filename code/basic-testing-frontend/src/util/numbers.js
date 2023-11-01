import {validateNumber, validateStringNotEmpty} from "./validation.js";

export function transformToNumber(value) {
  return +value;
}

export function cleanNumbers(input) {
  const numbers = [];
  for (const numberInput of input) {
    validateStringNotEmpty(numberInput);
    const number = transformToNumber(numberInput);
    validateNumber(number);
    numbers.push(number);
  }
  return numbers;
}
