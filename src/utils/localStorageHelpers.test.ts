import { getFromLocalStorage, setInLocalStorage } from './localStorageHelpers';

describe('localStorageHelpers', () => {
    describe('getFromLocalStorage', () => {
        it('correctly gets the parsed value from local storage for a provided key', () => {
            const key = "movies";
            const value = ["home alone", "the royal tenenbaums"];
            setInLocalStorage(key, value);
            const expectedResult = JSON.parse(localStorage.getItem(key)!);
            expect(expectedResult).toEqual(value);
        })
    })

    describe('setInLocalStorage', () => {
        it('correctly sets a key value pair on local storage', () => {
            const key = "movies";
            const value = ["home alone", "the royal tenenbaums"];
            setInLocalStorage(key, value);
            const expectedResult = getFromLocalStorage("movies");
            expect(expectedResult).toEqual(value);
        })

        it('returns false when setting on local storage throws an error', () => {
            const key = "movies";
            const value: any[] = [];
            // circular structure, JSON stringify will throw an error
            value[0] = value;
            const res = setInLocalStorage(key, value);
            expect(res).toEqual(false);
        })
    })
})