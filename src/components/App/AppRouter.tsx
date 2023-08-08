import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Adjuster } from '@src/components/common/Adjuster';
import { Loading } from '@src/components/common/Loading';

const IndexPage = lazy(
  () => import(/* webpackChunkName: "index", webpackPrefetch: true */ '@src/components/pages/IndexPage')
);

export const AppRouter = () => (
  <Suspense
    fallback={
      <Adjuster>
        <Loading
          title="Page Loading"
          size="large"
        />
      </Adjuster>
    }
  >
    <Routes>
      <Route
        path="/"
        element={<IndexPage />}
      />
    </Routes>
  </Suspense>
);
