import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Box, Text, Image, Button, Progress } from 'native-base';
import { Platform } from 'react-native';
import styles from './CardItem.style';
import { colors } from '../../constant/themes';
import { Icon } from 'native-base';
import { ColorSpace } from 'react-native-reanimated';
// import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Contract, ethers } from 'ethers';
import { formatUnits, parseEther } from 'ethers/lib/utils';
import { RunnMarketplaceABI } from '../../constant/RunnMarketplaceABI';
import { RunnSneakerABI } from '../../constant/RunnSneakerABI';
import { mapTokenDataToSneakerInDetail } from '../../utils/formatTokenData';
import detectEthereumProvider from '@metamask/detect-provider';
import Web3 from 'web3';
import { useWalletConnect } from '@walletconnect/react-native-dapp';

// import WalletConnectProvider from '@walletconnect/react-native-dapp';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { PropSneaker } from '../../@core/model/sneaker';
import imagePath from '../../constant/imagePath';

// import { providers } from "ethers";
// import { useWalletConnect } from '@walletconnect/react-native-dapp';

const CardItem = (props) => {
  const [sneaker, setSneaker] = useState<PropSneaker>(props?.sneaker);
  const navigation = useNavigation();
  // const [sneakers, setSneakers] = useState([]);
  // const web3 = React.useMemo(
  //   () => new Web3(new Web3.providers.HttpProvider(`http://${localhost}:${HARDHAT_PORT}`)),
  //   [HARDHAT_PORT]
  // );
  return (
    <Box
      bg={colors.background.tabBar}
      rounded="xl"
      _text={{
        fontSize: 'md',
        fontWeight: '',
        color: 'warmGray.50',
        textAlign: 'center',
      }}
      style={{ width: '100%' }}
    >
      <View style={styles.typeContainer}>
        <Text color={colors.text.secondaryText} bold>
          {'>>'}
        </Text>
        <Text fontSize="sm" color={colors.text.secondaryText} ml={2} bold>
          {sneaker?.type}
        </Text>
      </View>
      <View
        style={styles.productContainer}
        onTouchStart={() => {
          navigation.navigate('detailProduct', { sneaker });
        }}
      >
        <Image
          source={{
            // uri: 'https://d1mjtvp3d1g20r.cloudfront.net/2022/04/28122922/Asics-3-colour.png',
            uri:sneaker?.imgUrl
          }}
          alt="Alternate Text"
          size="xl"
          resizeMode="contain"
        />
        <View style={{ marginTop: -10, alignItems: 'center' }}>
          <Text color={colors.text.secondaryText} bold mt={0}>
            #{`${sneaker.id}`}
          </Text>
          <Text color={colors.lightGray} bold mt={0}>
            Mint {`${sneaker?.mint}`} | {`${sneaker?.rarity}`}
          </Text>
          <View style={styles.progressContainer}>
            <Box w="83%">
              <Progress
                value={75}
                mx="2"
                bg={colors.background.progress}
                _filledTrack={{ bg: colors.progress }}
                size="xs"
              />
            </Box>
            <Text w="17%" color={colors.gray2} style={{ fontSize: 11 }} bold>
              1000
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text color={colors.white} bold fontSize="sm">
            Lvl {`${sneaker?.level}`}
          </Text>
        <View style={styles.condition}>
          <Box w="100%">
          <View style={{ flexDirection: 'row', paddingHorizontal:5, alignItems:'center', justifyContent:'space-around', marginBottom:-27,zIndex:1 , paddingVertical:5 }}>
                <Image size={5} borderRadius={100} source={imagePath.protect} alt="Condition" />
                <Text
                  color={colors.white}
                  fontWeight="bold"
                  fontSize={12}
                  style={{
                    textAlign: 'center',
                    marginLeft:5
                  }}
                >
                  {sneaker?.condition} <Text   color={"#B2B8BF"} fontWeight="bold" fontSize={12}>/ 100</Text>
                </Text>
              </View>
            <Progress
              value={sneaker?.condition}
              bg={colors.background.progress}
              _filledTrack={{ bg: colors.primary }}
              size="2xl"
            >
             
            </Progress>
          </Box>
        </View>
     
      </View>
    </Box>
  );
};
export default CardItem;
