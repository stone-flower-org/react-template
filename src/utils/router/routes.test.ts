import { forbidden, index, notFound } from './routes';

describe('router.routes', () => {
  describe('index', () => {
    it('should generate link to index based on params', () => {
      expect(index.generate()).toBe('/');
    });
  });

  describe('notFound', () => {
    it('should generate link to 404 page based on params', () => {
      const resource = 'some-resource';
      expect(notFound.generate()).toBe('/404');
      expect(notFound.generate({ resource })).toBe(`/404?resource=${resource}`);
    });
  });

  describe('forbidden', () => {
    it('should generate link to 403 page based on params', () => {
      expect(forbidden.generate()).toBe('/403');
    });
  });
});
