import React, { FC, MouseEvent } from 'react';

import { useThrottle } from '@src/features/common/ui/hooks';
import { ElementBox } from '@src/features/common/utils/react/types';
import { calcMaxScrollByY } from '@src/features/common/utils/react/utils';

import { Scroller } from './Scroller';
import { HANDLER_DELAY_MS } from './constants';
import { ThumbDragParams } from './types';
import { calcDistToSegment, calcScrollHeightRatio, calcThumbY } from './utils';

export interface ScrollerYProps {
  contentEl: HTMLDivElement | null;
  contentBox: ElementBox;
}

export const ScrollerY: FC<ScrollerYProps> = ({ contentEl, contentBox }) => {
  const { offset: thumbOffset, size: thumbSize, sizeRatio: scrollSizeRatio } = calcThumbY(contentBox);

  const onThumbDrag = useThrottle(
    (params: ThumbDragParams) => {
      if (!contentEl) return;
      const deltaY = params.deltaY / calcScrollHeightRatio(contentEl);
      const scrollTop = Math.min(params.dragging.initScrollTop + deltaY, calcMaxScrollByY(contentEl));
      contentEl.scrollTo(contentEl.scrollLeft, scrollTop);
    },
    [contentEl],
    HANDLER_DELAY_MS,
  );

  const onTrackMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (!contentEl) return;

    const track = event.target as HTMLDivElement;

    const trackRect = track.getBoundingClientRect();
    const localY = event.clientY - trackRect.top;
    const deltaY = calcDistToSegment([thumbOffset, thumbOffset + thumbSize], localY);

    contentEl.scrollTo(contentEl.scrollLeft, contentEl.scrollTop + deltaY / scrollSizeRatio);
  };

  const onTrackWheel = useThrottle(
    (e: WheelEvent) => {
      if (!contentEl) return;
      const scrollTop = Math.min(contentEl.scrollTop + e.deltaY, calcMaxScrollByY(contentEl));
      contentEl.scrollTo(contentEl.scrollLeft, scrollTop);
    },
    [contentEl],
    HANDLER_DELAY_MS,
  );

  return (
    <Scroller
      contentBox={contentBox}
      onThumbDrag={onThumbDrag}
      onTrackMouseDown={onTrackMouseDown}
      onTrackWheel={onTrackWheel}
      orientation="vertical"
      thumbOffset={thumbOffset}
      thumbSize={thumbSize}
    />
  );
};
