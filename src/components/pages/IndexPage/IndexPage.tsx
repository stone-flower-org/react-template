import React, { FC } from 'react';

import { CommonLayout } from '@src/components/layouts/CommonLayout';

const _Page: FC = () => <>Index</>;

export const IndexPage: FC = () => (
  <CommonLayout>
    <_Page />
  </CommonLayout>
);
