import { NativeBaseProvider } from 'native-base';
import * as React from 'react';
import { Provider } from 'react-redux';

import MainNavigation from './navigation/navigation';
import { store } from './store';

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
