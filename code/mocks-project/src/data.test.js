import { it, expect, describe, vi } from 'vitest';
import {generateReportData} from "./data.js";

describe('generateReportData()', function () {
    it ('should execute logFn if provided', () => {
        // This function allows us to check if this argument actually gets used
        const logger = vi.fn();

        generateReportData(logger);

        // If we remove logFn usages in generateReportData, this expect would throw
        expect(logger).toBeCalled();
    })
});
