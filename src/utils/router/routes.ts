import { NotFoundParams } from './types';

export const index = {
  pattern: '/',
  generate: () => '/',
};

export const notFound = {
  pattern: '*',
  generate: ({ resource }: NotFoundParams = {}) => '/404' + (resource ? `?resource=${resource}` : ''),
};

export const forbidden = {
  pattern: '/403',
  generate: () => '/403',
};
