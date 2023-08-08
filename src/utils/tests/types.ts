import { RootState } from '@src/store/types';
import { ProviderProps } from '@src/utils/tests/components/Provider';

import type { PreloadedState } from '@reduxjs/toolkit';
import type {
  RenderOptions as BaseRenderOptions,
  RenderHookOptions as BaseRenderHookOptions,
} from '@testing-library/react';

export interface RenderOptions extends Omit<BaseRenderOptions, 'queries'>, SetupStoreOptions, ProviderProps {}

export interface RenderHookOptions<Props = any>
  extends Omit<BaseRenderHookOptions<Props>, 'queries'>,
    SetupStoreOptions,
    ProviderProps {}

export interface SetupStoreOptions {
  preloadedState?: PreloadedState<RootState>;
}
