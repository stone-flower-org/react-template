import { ModifierArguments, ModifierPhases } from '@popperjs/core';

export const makeOffsetModifier = (offset: number[]) => ({
  name: 'offset',
  options: {
    offset,
  },
});

export const makeFlipModifier = (options: { fallbackPlacements?: string[] } = {}) => ({
  name: 'flip',
  options,
});

export const makePreventOverflowModifier = (
  options: { boundary?: Element; tether?: boolean; tetherOffset?: any; padding?: number } = {}
) => ({
  name: 'preventOverflow',
  options,
});

export const makeArrowModifier = (options: { element?: Element; padding?: any }) => ({
  name: 'arrow',
  options,
});

export const makeUpdateOnResizeModifier = () => ({
  name: 'updateOnResize',
  enabled: true,
  phase: 'main' as ModifierPhases,
  effect: ({ state, instance }: ModifierArguments<any>) => {
    const popper = state.elements.popper as Element;

    const observer = new MutationObserver(() => {
      instance.update();
    });

    observer.observe(popper, {
      attributeFilter: ['style', 'class'],
      attributes: true,
      characterData: false,
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
    };
  },
  fn: () => undefined,
});
