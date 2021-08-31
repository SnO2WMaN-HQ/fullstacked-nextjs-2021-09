import {AppProps} from 'next/app';
import React from 'react';

// eslint-disable-next-line no-process-env
if (process.env.NEXT_PUBLIC_API_MOCKING_ENABLED) {
  require('../mocks');
}

export function App({Component, pageProps}: AppProps) {
  return <Component {...pageProps} />;
}

export default App;
