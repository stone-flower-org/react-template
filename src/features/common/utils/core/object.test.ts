import { isKeyOf, isNonNullObject } from './object';

describe('core.object', () => {
  describe('isKeyOf', () => {
    it('should return false when obj is not an object', () => {
      expect(isKeyOf('', 'key')).toBeFalsy();
    });

    it('should return false when key is not in obj', () => {
      expect(isKeyOf({}, 'key')).toBeFalsy();
    });

    it('should return true when key is in obj', () => {
      expect(isKeyOf({ key: '' }, 'key')).toBeTruthy();
    });
  });

  describe('isNonNullObject', () => {
    it('should return false when value is not an object', () => {
      expect(isNonNullObject('')).toBeFalsy();
    });

    it('should return false when value is null', () => {
      expect(isNonNullObject('')).toBeFalsy();
    });

    it('should return true when value is object', () => {
      expect(isNonNullObject({})).toBeTruthy();
    });
  });
});
