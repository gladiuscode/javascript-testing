import { it, expect, vi } from 'vitest';
import {sendDataRequest} from "./http";
import {HttpError} from "./errors";

const testResponseData = {
    testKey: 'testData'
}

const testFn = vi.fn((url, options) => {
    return new Promise((resolve, reject) => {
        if (typeof options.body !== 'string') {
            return reject('Not a string');;
        }
        const testResponse = {
            ok: true,
            json() {
                return new Promise((resolve1, reject1) => {
                    resolve1(testResponseData);
                })
            }
        }
        resolve(testResponse)
    });
});

/*
    We can leverage stubGlobal functionality to mock a global module, something that is provided
    by the env we are working in, such as the BrowserAPIs or NodeJS's ones.

    In this specific case we mock the fetch module, used inside sendDataRequest, to avoid a real
    api call to our backend. Instead we provide a test runner function that we can spy on and that
    acts like our module.
    So since this is a fetch, we provide a function that accepts both arguments, an url and options,
    but we execute a custom logic that returns a Promise (like the real fetch) with custom data.
    Note that it returns the same fetch output, since we must adhere to the same signature of the
    module we are mocking.
 */
vi.stubGlobal('fetch', testFn)

it('should return any available response data', () => {
    const input = { key: 'test' };

    return expect(sendDataRequest(input)).resolves.toEqual(testResponseData);
});

it('should call fetch inner function', () => {
   const data = { test: 'test' };

   sendDataRequest(data);

   expect(testFn).toBeCalled();
});

it('should convert the provided data to JSON before sending the request', async () => {
    const testData = { key: 'test' };

    // This test still fails because this is expecting a reject, just not a one with Not a string value
    // return expect(sendDataRequest(testData)).not.rejects.toBe('Not a string');

    let errorMessage;

    try {
        await sendDataRequest(testData);
    } catch (error) {
        errorMessage = error;
    }

    expect(errorMessage).not.toBe('Not a string')
});

it('should throw an HttpError in case of non-ok responses', async () => {

    /*
        We can leverage mockImplementationOnce to temporarily change the initial testFn mock
        to fit our needs for this specific case
     */
    testFn.mockImplementationOnce((url, options) => {
        return new Promise((resolve, reject) => {
            if (typeof options.body !== 'string') {
                return reject('Not a string');;
            }
            const testResponse = {
                ok: false,
                json() {
                    return new Promise((resolve1, reject1) => {
                        resolve1(testResponseData);
                    })
                }
            }
            resolve(testResponse)
        });
    })

    const testData = { key: 'test' };

    return expect(sendDataRequest(testData)).rejects.toBeInstanceOf(HttpError);
});
