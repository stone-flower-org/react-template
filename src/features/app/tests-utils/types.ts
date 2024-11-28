import { RootState } from '@src/features/app/store/types';
import { AppProviderProps } from '@src/features/app/tests-utils/components';

import type { PreloadedState } from '@reduxjs/toolkit';
import type {
  RenderOptions as BaseRenderOptions,
  RenderHookOptions as BaseRenderHookOptions,
} from '@testing-library/react';

export interface RenderOptions extends Omit<BaseRenderOptions, 'queries'>, SetupStoreOptions, AppProviderProps {}

export interface RenderHookOptions<Props = any>
  extends Omit<BaseRenderHookOptions<Props>, 'queries'>,
    SetupStoreOptions,
    AppProviderProps {}

export interface SetupStoreOptions {
  preloadedState?: PreloadedState<RootState>;
}
