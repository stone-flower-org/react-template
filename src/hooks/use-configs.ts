import { useContext } from 'react';

import { ConfigsContext } from '@src/context/ConfigsProvider';

export const useConfigs = () => {
  const ctx = useContext(ConfigsContext);
  if (!ctx) throw new Error('useConfigs must be used within ConfigsContext');
  return ctx;
};
