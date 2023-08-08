import { useDispatch as useReduxDispatch } from 'react-redux';

import { DispatchFunc } from '@src/store/types';

export const useDispatch: DispatchFunc = useReduxDispatch;
