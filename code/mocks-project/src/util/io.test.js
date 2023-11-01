import { it, expect, vi } from 'vitest';
import { promises as fs } from 'fs';
import writeData from "./io.js";

/*
    The problem with this test is that it is actually
    causing a side effect: it being the creation of a new
    file.
    It may be a problem, usually test do not cause side effects,
    so we must fix it.
 */

/*
    We can use spies & mocks to create a "fake" api to get
    rid of such side effect.
    With spies we can wrap our own functions to log them or to
    provide a simple empty sub.
    With mocks we can provide a custom, more complex
    sub that can also setup some requirements for our
    test and wrap external modules.
 */

// This will leverage the test runner automocking feature, basically
// replacing each fs function with a spy one.
vi.mock('fs');

// We can mock complementary modules, such as the path module
vi.mock('path', () => {
    // We return an object that provides us with the actual mock of the
    // inner function we need
    return {
        // We need to provide default when we use a module as default import
        default: {
            join: (...args) => args[args.length - 1],
        }
    }
})

it('should call the writeData function', () => {
    const testData = 'test';
    const testFileName = 'test.txt';

    // With vi.mock this will no longer work, since our mock doesn't return a promise anymore.
    // expect(writeData(testData, testFileName)).resolves.toBeUndefined();

    // We can import the actual fs function used inside writeData because it will be substituted with vi mock
    writeData(testData, testFileName);
    expect(fs.writeFile).toBeCalled();

    // We the path mock, we can actually implement an assert that takes into account the provided inputs
    expect(fs.writeFile).toBeCalledWith(testFileName, testData)
});
