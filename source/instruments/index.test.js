// Core
import { sum, delay, getUniqueID } from "./";

describe('instruments', () => {
    test('sum function should be a function', () => {
        expect(sum).toBeInstanceOf(Function);
    });

    test('sum function should throw, when called with non-number type as second arguments', () => {
        expect(() => sum(2, 'Hi')).toThrow();
    });

    test('sum function should throw, when called with non-number type as first arguments', () => {
        expect(() => sum('Hi', 2)).toThrow();
    });

    test('sum function should return an addition of two arguments passed', () => {
        expect(sum(3, 2)).toBe(5);
        expect(sum(1, 8)).toMatchSnapshot();
    });

    test('delay function should return a resolved promise', async () => {
        await expect(delay()).resolves.toBeUndefined();
    });

    test('getUniqueID function should be a function', () => {
        expect(getUniqueID).toBeInstanceOf(Function);
    });

    test('getUniqueID function should throw, when called with non-number type as an arguments', () => {
        expect(() => getUniqueID('Hi')).toThrow();
    });

    test('getUniqueID function should produce a string of a desired given length', () => {
        expect(typeof getUniqueID()).toBe('string');
        expect(getUniqueID(5)).toHaveLength(5);
        expect(getUniqueID(13)).toHaveLength(13);
    });
});