import { Scrolled } from '@src/features/common/utils/react/types';

export interface DraggingState {
  initMouseX: number;
  initMouseY: number;
  initScrollLeft: number;
  initScrollTop: number;
  status: boolean;
}

export type Orientation = 'horizontal' | 'vertical';

export interface ThumbDragParams {
  deltaX: number;
  deltaY: number;
  dragging: DraggingState;
}

export interface ScrollerThumbStylesParams {
  offset: number;
  orientation: Orientation;
  size: number;
}

export type ScrolledParams = Scrolled;

export interface ScrollBarInnerState {
  lastScrolled: Scrolled;
}
