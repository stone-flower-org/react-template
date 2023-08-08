import React, { FC, PropsWithChildren, useEffect, useState } from 'react';

import { boot } from '@src/boot';
import { Loadable } from '@src/components/common/Loadable';

export type AppBootProps = PropsWithChildren<any>;

export const AppBoot: FC<AppBootProps> = ({ children }: AppBootProps) => {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    boot()
      .then(() => {
        setIsBooting(false);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return <Loadable loading={isBooting}>{children}</Loadable>;
};
