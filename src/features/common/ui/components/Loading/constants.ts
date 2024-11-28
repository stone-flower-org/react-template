export const SIZES = {
  small: '1.5rem',
  medium: '2rem',
  large: '3rem',
} as const;

export const DEFAULT_PROPS = {
  'data-test-id': 'loading',
  color: 'blue',
  role: 'status',
  size: SIZES.medium,
  title: 'Loading',
};
