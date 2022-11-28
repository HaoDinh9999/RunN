import { current } from '@reduxjs/toolkit';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { Button, useToast, View } from 'native-base';
import React from 'react';
import { Text } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { authActions, AuthState } from '../Login/authSlice';

import styles from './Home.style';

const HomeScreen = ({navigation} ) => {
  const connector = useWalletConnect();
  const toast = useToast();
  const dispatch = useDispatch();
  const currentUser = useSelector((state:any) => state.auth.currentUser)

  React.useEffect(() => {
    connector.connect();
    if (connector.connected) {
      console.log('thanh cong');

      toast.show({ description: 'Connect successfully!' });
      dispatch(authActions.updateCurrentUser({...currentUser,addressWallet:connector.accounts[0]}))
    }
  }, [connector.connected]);

  return (
    <View style={styles.container}>
      {!connector.connected ? (
        <Button onPress={() => connector.connect()}>Connect</Button>
      ) : (
        <>
          {connector.accounts?.map((account) => (
            <Text key={account}>{account}</Text>
          ))}
          <Button onPress={() => connector.killSession()}>Kill session</Button>
        </>
      )}
    </View>
  );
};

export default HomeScreen;
