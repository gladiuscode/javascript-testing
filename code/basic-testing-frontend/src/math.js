import {cleanNumbers} from "./util/numbers.js";

export function add(numbers) {
  let sum = 0;

  for (const number of numbers) {
    sum += +number;
  }
  return sum;
}

export function calculateResult(rawNumbers) {
  try {
    const numbers = cleanNumbers(rawNumbers);
    return add(numbers).toString();
  } catch (error) {
    return error.message;
  }
}
