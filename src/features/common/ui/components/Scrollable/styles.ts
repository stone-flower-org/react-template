import { styled } from '@mui/material';

const SCROLLER = {
  SIZE: '12px',
};

const SCROLLER_TRACK = {
  SIZE: '4px',
  HOVER_SIZE: '8px',
};

export const StyledScrollableContent = styled('div')(() => ({}));

export const StyledScrollableContainer = styled('div')(() => ({
  '&.scrollable': {
    position: 'relative',
  },
  '& > .scrollable__content': {
    height: '100%',
    overflow: 'inherit',
    scrollbarWidth: 'none', // Mozilla
    width: '100%',
    '&::-webkit-scrollbar': {
      appearance: 'none',
      display: 'none',
      height: 0,
      width: 0,
    },
  },
}));

export const StyledScrollerContainer = styled('div')(() => ({
  '&.scroller': {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    overflow: 'hidden',
    position: 'absolute',
    justifyContent: 'center',
  },
  '&.scroller--x': {
    bottom: 0,
    height: SCROLLER.SIZE,
    left: 0,
    width: '100%',
  },
  '&.scroller--y': {
    height: '100%',
    right: 0,
    top: 0,
    width: SCROLLER.SIZE,
  },
  '.scroller__track': {
    borderRadius: '10px',
    background: '#D9D9D9',
    transition: 'height 0.2s, width 0.2s',
  },
  '.scroller__track--x': {
    height: SCROLLER_TRACK.SIZE,
    width: '100%',
    ':hover': {
      height: SCROLLER_TRACK.HOVER_SIZE,
    },
  },
  '.scroller__track--y': {
    height: '100%',
    width: SCROLLER_TRACK.SIZE,
    ':hover': {
      width: SCROLLER_TRACK.HOVER_SIZE,
    },
  },
  '.scroller__thumb': {
    background: '#888',
    borderRadius: '10px',
    height: '100%',
    transform: 'translate(0, 0)',
    width: '100%',
  },
}));
