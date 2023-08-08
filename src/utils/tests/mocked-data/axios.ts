export const createAxiosResponse = (attrs: any = {}) => ({
  data: {},
  headers: {},
  status: 200,
  ...attrs,
});
