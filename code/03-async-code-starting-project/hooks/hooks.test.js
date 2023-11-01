import { it, expect } from 'vitest';

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
const user = new User(testEmail);

it('should update the email', () => {
  const newTestEmail = 'test2@test.com';

  user.updateEmail(newTestEmail);

  expect(user.email).toBe(newTestEmail);
});

it('should have an email property', () => {
  expect(user).toHaveProperty('email');
});

it('should store the provided email value', () => {
  expect(user.email).toBe(testEmail);
});

it('should clear the email', () => {
  user.clearEmail();

  expect(user.email).toBe('');
});

it('should still have an email property after clearing the email', () => {
  user.clearEmail();

  expect(user).toHaveProperty('email');
});
