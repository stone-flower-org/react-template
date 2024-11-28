import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Adjuster } from '@src/features/common/ui/components/Adjuster';
import { Loading } from '@src/features/common/ui/components/Loading';

const IndexPage = lazy(
  () => import(/* webpackChunkName: "index", webpackPrefetch: true */ '@src/features/example/ui/pages/IndexPage'),
);

export const AppRouter = () => (
  <Suspense
    fallback={
      <Adjuster>
        <Loading
          size="large"
          title="Page Loading"
        />
      </Adjuster>
    }
  >
    <Routes>
      <Route
        element={<IndexPage />}
        path="/"
      />
    </Routes>
  </Suspense>
);
