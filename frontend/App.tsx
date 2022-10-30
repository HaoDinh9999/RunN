import { NativeBaseProvider } from 'native-base';
import * as React from 'react';

import MainNavigation from './navigation/navigation';

function App(): JSX.Element {
  return (
    <NativeBaseProvider>
      <MainNavigation />
    </NativeBaseProvider>
  );
}

export default App;
