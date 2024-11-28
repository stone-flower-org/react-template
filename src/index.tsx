import 'core-js/stable';
import React from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '@src/features/app/ui/App';

const appEl = document.getElementById('app');
if (!appEl) throw new Error("Couldn't find #app element");
createRoot(appEl).render(<App />);
