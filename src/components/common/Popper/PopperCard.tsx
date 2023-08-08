import { ClickAwayListener } from '@mui/material';
import React, { FC, ReactNode, useRef, useState } from 'react';

import { useControlledState } from '@src/hooks';

import { Popper, PopperProps } from './Popper';
import { DEFAULT_POPPER_CARD_PROPS } from './constants';
import { StyledButtonWrapper, StyledContent } from './styles';

export interface PopperCardProps {
  'data-test-id'?: string;
  children?: ReactNode;
  button: ReactNode;
  open?: boolean;
  onChange?: (open: boolean) => void;
  PopperProps?: Partial<Omit<PopperProps, 'anchorEl' | 'open'>>;
}

export const PopperCard: FC<PopperCardProps> = ({
  'data-test-id': dataName = DEFAULT_POPPER_CARD_PROPS['data-test-id'],
  button,
  children,
  open = false,
  onChange,
  PopperProps,
}: PopperCardProps) => {
  const { state: isOpen, updateState: updateOpen } = useControlledState({
    state: open ?? false,
    onChange,
  });
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);
  const buttonWrapperRef = (el: HTMLDivElement) => {
    setAnchorEl(el);
  };
  const contentRef = useRef<HTMLDivElement | null>(null);

  const showPopper = !!anchorEl;

  function onButtonClick() {
    updateOpen(!isOpen);
  }

  function onClose(e: MouseEvent | TouchEvent) {
    if (e.target && contentRef.current?.contains(e.target as any)) return;
    updateOpen(false);
  }

  return (
    <>
      <ClickAwayListener onClickAway={onClose}>
        <StyledButtonWrapper
          ref={buttonWrapperRef}
          data-test-id={`${dataName}-button`}
          onClick={onButtonClick}
        >
          {button}
        </StyledButtonWrapper>
      </ClickAwayListener>
      {showPopper && (
        <Popper
          {...PopperProps}
          anchorEl={anchorEl}
          data-test-id={dataName}
          open={isOpen}
        >
          <StyledContent ref={contentRef}>{children}</StyledContent>
        </Popper>
      )}
    </>
  );
};
