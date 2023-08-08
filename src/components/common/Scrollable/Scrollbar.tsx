import React, { FC, useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { useThrottle } from '@src/hooks';
import { getElementBoxFromHTMLElement, getScrolledFromElementBox, scrollToByPercent } from '@src/utils/react';

import { ScrollerX } from './ScrollerX';
import { ScrollerY } from './ScrollerY';
import { HANDLER_DELAY_MS } from './constants';
import { ScrollBarInnerState, ScrolledParams } from './types';
import { areElementBoxesEqual, createInitialElementBox, shouldShowScrollers } from './utils';

export interface ScrollbarProps {
  contentEl: HTMLDivElement | null;
  onScrolled?: (params: ScrolledParams, event?: Event) => void;
  pinToBottom: boolean;
  pinToRight: boolean;
}

export const Scrollbar: FC<ScrollbarProps> = ({ contentEl, onScrolled, pinToBottom, pinToRight }) => {
  const [contentBox, setContentBox] = useState(createInitialElementBox());
  const contentBoxRef = useRef(contentBox);
  contentBoxRef.current = contentBox;

  const innertStateRef = useRef<ScrollBarInnerState>({
    lastScrolled: {
      leftPercent: pinToRight ? 100 : 0,
      topPercent: pinToBottom ? 100 : 0,
    },
  });

  const { showX, showY } = useMemo(() => {
    if (!contentEl)
      return {
        showX: false,
        showY: false,
      };
    return shouldShowScrollers(contentEl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentEl, contentBox.offsetHeight, contentBox.offsetWidth, contentBox.scrollHeight, contentBox.scrollWidth]);

  const onContentScroll = useThrottle(
    (e: Event) => {
      if (!e.target) return;
      const containerEl = e.target as HTMLDivElement;
      const newContentBox = getElementBoxFromHTMLElement(containerEl);
      setContentBox(newContentBox);

      const scrolled = getScrolledFromElementBox(newContentBox);
      onScrolled && onScrolled(scrolled, e);

      innertStateRef.current.lastScrolled = scrolled;
    },
    [onScrolled],
    HANDLER_DELAY_MS
  );

  const handleContentResized = useCallback(
    (content: HTMLElement) => {
      setContentBox((state) => {
        const newBox = getElementBoxFromHTMLElement(content);
        return areElementBoxesEqual(state, newBox) ? state : newBox;
      });
      scrollToByPercent(content, {
        left: pinToRight ? innertStateRef.current.lastScrolled.leftPercent : undefined,
        top: pinToBottom ? innertStateRef.current.lastScrolled.topPercent : undefined,
      });
    },
    [pinToBottom, pinToRight]
  );

  useLayoutEffect(() => {
    const mutationObserver = new MutationObserver(() => {
      if (!contentEl) return;
      handleContentResized(contentEl);
    });
    contentEl &&
      mutationObserver.observe(contentEl, {
        attributeFilter: ['style', 'class'],
        attributes: true,
        characterData: false,
        childList: true,
        subtree: true,
      });

    const resizeObserver = new ResizeObserver(() => {
      if (!contentEl) return;
      handleContentResized(contentEl);
    });
    contentEl && resizeObserver.observe(contentEl);

    contentEl?.addEventListener('scroll', onContentScroll);

    return () => {
      mutationObserver.disconnect();
      resizeObserver.disconnect();
      if (contentEl) {
        contentEl.removeEventListener('scroll', onContentScroll);
      }
    };
  }, [contentEl, onContentScroll, handleContentResized]);

  return (
    <>
      {showX && (
        <ScrollerX
          contentBox={contentBox}
          contentEl={contentEl}
        />
      )}
      {showY && (
        <ScrollerY
          contentBox={contentBox}
          contentEl={contentEl}
        />
      )}
    </>
  );
};
