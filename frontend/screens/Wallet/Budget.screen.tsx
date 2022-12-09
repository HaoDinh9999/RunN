import React, { useState } from "react";
import { TouchableHighlight } from "react-native";
import { Text, Image, Button, Divider, Modal, View } from "native-base";
import styles from './Budget.style';
import { colors } from "../../constant/themes";
import { useNavigation } from "@react-navigation/native";
import SpendingScreen from "./Spending/Spending.screen";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
// import Web3 from "web3";
import imagePath from "../../constant/imagePath";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Contract, ethers, providers } from "ethers";
import { RunnSneakerABI } from "../../constant/RunnSneakerABI";
import { RunnMarketplaceABI } from "../../constant/RunnMarketplaceABI";
import { mapTokenDataToSneakerInDetail } from "../../utils/formatTokenData";
import detectEthereumProvider from '@metamask/detect-provider';
import SignClient from "@walletconnect/sign-client";
import "@walletconnect/react-native-compat";

const BudgetScreen = () => {
    const navigation = useNavigation();
    const [tabActive, setTabActive] = useState(0);
    const [isShowModal, setIsShowModal] = useState(false);
    const [addressWallet, setAddressWallet] = useState("0x0e23qwreqwrqqwrwrqwrqwrqwrwqr12123");
    const [sneakers, setSneakers] = useState([]);
    const Web3 = require('web3');


    const connector = useWalletConnect();
    const handleActionShow = () => {
        setIsShowModal(true);
    }
    const handleBtnConnect = () => {
        connector.connect();
    }
    const handleKillWallet = () => {
        connector.killSession();
        setIsShowModal(false)
    }
    const handleBtnWallet = () => {
        setTabActive(1);
        setIsShowModal(true);
    }
    const signTransaction = React.useCallback(async () => {
        try {
          const signTransaction = await connector.signTransaction({
            data: '0x',
            from: connector.accounts[0],
            gas: '0x9c40',
            gasPrice: '0x02540be400',
            nonce: '0x0114',
            to: '0x89D24A7b4cCB1b6fAA2625Fe562bDd9A23260359',
            value: '0x00',
          });
          console.log("signTransaction", signTransaction)
        } catch (e) {
          console.error(e);
        }
      }, [connector]);
      const killSession = React.useCallback(() => {
        return connector.killSession();
      }, [connector]);
    const fetchAllSneakers = async () => {

        try {
            const session = await connector.connect();

            const provider = new WalletConnectProvider({
                rpc: {
                    11155111: "https://rpc.sepolia.dev",
                },
                chainId: 11155111,
                connector: connector,
                qrcode: true,
            });
            console.log("Result1: ", provider)

            // await ethereumProvider.enable();


            const etherProvider = new providers.Web3Provider(provider);
            console.log("Provider1: ", etherProvider);


            const signer = etherProvider.getSigner();
            console.log("Signer1", signer);
         

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
            

            // const res =await marketplaceContract.functions.sellInfoActiveByContract('0x4a30Cf2843f8075e6aa92e867c38E8308bA7b998');
            // const allSellInfos = res[0];
            const result =   marketplaceContract.functions.sellInfoActiveByContract('0x4a30Cf2843f8075e6aa92e867c38E8308bA7b998');
            console.log("marketplaceContract: ", result)
            console.log("nftContract", await nftContract.functions.balanceOf('0x4a30Cf2843f8075e6aa92e867c38E8308bA7b998'))
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


        }
        catch (err) {
            console.log("Err: ",err);
        }
    };
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableHighlight onPress={() => navigation.goBack()}>
                    <Image size={7} borderRadius={100} source={imagePath.back} alt="Alternate Text" />
                </TouchableHighlight>
                <View style={styles.containTab}>
                    <Text color={colors.white} bold fontSize="xl" style={{ paddingHorizontal: 0 }}>Wallet</Text>
                </View>
            </View>
            <View style={styles.addressContain} >
                {
                    connector.connected
                        ? <Text color={colors.lightGray2} fontSize="md" onPress={handleActionShow}>{connector?.accounts[0]}</Text>
                        : <Text color={colors.lightGray2} fontSize="md" onPress={handleBtnConnect}>Connect wallet</Text>
                }


            </View>
            <View style={styles.coinContain}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image size={7} borderRadius={100} source={imagePath.coin} alt="Alternate Text" />
                    <Text color={colors.coin} bold fontSize="md" marginLeft={4}>Earned AMT</Text>

                </View>
                <Text color={colors.coin} bold fontSize="lg">0.0000</Text>

            </View>
            <View style={styles.boxContain}>
                <View style={{ flexDirection: 'row' }}>
                    <Image size={5} borderRadius={100} source={imagePath.sneakers} alt="Alternate Text" />
                    <Text color={colors.white} bold fontSize="md" marginLeft={4}>Sneakers</Text>

                </View>
                <Text color={colors.white} bold fontSize="lg">0</Text>

            </View>
            <Button onPress={fetchAllSneakers}>Click here</Button>
            {/* <Divider my="2" _light={{
                bg: colors.background.progress
            }} _dark={{
                bg: "gray.50"
            }} /> */}

            <Modal isOpen={isShowModal} onClose={() => setIsShowModal(false)}>
                <Modal.Content maxWidth="400px">
                    <Modal.CloseButton />
                    <Modal.Header style={{ justifyContent: 'center', alignItems: 'center' }}>Wallet</Modal.Header>
                    <Modal.Body>
                        <Button style={styles.button} onPress={handleKillWallet}>
                            <Text color={colors.white} bold fontSize="sm" style={{ paddingHorizontal: 15 }}>DISCONNECT WALLET</Text>
                        </Button>
                    </Modal.Body>
                </Modal.Content>
            </Modal>


        </View>
    )
}
export default BudgetScreen;
