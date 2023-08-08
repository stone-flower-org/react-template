import React, { FC } from 'react';

import { DateTime } from '@src/boot';
import { CellRendererProps } from '@src/components/common/Table/types';
import { DEFAULT_DATE_FORMAT } from '@src/utils/luxon';

import { DashCellContent } from '../DashCellContent';

import { StyledContent } from './styles';
import { DateCellData } from './types';

export type DateCellProps = CellRendererProps<DateCellData>;

export const DateCell: FC<DateCellProps> = (props: DateCellProps) => {
  const date = props.value ? DateTime.fromISO(props.value) : undefined;
  return (
    <DashCellContent {...props}>
      {date?.isValid ? <StyledContent>{date.toFormat(DEFAULT_DATE_FORMAT)}</StyledContent> : undefined}
    </DashCellContent>
  );
};
