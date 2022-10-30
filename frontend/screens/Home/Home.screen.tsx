import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { Button, useToast } from 'native-base';
import { Text, View } from 'react-native';

import styles from './Home.style';

const HomeScreen = (props) => {
  const connector = useWalletConnect();
  const toast = useToast();

  // React.useEffect(() => {
  //   if (connector.connected) {
  //     console.log('thanh cong');

  //     toast.show({ description: 'Connect successfully!' });
  //   }
  // }, [connector.connected]);

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
