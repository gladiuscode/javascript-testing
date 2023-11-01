import { it, expect, beforeEach, beforeAll, afterEach, afterAll } from 'vitest';

import { User } from './hooks.js';

/*
  To cleanup duplicate code we could move our testEmail const
  and user outside of the it functions, as follow.
  Although by moving them out, we are breaking our tests
  because we are not initializing a new user each time
  we run each it function, so the user object is dirty
  with all the operations apply to it by the previous
  it functions.
  This is why it doesn't work.
 */

const testEmail = 'test@test.com';
let user = new User(testEmail);

/*
  We can leverage hooks to fix the problem mention above.
  Hooks are a special kind of function that the test
  runner executes at a given moment during our test run.
 */
beforeAll(() => {
  console.log('This is executed one time before all test');
})
beforeEach(() => {
  console.log('This is executed one time before each test');
})
afterAll(() => {
  console.log('This is executed one time after all test');
})
afterEach(() => {
  console.log('This is executed one time after each test');

  // With this instruction we are resetting after each test
  // our user variable, so it will not be dirty anymore
  user = new User(testEmail);
})

/*
  Hooks can be used outside a test suite (describe) or inside of
  it, therefore they can be global or local to a tests slice
 */

/*
  We can use .concurrent on it or describe to run tests in
  parallel, it can be helpful with a huge amount of tests
 */

it.concurrent('should update the email', () => {
  const newTestEmail = 'test2@test.com';

  user.updateEmail(newTestEmail);

  expect(user.email).toBe(newTestEmail);
});

it.concurrent('should have an email property', () => {
  expect(user).toHaveProperty('email');
});

it.concurrent('should store the provided email value', () => {
  expect(user.email).toBe(testEmail);
});

it.concurrent('should clear the email', () => {
  user.clearEmail();

  expect(user.email).toBe('');
});

it.concurrent('should still have an email property after clearing the email', () => {
  user.clearEmail();

  expect(user).toHaveProperty('email');
});
