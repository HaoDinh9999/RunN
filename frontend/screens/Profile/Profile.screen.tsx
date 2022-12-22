import React from "react";
import { TouchableHighlight } from "react-native";
import { Heading, Text, Image, Avatar, Button, View } from "native-base";
import styles from './Profile.style';
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../constant/themes";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../@core/model/user";
import imagePath from '../../constant/imagePath';
import { authActions } from "../Login/authSlice";
import { moveActions } from "../Move/moveSlice";
import { useWalletConnect } from "@walletconnect/react-native-dapp";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const connector = useWalletConnect();

    var currentUserReducer: User = useSelector((state: any) => state.auth.currentUser);
    const handleLogout =async () => {
        dispatch(authActions.logout());
        dispatch(moveActions.resetMaxEnergy())
        await connector.killSession();

        navigation.navigate('login');
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableHighlight onPress={() => navigation.goBack()}>
                    <Image size={7} borderRadius={100} source={imagePath.backWhiteCircle} alt="Alternate Text" />
                </TouchableHighlight>
                <Heading color={colors.white} style={styles.heading}>Accout</Heading>
            </View>
            <View style={styles.modalProfile}>
                <View style={styles.info}>
                    <Avatar bg="amber.500" source={{
                        uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    }} zIndex={1} size="lg" />
                    <View style={styles.infoItem}>
                        <Text color={colors.white} bold fontSize="lg" >Runner</Text>
                        <Text color={colors.text.thirdText} bold>{currentUserReducer.email}</Text>
                    </View>
                </View>

                <TouchableHighlight onPress={() => navigation.navigate('detailProfile')}>
                    <Image size={7} borderRadius={100} source={imagePath.next} alt="Alternate Text" />
                </TouchableHighlight>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.buttonInfor}>
                    <Text bold color={colors.white} fontSize="sm">Activation Code</Text>
                    <View style={styles.textIcon}>
                        <Text color={colors.white} fontSize="sm" mr={2} bold>0</Text>
                        <TouchableHighlight onPress={() => { }}>
                            <Image size={3} borderRadius={100} source={imagePath.next} alt="Alternate Text" />
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.buttonInfor}>
                    <Text bold color={colors.white} fontSize="sm">Credit point</Text>
                    <View style={styles.textIcon}>
                        <Text color={colors.white} fontSize="sm" mr={2} bold>0</Text>
                        <TouchableHighlight onPress={() => { }}>
                            <Image size={3} borderRadius={100} source={imagePath.next} alt="Alternate Text" />
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.buttonInfor}>
                    <Text bold color={colors.white} fontSize="sm">Version</Text>
                    <View style={styles.textIcon}>
                        <Text color={colors.white} fontSize="sm" bold >1.0.0</Text>
                    </View>
                </View>
            </View>
            <View style={{ justifyContent: 'flex-end', flex: 1, paddingHorizontal: 80, paddingBottom: 10 }}>
                <Button style={styles.button} onPress={handleLogout}>LOG OUT</Button>
            </View>
        </View>
    )
}
export default ProfileScreen;
