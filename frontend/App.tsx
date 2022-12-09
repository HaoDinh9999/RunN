import { NativeBaseProvider } from 'native-base';
import * as React from 'react';
import { Provider } from 'react-redux';

import MainNavigation from './navigation/navigation';
import { store } from './store';
import "@walletconnect/react-native-compat";


const TextEncodingPolyfill = require('text-encoding');

Object.assign(global, {
    TextEncoder: TextEncodingPolyfill.TextEncoder,
    TextDecoder: TextEncodingPolyfill.TextDecoder,
});

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <MainNavigation />
      </NativeBaseProvider>
    </Provider>
  );
}

export default App;
