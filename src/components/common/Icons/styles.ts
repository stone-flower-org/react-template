import { SvgIcon } from '@mui/material';
import { styled } from '@mui/material/styles';

import { isKeyOf } from '@src/utils/common';

import { SIZES } from './constants';

export const StyledIcon = styled(SvgIcon)(({ fontSize }) => ({
  fontSize: isKeyOf(SIZES, fontSize) ? SIZES[fontSize] : fontSize,
}));
