import { BaseError } from './errors';

describe('core.errors', () => {
  describe('BaseError', () => {
    it('should preserve prototype chaining', () => {
      class BaseErrorChild extends BaseError {}
      class Leaf extends BaseErrorChild {}

      const instance = new Leaf();

      expect(instance).toBeInstanceOf(Error);
      expect(instance).toBeInstanceOf(BaseError);
      expect(instance).toBeInstanceOf(BaseErrorChild);
      expect(instance).toBeInstanceOf(Leaf);
    });
  });
});
