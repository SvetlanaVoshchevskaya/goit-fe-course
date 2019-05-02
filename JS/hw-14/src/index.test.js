import validText from './index'


describe('check arr contains input value', () => {
    test('arr contains input value', () => {
        const arr = ['https://jestjs.io/'];
        const result = validText('https://jestjs.io/', arr);
        expect(result).toBeTruthy()
    });
    test('arr not contains input value', () => {
        const arr = ['https://jestjs.io/'];
        const result = validText('https://jestjs1.io/', arr);
        expect(result).not.toBeTruthy()
    });
})

