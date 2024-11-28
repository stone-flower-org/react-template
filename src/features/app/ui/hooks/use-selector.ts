import { useSelector as useReduxSelector } from 'react-redux';

import { SelectorFunc } from '@src/features/app/store/types';

export const useSelector: SelectorFunc = useReduxSelector;
