import { vi } from 'vitest';

/*
    This global mock will be used by the test runner automatically
    when we mock the module in our test suites.
    Each global mock should have the same name of the actual
    external module that we want to inject and use
 */
export const promises = {
    writeFile: vi.fn((path, data) => {
        return new Promise((resolve, reject) => {
           resolve();
        });
    }),
}
