import { StyleSheet, Text, View, Button } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useWalletConnect,
  withWalletConnect,
} from '@walletconnect/react-native-dapp';
import * as React from 'react';

function App(): JSX.Element {
  const connector = useWalletConnect();
  if (!connector.connected) {
    /**
     *  Connect! 🎉
     */
    return <Button title='Connect' onPress={() => connector.connect()} />;
  }
  return (
    <>
      {connector.accounts?.map((account) => (
        <Text key={account}>{account}</Text>
      ))}
      <Button title='Kill Session' onPress={() => connector.killSession()} />
    </>
  );
}

export default withWalletConnect(App, {
  redirectUrl:
    Platform.OS === 'web' ? window.location.origin : 'yourappscheme://',
  storageOptions: {
    asyncStorage: AsyncStorage,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
