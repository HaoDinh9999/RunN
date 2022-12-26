import React, { useCallback, useEffect, useState } from 'react';
import { TouchableHighlight } from 'react-native';
import { Text, Image, Button, Divider, Modal, View } from 'native-base';
import styles from './Budget.style';
import { colors } from '../../constant/themes';
import { useNavigation } from '@react-navigation/native';
import SpendingScreen from './Spending/Spending.screen';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
// import Web3 from "web3";
import imagePath from '../../constant/imagePath';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Contract, ethers, providers } from 'ethers';
import { RunnSneakerABI } from '../../constant/RunnSneakerABI';
import { RunnMarketplaceABI } from '../../constant/RunnMarketplaceABI';
import { mapTokenDataToSneaker, mapTokenDataToSneakerInDetail } from '../../utils/formatTokenData';
import detectEthereumProvider from '@metamask/detect-provider';
import SignClient from '@walletconnect/sign-client';
import '@walletconnect/react-native-compat';
import { RunnMoveTokenABI } from '../../constant/RunnMoveTokenABI';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../Login/authSlice';
import { log } from 'console';

const BudgetScreen = () => {
  const navigation = useNavigation();
  const [tabActive, setTabActive] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [addressWallet, setAddressWallet] = useState('0x0e23qwreqwrqqwrwrqwrqwrqwrwqr12123');
  const [sneakers, setSneakers] = useState([]);
  const [connected, setConnected] = useState(false);
  const dispatch = useDispatch();
  const currentUser = useSelector((state:any) => state.auth.currentUser);
  const sneakersUser = useSelector((state: any) => state.auth.currentUser?.sneakers);
  const RMTokenReducer: any = useSelector((state: any) => state.auth?.currentUser?.RMToken);

  const connector = useWalletConnect();
  
  const handleActionShow = () => {
    setIsShowModal(true);
  };
  const handleBtnConnect = async() => {
    connector.connect();
  };
  const handleKillWallet = async () => {
    await connector.killSession();
    console.log('kill thanh cong');
    setIsShowModal(false);
  };
  const handleBtnWallet = () => {
    setTabActive(1);
    setIsShowModal(true);
  };

  const killSession = React.useCallback(() => {
    return connector.killSession();
  }, [connector]);

  // const loadConnector = async () => {
  //     try{
  //       const provider = new WalletConnectProvider({
  //         infuraId: '6507b4b41a0c450ba0fe748e96881466',
  //         connector: connector,
  //       });
  //       await provider.enable();
  //       console.log("A du chua vo day")
  //       const web3Provider = new providers.Web3Provider(provider);
  //       const signer = web3Provider.getSigner();
  //       // dispatch(authActions.updateCurrentUser({...currentUser,addressWallet:connector.accounts[0],signer:signer}))
  //     }
  //     catch(err){
  //       console.log("Err: ",err)
  //     }
    


    
  // }
  // useEffect(()=>{
  //   // loadConnector();
  //   console.log("M co chiu thay doi ko v", connector.connected);
  //   if(connector.connected){
  //     loadConnector();
  //   }
  // }, [connector])


  const fetchRMTBalance = async () => {
    try {
      const provider = new WalletConnectProvider({
        infuraId: '6507b4b41a0c450ba0fe748e96881466',
        connector: connector,
      });
      await provider.enable();

      const web3Provider = new providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      // dispatch(authActions.updateCurrentUser({...currentUser,addressWallet:connector.accounts[0],signer:signer}))

      const ercContract = new Contract(
        '0x07B5C829Db4B925dDDA85A14079553443b1857b9',
        RunnMoveTokenABI,
        signer
      );
      const res = await ercContract.functions.balanceOf(connector.accounts[0]);
      console.log(res[0]);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSneakers = async () => {
    try {
      const provider = new WalletConnectProvider({
        infuraId: '6507b4b41a0c450ba0fe748e96881466',
        connector: connector,
      });
      await provider.enable();
      const web3Provider = new providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      const nftContract = new Contract(
        '0xeeDf9047Fd589F23aE19f597628bc96cB100f30a',
        RunnSneakerABI,
        signer
      );
        // console.log("nftContract",nftContract)
      const res = await nftContract.functions.tokenInfosByOwner(connector.accounts[0]);
      //   const res = await nftContract.functions.currentId();
      const allTokensData = res[0];
        // const formattedSneakers = allTokensData?.map((tokenData) => {
        //   return mapTokenDataToSneaker(tokenData);
        // });
      console.log("allTokensData",allTokensData);
    //   console.log("formattedSneakers",formattedSneakers);

    } catch (err) {
      console.log(err);
    }
  };

  const fetchAllSneakers = async () => {
    try {
      const session = await connector.connect();
      console.log({ session });

      const provider = new WalletConnectProvider({
        infuraId: 'e0b6607997f4422cbd00757e958b6523',
        // rpc: {
        //     11155111: "https://rpc.sepolia.dev",
        // },
        // chainId: 11155111,
        // connector: connector,
        // qrcode: true,
      });
      console.log('Result1: ', provider);

      // await provider.enable();

      const etherProvider = new providers.Web3Provider(provider);
      console.log('Provider1: ', etherProvider);

      const signer = etherProvider.getSigner();
      console.log('Signer1', signer);

      const marketplaceContract = new Contract(
        '0xb8f25b2ed468d2144B2Dcf75D5db7400728AE4e2',
        RunnMarketplaceABI,
        signer
      );
      const nftContract = new Contract(
        '0x4a30Cf2843f8075e6aa92e867c38E8308bA7b998',
        RunnSneakerABI,
        signer
      );

    //   const res =await marketplaceContract.functions.sellInfoActiveByContract('0x4a30Cf2843f8075e6aa92e867c38E8308bA7b998');
    //   const allSellInfos = res[0];
      // const result =  await  marketplaceContract.functions.sellInfoActiveByContract('0x4a30Cf2843f8075e6aa92e867c38E8308bA7b998');
      // console.log("marketplaceContract: ", result)
      // console.log("nftContract", await nftContract.functions.balanceOf('0x4a30Cf2843f8075e6aa92e867c38E8308bA7b998'))
      // const formattedSneakers = allSellInfos.map(async (sellInfo) => {
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
    } catch (err) {
      console.log('Err: ', err);
    }
  };
  return (
    <View style={styles.container}>
      {/* {connector.connected ? setConnected(true):setConnected(false)} */}
      <View style={styles.header}>
        <TouchableHighlight onPress={() => navigation.goBack()}>
          <Image size={7} borderRadius={100} source={imagePath.back} alt="Alternate Text" />
        </TouchableHighlight>
        <View style={styles.containTab}>
          <Text color={colors.white} bold fontSize="xl" style={{ paddingHorizontal: 0 }}>
            Wallet
          </Text>
        </View>
      </View>
      <View style={styles.addressContain}>
        {connector.connected ? (
          <Text color={colors.lightGray2} fontSize="md" onPress={handleActionShow}>
            {connector?.accounts[0]}
          </Text>
        ) : (
          <Text color={colors.lightGray2} fontSize="md" onPress={handleBtnConnect}>
            Connect wallet
          </Text>
        )}
      </View>
      <View style={styles.coinContain}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image size={7} borderRadius={100} source={imagePath.coin} alt="Alternate Text" />
          <Text color={colors.coin} bold fontSize="md" marginLeft={4}>
            RMT
          </Text>
        </View>
        <Text color={colors.coin} bold fontSize="lg">
        {`${ethers.utils.formatEther(RMTokenReducer.toString()).toString()}`}
        </Text>
      </View>
      <View style={styles.boxContain}>
        <View style={{ flexDirection: 'row' }}>
          <Image size={5} borderRadius={100} source={imagePath.sneakers} alt="Alternate Text" />
          <Text color={colors.white} bold fontSize="md" marginLeft={4}>
            Sneakers
          </Text>
        </View>
        <Text color={colors.white} bold fontSize="lg">
          {sneakersUser?.length}
        </Text>
      </View>
      {/* <Button onPress={fetchSneakers}>Click here</Button>
      <Button onPress={fetchRMTBalance}>Fetch RMT</Button> */}
      {/* <Divider my="2" _light={{
                bg: colors.background.progress
            }} _dark={{
                bg: "gray.50"
            }} /> */}

      <Modal isOpen={isShowModal} onClose={() => setIsShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header style={{ justifyContent: 'center', alignItems: 'center' }}>
            Wallet
          </Modal.Header>
          <Modal.Body>
            <Button style={styles.button} onPress={handleKillWallet}>
              <Text color={colors.white} bold fontSize="sm" style={{ paddingHorizontal: 15 }}>
                DISCONNECT WALLET
              </Text>
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </View>
  );
};
export default BudgetScreen;
