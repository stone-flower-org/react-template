import { Orientation } from './types';

export const HANDLER_DELAY_MS = 20;

export const SCROLLER_CLASSES_BY_ORIENTATION: Record<Orientation, string[]> = {
  horizontal: ['scroller--x'],
  vertical: ['scroller--y'],
};

export const SCROLLER_TRACK_CLASSES_BY_ORIENTATION: Record<Orientation, string[]> = {
  horizontal: ['scroller__track--x'],
  vertical: ['scroller__track--y'],
};

export const DEFAULT_SCROLLABLE_PROPS = {
  pinToBottom: false,
  pinToRight: false,
};
