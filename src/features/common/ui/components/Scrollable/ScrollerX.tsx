import React, { FC, MouseEvent } from 'react';

import { useThrottle } from '@src/features/common/ui/hooks';
import { ElementBox } from '@src/features/common/utils/react/types';
import { calcMaxScrollByX } from '@src/features/common/utils/react/utils';

import { Scroller } from './Scroller';
import { HANDLER_DELAY_MS } from './constants';
import { ThumbDragParams } from './types';
import { calcDistToSegment, calcScrollWidthRatio, calcThumbX } from './utils';

export interface ScrollerXProps {
  contentBox: ElementBox;
  contentEl: HTMLDivElement | null;
}

export const ScrollerX: FC<ScrollerXProps> = ({ contentBox, contentEl }) => {
  const { offset: thumbOffset, size: thumbSize, sizeRatio: scrollSizeRatio } = calcThumbX(contentBox);

  const onThumbDrag = useThrottle(
    (params: ThumbDragParams) => {
      if (!contentEl) return;
      const deltaX = params.deltaX / calcScrollWidthRatio(contentEl);
      const scrollLeft = Math.min(params.dragging.initScrollLeft + deltaX, calcMaxScrollByX(contentEl));
      contentEl.scrollTo(scrollLeft, contentEl.scrollTop);
    },
    [contentEl],
    HANDLER_DELAY_MS,
  );

  const onTrackMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    if (!contentEl) return;

    const track = event.target as HTMLDivElement;

    const trackRect = track.getBoundingClientRect();
    const localX = event.clientX - trackRect.left;
    const deltaX = calcDistToSegment([thumbOffset, thumbOffset + thumbSize], localX);

    contentEl.scrollTo(contentEl.scrollLeft + deltaX / scrollSizeRatio, contentEl.scrollTop);
  };

  const onTrackWheel = useThrottle(
    (e: WheelEvent) => {
      if (!contentEl) return;
      const scrollLeft = Math.min(contentEl.scrollLeft + e.deltaX, calcMaxScrollByX(contentEl));
      contentEl.scrollTo(scrollLeft, contentEl.scrollTop);
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
      orientation="horizontal"
      thumbOffset={thumbOffset}
      thumbSize={thumbSize}
    />
  );
};
