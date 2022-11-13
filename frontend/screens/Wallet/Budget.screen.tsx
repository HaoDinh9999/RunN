import React, { useState } from "react";
import { TouchableHighlight, View } from "react-native";
import { Text, Image, Button, Divider, Modal } from "native-base";
import styles from './Budget.style';
import { colors } from "../../themes";
import { useNavigation } from "@react-navigation/native";
import SpendingScreen from "./Spending/Spending.screen";

const BudgetScreen = () => {
    const navigation = useNavigation();
    const [tabActive, setTabActive] = useState(0);
    const [isShowModal, setIsShowModal] = useState(false);
    const handleBtnSpend = () => {
        setTabActive(0);
        setIsShowModal(false);
    }
    const handleBtnWallet = () => {
        setTabActive(1);
        setIsShowModal(true);
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableHighlight onPress={() => navigation.goBack()}>
                    <Image size={5} borderRadius={100} source={{
                        uri: "https://wallpaperaccess.com/full/317501.jpg"
                    }} alt="Alternate Text" />
                </TouchableHighlight>
                <View style={styles.containTab}>
                    <Button style={tabActive === 0 ? [styles.button, styles.buttonLeft, styles.btnActive] : [styles.button, styles.buttonLeft]} onPress={handleBtnSpend}>
                        <Text color={colors.white} bold fontSize="md" style={{ paddingHorizontal: 15 }}>Spending</Text>
                    </Button>
                    <Button style={tabActive === 1 ? [styles.button, styles.buttonRight, styles.btnActive] : [styles.button, styles.buttonRight]} onPress={handleBtnWallet}>
                        <Text color={colors.white} bold fontSize="md" style={{ paddingHorizontal: 20 }} disabled={true}>Wallet</Text>
                    </Button>
                </View>
            </View>
            {tabActive === 0 ? <SpendingScreen /> :
                <Modal isOpen={isShowModal} onClose={() => setIsShowModal(false)}>
                    <Modal.Content maxWidth="400px">
                        <Modal.CloseButton />
                        <Modal.Header style={{justifyContent:'center', alignItems:'center'}}>Wallet</Modal.Header>
                        <Modal.Body>
                            <Button style={styles.button}>
                                <Text color={colors.white} bold fontSize="sm" style={{ paddingHorizontal: 15 }}>CONNECT WALLET</Text>
                            </Button>
                        </Modal.Body>
                    </Modal.Content>
                </Modal>}


        </View>
    )
}
export default BudgetScreen;
