import {it, describe, expect, beforeEach} from 'vitest';
import {extractPostData} from "./posts";

/*
    We don't need to mock a module entirely, such as the FormData, we just
    need to create a mock that seems like a FormData, acts like it to fit
    our needs.
 */

let testTitle = 'test title';
let testContent = 'test content';
let testFormData;

describe('extractPostData()', () => {
    beforeEach(() => {
        /*
            We can implement this dummy form data object to fit extractPostData needs
            and test it
         */
        testFormData = {
            title: testTitle,
            content: testContent,
            get(identifier) {
                return this[identifier];
            }
        };
    })

    it('should extract title and content from the provided form data', () => {

        const data = extractPostData(testFormData);

        expect(data.title).toBe(testTitle);
        expect(data.content).toBe(testContent);
    })
});
