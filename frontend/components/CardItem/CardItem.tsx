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
import {RunnSneakerABI} from '../../constant/RunnSneakerABI';
import { mapTokenDataToSneakerInDetail } from '../../utils/formatTokenData';
// import WalletConnectProvider from '@walletconnect/react-native-dapp';
import WalletConnectProvider from '@walletconnect/web3-provider';

import { providers } from "ethers";
import { useWalletConnect } from '@walletconnect/react-native-dapp';

const CardItem = () => {
    const navigation = useNavigation();
    const [sneakers, setSneakers] = useState([]);
    useEffect (()=>{
      fetchAllSneakers();
    },[])
    const fetchAllSneakers = async () => {
      
      try {
        // // const ethereum  = this.provider.ethereum;
        // const provider = new WalletConnectProvider({
        //   infuraId: "27e484dcd9e3efcfd25a83a78777cdf1",
        // });
        // await provider.enable();
        // const ethers = new providers.Web3Provider(provider);
        
          
        //   const signer = ethers.getSigner();
        //   const marketplaceContract = new Contract(
        //     '0xb8f25b2ed468d2144B2Dcf75D5db7400728AE4e2',
        //     RunnMarketplaceABI,
        //     signer
        //   );
        //   const nftContract = new Contract(
        //     '0x4a30Cf2843f8075e6aa92e867c38E8308bA7b998',
        //     RunnSneakerABI,
        //     signer
        //   );
        //   const res =
        //     await marketplaceContract.functions.sellInfoActiveByContract(
        //       '0x4a30Cf2843f8075e6aa92e867c38E8308bA7b998'
        //     );
        //   const allSellInfos = res[0];
  
        //   const formattedSneakers = allSellInfos.map(async (sellInfo) => {
        //     const { price, tokenId, saleId, seller } = sellInfo;
  
        //     const tokenData = await nftContract.tokenData(tokenId);
        //     return {
        //       ...mapTokenDataToSneakerInDetail(tokenData),
        //       id: tokenId,
        //       saleId,
        //       seller,
        //       price,
        //     };
        //   });
        //   const resultSneakers = await Promise.all(formattedSneakers);
        //   setSneakers(resultSneakers);
        //   console.log("resultSneakers",resultSneakers)

        const connector = useWalletConnect();
        const provider = new WalletConnectProvider({
        rpc: {
            56: 'https://bsc-dataseed1.binance.org:443',
        },
        chainId: 56,
        connector: connector,
        qrcode: false,
      });
        await provider.enable();
      const ethers_provider = new ethers.providers.Web3Provider(provider);
      const signer = ethers_provider.getSigner();
      console.log("Signer ", signer)


      } 
      catch (err) {
        console.log(err);
      }
    };
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
      style={{ width: "100%" }}
    >
      <View style={styles.typeContainer}>
        <Text color={colors.text.secondaryText} bold>{'>>'}</Text>
        <Text fontSize='sm' color={colors.text.secondaryText} ml={2} bold>Runner</Text>
      </View>
      <View style={styles.productContainer}  onTouchStart={()=>{navigation.navigate('detailProduct')}}>
        <Image source={{
          uri: "https://d1mjtvp3d1g20r.cloudfront.net/2022/04/28122922/Asics-3-colour.png"
        }} alt="Alternate Text" size="xl" resizeMode="contain" />
        <View style={{marginTop:-10,  alignItems:'center'}}>

          <Text color={colors.text.secondaryText} bold mt={0}>#682645412</Text>
          <Text color={colors.lightGray} bold mt={0}>Mint 4 | Level 1</Text>
          <View style={styles.progressContainer}>
            <Box w="83%">
              <Progress value={75} mx="2" bg={colors.background.progress} _filledTrack={{ bg: colors.progress }} size='xs' />
            </Box>
            <Text w="17%" color={colors.gray2} style={{ fontSize: 11 }} bold>1000</Text>
          </View>
        </View>
      </View>
      <View style={styles.footerContainer}>
        <Text color={colors.white} bold mt={0}>1550 FIT</Text>
        <Button style={styles.button}>
          <Text color={colors.white} bold fontSize="sm">SHOW</Text>
        </Button>
      </View>
    </Box>
  );
};
export default CardItem;
