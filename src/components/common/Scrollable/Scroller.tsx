import React, { FC, useCallback, useRef, MouseEvent as ReactMouseEvent, useEffect } from 'react';

import { ElementBox } from '@src/utils/react/types';

import { SCROLLER_CLASSES_BY_ORIENTATION, SCROLLER_TRACK_CLASSES_BY_ORIENTATION } from './constants';
import { StyledScrollerContainer } from './styles';
import { Orientation, ThumbDragParams } from './types';
import { calcScrollerThumbStyles, createInitialDraggingState } from './utils';

export interface ScrollerProps {
  contentBox: ElementBox;
  orientation: Orientation;
  onThumbDrag: (params: ThumbDragParams, event: MouseEvent) => void;
  onTrackMouseDown: (event: ReactMouseEvent<HTMLDivElement>) => void;
  onTrackWheel: (event: WheelEvent) => void;
  thumbOffset: number;
  thumbSize: number;
}

export const Scroller: FC<ScrollerProps> = ({
  contentBox,
  orientation,
  onThumbDrag,
  onTrackMouseDown,
  onTrackWheel,
  thumbOffset,
  thumbSize,
}) => {
  const scrollerOrientationClass = SCROLLER_CLASSES_BY_ORIENTATION[orientation].join(' ');
  const scrollerTrackOrientationClass = SCROLLER_TRACK_CLASSES_BY_ORIENTATION[orientation].join(' ');
  const thumbStyles = calcScrollerThumbStyles({
    offset: thumbOffset,
    orientation,
    size: thumbSize,
  });

  const trackRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(createInitialDraggingState());

  const onScrollerMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onThumbMouseDown = (event: ReactMouseEvent<HTMLDivElement>) => {
    draggingRef.current = {
      initMouseX: event.clientX,
      initMouseY: event.clientY,
      initScrollLeft: contentBox.scrollLeft,
      initScrollTop: contentBox.scrollTop,
      status: true,
    };
  };

  const onMouseUp = useCallback(() => {
    draggingRef.current.status = false;
  }, []);

  const onMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!draggingRef.current.status) return;
      onThumbDrag(
        {
          deltaX: event.clientX - draggingRef.current.initMouseX,
          deltaY: event.clientY - draggingRef.current.initMouseY,
          dragging: draggingRef.current,
        },
        event
      );
    },
    [onThumbDrag]
  );

  const trackWheelHandler = useCallback(
    (e: WheelEvent) => {
      e.preventDefault();
      onTrackWheel(e);
    },
    [onTrackWheel]
  );

  const trackMouseDownHandler = (event: ReactMouseEvent<HTMLDivElement>) => {
    const track = event.target as HTMLDivElement;
    if (!track || !track.classList.contains('scroller__track')) return;
    onTrackMouseDown(event);
  };

  useEffect(() => {
    const trackEl = trackRef.current;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    trackEl && trackEl.addEventListener('wheel', trackWheelHandler);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      trackEl && trackEl.removeEventListener('wheel', trackWheelHandler);
    };
  }, [onMouseMove, onMouseUp, trackWheelHandler]);

  return (
    <StyledScrollerContainer
      className={`scroller ${scrollerOrientationClass}`}
      onMouseDown={onScrollerMouseDown}
    >
      <div
        className={`scroller__track ${scrollerTrackOrientationClass}`}
        ref={trackRef}
        onMouseDown={trackMouseDownHandler}
      >
        <div
          className="scroller__thumb"
          onMouseDown={onThumbMouseDown}
          style={thumbStyles}
        />
      </div>
    </StyledScrollerContainer>
  );
};
