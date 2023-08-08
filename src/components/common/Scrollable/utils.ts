import { areObjectsShallowlyEqual } from '@src/utils/common';
import { ElementBox } from '@src/utils/react/types';

import { DraggingState, ScrollerThumbStylesParams } from './types';

export const createInitialDraggingState = (): DraggingState => ({
  initMouseX: 0,
  initMouseY: 0,
  initScrollLeft: 0,
  initScrollTop: 0,
  status: false,
});

export const createInitialElementBox = (): ElementBox => ({
  clientHeight: 0,
  clientWidth: 0,
  offsetHeight: 0,
  offsetWidth: 0,
  scrollHeight: 0,
  scrollLeft: 0,
  scrollTop: 0,
  scrollWidth: 0,
});

export const calcScrollHeightRatio = (element: ElementBox) =>
  element.scrollHeight ? element.offsetHeight / element.scrollHeight : 0;

export const calcThumbY = (element: ElementBox) => {
  const scrollSizeRatio = calcScrollHeightRatio(element);
  return {
    offset: element.scrollTop * scrollSizeRatio,
    size: scrollSizeRatio > 1 ? 0 : element.offsetHeight * scrollSizeRatio,
    sizeRatio: scrollSizeRatio,
  };
};

export const calcScrollWidthRatio = (element: ElementBox) =>
  element.scrollWidth ? element.offsetWidth / element.scrollWidth : 0;

export const calcThumbX = (element: ElementBox) => {
  const scrollSizeRatio = calcScrollWidthRatio(element);
  return {
    offset: element.scrollLeft * scrollSizeRatio,
    size: scrollSizeRatio > 1 ? 0 : element.offsetWidth * scrollSizeRatio,
    sizeRatio: scrollSizeRatio,
  };
};

export const calcDistToSegment = (segment: [number, number], val: number) => {
  const [from, to] = segment;
  return val > to ? val - to : val - from;
};

export const shouldShowScrollerByDefault = (overflow: string) => {
  switch (overflow) {
    case 'overlay':
    case 'scroll':
      return true;
    default:
      return false;
  }
};

export const calcScrollerThumbStyles = ({ offset, orientation, size }: ScrollerThumbStylesParams) => {
  if (orientation === 'vertical')
    return {
      height: `${size}px`,
      transform: `translate(0, ${offset}px)`,
    };
  return {
    transform: `translate(${offset}px, 0)`,
    width: `${size}px`,
  };
};

export const shouleShowScrollerX = (element: HTMLElement) => {
  const styles = getComputedStyle(element);
  switch (styles.overflowX) {
    case 'auto':
      return element.scrollWidth > element.offsetWidth;
    default:
      return shouldShowScrollerByDefault(styles.overflowX);
  }
};

export const shouleShowScrollerY = (element: HTMLElement) => {
  const styles = getComputedStyle(element);
  switch (styles.overflowY) {
    case 'auto':
      return element.scrollHeight > element.offsetHeight;
    default:
      return shouldShowScrollerByDefault(styles.overflowY);
  }
};

export const shouldShowScrollers = (element: HTMLElement) => ({
  showX: shouleShowScrollerX(element),
  showY: shouleShowScrollerY(element),
});

export const areElementBoxesEqual = (a: ElementBox, b: ElementBox) => areObjectsShallowlyEqual(a, b);
