import React, { FC } from 'react';

import { SlackIcon } from '@src/features/app/ui/Icons';
import { CommonLayout } from '@src/features/example/ui/layouts/CommonLayout';

const _Page: FC = () => (
  <>
    Index <SlackIcon />
  </>
);

export const IndexPage: FC = () => (
  <CommonLayout>
    <_Page />
  </CommonLayout>
);
