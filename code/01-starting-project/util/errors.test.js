import {it, expect, describe} from 'vitest';
import {HttpError, ValidationError} from "./errors";

describe('HttpError', () => {
    it('should create an HttpError properly setup', () => {
        const statusCode = 404;
        const message = "Not Found";
        const data = {};

        const error = new HttpError(statusCode, message, data);

        expect(error).toHaveProperty('statusCode');
        expect(error.statusCode).toBe(statusCode);

        expect(error).toHaveProperty('message');
        expect(error.message).toBe(message);

        expect(error).toHaveProperty('data');
        expect(error.data).toBe(data);
    });
})

describe('ValidationError', () => {
    it('should create a ValidationError properly setup', () => {
        const message = "Something went wrong";

        const error = new ValidationError(message);

        expect(error).toHaveProperty('message');
        expect(error.message).toBe(message);
    })
})
