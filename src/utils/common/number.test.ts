import { beautifyNumber } from './number';

describe('utils.common.number', () => {
  describe('beautifyNumber', () => {
    describe.each([
      {
        number: 100,
        devider: undefined,
        result: '100',
      },
      {
        number: 1000,
        devider: undefined,
        result: '1 000',
      },
      {
        number: 1000,
        devider: ',',
        result: '1,000',
      },
    ])('should group big number digits', ({ number, devider, result }) => {
      it(`number: ${number}, devider: "${devider}", result: ${result}`, () => {
        expect(beautifyNumber(number, devider)).toBe(result);
      });
    });
  });
});
