import { useDispatch as useReduxDispatch } from 'react-redux';

import { DispatchFunc } from '@src/features/app/store/types';

export const useDispatch: DispatchFunc = useReduxDispatch;
