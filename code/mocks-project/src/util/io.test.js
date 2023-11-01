import { it, expect } from 'vitest';
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
    With spies we can wrap functions to log them or to
    provide a simple empty sub.
    With mocks we can provide a custom, more complex
    sub that can also setup some requirements for our
    test.
 */
it('should call the writeData function', () => {
    const testData = 'test';
    const testFileName = 'test.txt';

    expect(writeData(testData, testFileName)).resolves.toBeUndefined();
});
