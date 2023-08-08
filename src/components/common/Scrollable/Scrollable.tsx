import React, { FC, forwardRef, HTMLAttributes, Ref } from 'react';

import { useRefChangeHandler } from '@src/hooks';
import { joinNonEmpty } from '@src/utils/common';

import { Scrollbar, ScrollbarProps } from './Scrollbar';
import { DEFAULT_SCROLLABLE_PROPS } from './constants';
import { StyledScrollableContainer } from './styles';

export interface ScrollableProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
  onScrolled?: ScrollbarProps['onScrolled'];
  pinToBottom?: ScrollbarProps['pinToBottom'];
  pinToRight?: ScrollbarProps['pinToRight'];
}

export const Scrollable: FC<ScrollableProps> = forwardRef(
  (
    {
      className,
      children,
      onScrolled,
      pinToBottom = DEFAULT_SCROLLABLE_PROPS['pinToBottom'],
      pinToRight = DEFAULT_SCROLLABLE_PROPS['pinToRight'],
      ...props
    }: ScrollableProps,
    forwarededRed
  ) => {
    const { el: contentEl, onRefChange: contentRef } = useRefChangeHandler(forwarededRed);
    const scrollableClass = joinNonEmpty([className, 'scrollable'], ' ');
    return (
      <StyledScrollableContainer className={scrollableClass}>
        <div
          {...props}
          className="scrollable__content"
          ref={contentRef}
        >
          {children}
        </div>
        <Scrollbar
          contentEl={contentEl}
          onScrolled={onScrolled}
          pinToBottom={pinToBottom}
          pinToRight={pinToRight}
        />
      </StyledScrollableContainer>
    );
  }
);

Scrollable.displayName = 'Scrollable';
