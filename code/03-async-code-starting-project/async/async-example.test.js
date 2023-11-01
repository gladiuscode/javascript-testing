import {it, expect} from 'vitest';
import {generateToken} from "./async-example.js";

it('should generage a token value', (done) => {
    const input = 'test@example.com';

    /*
        In this case it seems that we are testing a third
        package functionality, although we are truly
        testing whether our function does its job.
        It doesn't matter how the code is set up, we
        want to be sure that this function, given such
        input, returns a value.
     */
    generateToken(input, (err, token) => {
        // This is not the right way to test a callback because it will always pass
        // since this test runner is not waiting for any inner function to finish
        // The inner function being generateToken
        // expect(token).toBeDefined();
        // expect(token).toBe(2);

        // With done tho, this test runner will wait for the function to actually
        // finish, although it is still missing a piece. It will timeout because
        // the expect is throwing an error that the test runner can't pick up
        // expect(token).toBeDefined();
        // expect(token).toBe(2);
        // done();

        // To let the test runner handle the expect error, we must encapsulate the
        // login into our own try/catch
        try {
            // This will fail correctly
            // expect(token).toBe(2);
            expect(token).toBeDefined();
            done();
        } catch (e) {
            done(e)
        }
    });

});
