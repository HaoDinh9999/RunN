import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button as RNButton,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useWalletConnect,
  withWalletConnect,
} from '@walletconnect/react-native-dapp';
import * as React from 'react';
import { Box, Button, NativeBaseProvider, useToast } from 'native-base';

function App(): JSX.Element {
  const connector = useWalletConnect();
  const toast = useToast();

  React.useEffect(() => {
    if (connector.connected) {
    console.log('thanh cong')

      toast.show({ description: 'Connect successfully!' });
    }
  }, [connector.connected]);

  toast.show({ description: 'Connect successfully!' });
  

  return (
    // <SafeAreaView>
    <NativeBaseProvider>
      <View style={styles.container}>
        <Text style={{ color: 'red' }}>dcm gi v</Text>
        {!connector.connected ? (
          <Button title='Connect' onPress={() => connector.connect()}>Connect</Button>
        ) : (
          <>
            {connector.accounts?.map((account) => (
              <Text key={account}>{account}</Text>
            ))}
            <Button
              title='Kill session'
              onPress={() => connector.killSession()}
            >Kill session</Button>
          </>
        )}
      </View>
    </NativeBaseProvider>
    // </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
