import { createProvider } from './service-provider';

describe('core.service-provider', () => {
  describe('createProvider', () => {
    describe('boot', () => {
      it('should return prepared service returned from booting function', async () => {
        const service = {};
        const booFunc = jest.fn().mockResolvedValue(service);
        const { boot } = createProvider(booFunc);

        const bootedService = await boot();

        expect(booFunc).toHaveBeenCalledTimes(1);
        expect(bootedService).toBe(service);
      });

      it('should call booting function only once after boot call', async () => {
        const booFunc = jest.fn().mockResolvedValue(undefined);
        const { boot } = createProvider(booFunc);

        await boot();
        await boot();

        expect(booFunc).toHaveBeenCalledTimes(1);
      });
    });

    describe('get', () => {
      it('should throw exception when get called before service was booted', () => {
        const booFunc = jest.fn().mockResolvedValue(undefined);
        const { get } = createProvider(booFunc);

        expect(() => {
          get();
        }).toThrow('Service is not booted');
      });

      it('should return booted service', async () => {
        const service = {};
        const booFunc = jest.fn().mockResolvedValue(service);
        const { boot, get } = createProvider(booFunc);
        await boot();

        const bootedService = get();
        expect(bootedService).toBe(service);
      });
    });
  });
});
