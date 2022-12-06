import React, { useState } from "react";
import { TouchableHighlight } from "react-native";
import { Text, Image, Button, Divider, Modal, View } from "native-base";
import styles from './Budget.style';
import { colors } from "../../constant/themes";
import { useNavigation } from "@react-navigation/native";
import SpendingScreen from "./Spending/Spending.screen";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import Web3 from "web3";
import imagePath from "../../constant/imagePath";

const BudgetScreen = () => {
    const navigation = useNavigation();
    const [tabActive, setTabActive] = useState(0);
    const [isShowModal, setIsShowModal] = useState(false);
    const [addressWallet,setAddressWallet] = useState("0x0e23qwreqwrqqwrwrqwrqwrqwrwqr12123");
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
                ? <Text color={colors.lightGray2}  fontSize="md" onPress={handleActionShow}>{connector?.accounts[0]}</Text>
                :<Text color={colors.lightGray2}  fontSize="md" onPress={handleBtnConnect}>Connect wallet</Text>
            }
                

            </View>
            <View style={styles.coinContain}>
                <View style={{ flexDirection: 'row', alignItems:'center' }}>
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
