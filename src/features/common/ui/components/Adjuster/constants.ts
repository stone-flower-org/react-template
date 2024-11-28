export enum Position {
  TOP_L = 'tl',
  TOP_M = 'tm',
  TOP_R = 'tr',
  CENTER_L = 'cl',
  CENTER_M = 'cm',
  CENTER_R = 'cr',
  BOTTOM_L = 'bl',
  BOTTOM_M = 'bm',
  BOTTOM_R = 'br',
}

export const DEFAULT_PROPS = {
  pos: Position.CENTER_M,
  'data-test-id': 'adjuster',
} as const;
