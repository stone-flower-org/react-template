import baseAxios from 'axios';

export const axios = baseAxios.create({
  validateStatus: () => true,
});
