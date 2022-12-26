import { View, Text, Avatar, Image, Badge, Button } from "native-base";
import React, { useEffect, useState } from "react";
import { colors } from "../constant/themes";
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileScreen from "../screens/Profile/Profile.screen";
import imagePath from "../constant/imagePath";
import { EnergyProps } from "../@core/model/move";
import { useDispatch, useSelector } from "react-redux";
import WalletConnectProvider from "@walletconnect/web3-provider";
import { Contract, providers } from "ethers";
import { RunnMoveTokenABI } from "../constant/RunnMoveTokenABI";
import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { authActions } from "../screens/Login/authSlice";

const Header = (props) => {
    const navigation = useNavigation();
    const energyReducer: EnergyProps= useSelector((state:any) => state.move?.energy);
    const RMTokenReducer: number = useSelector((state: any) => state.auth?.currentUser?.RMToken);
    const isUpdateRMTReducer: boolean = useSelector((state: any) => state.auth?.isUpdateToken);

    const connector = useWalletConnect();
    const dispatch = useDispatch();
    const [rmToken, setRMToken] = useState();
    const fetchRMTBalance = async () => {
        try {
          const provider = new WalletConnectProvider({
            infuraId: '6507b4b41a0c450ba0fe748e96881466',
            connector: connector,
          });
          await provider.enable();
    
          const web3Provider = new providers.Web3Provider(provider);
          const signer = web3Provider.getSigner();
    
          const ercContract = new Contract(
            '0x07B5C829Db4B925dDDA85A14079553443b1857b9',
            RunnMoveTokenABI,
            signer
          );
          const res = await ercContract.functions.balanceOf(connector.accounts[0]);
        //   const res2 = await ercContract.functions.transferFrom('0x71c738B1d24368DdcE9b1Ec14C8dA57F5E079175','0x3760F0e40f261491F97999F66BCed596533660E9',999);
        //   console.log("header transfer: ", res2)
          if(res?.length > 0){
            setRMToken( res[0])  
            dispatch(authActions.updateRMToken(res[0]));
          }
        } catch (err) {
          console.log(err);
        }
      };
      useEffect(() => {
        console.log("isUpdateRMTReducer",isUpdateRMTReducer)
        if (connector.connected === true && isUpdateRMTReducer===true) {
            fetchRMTBalance();
        } else if(connector.connected === false) {
          console.log('Vui long dang nhap vi');
        }
      }, [connector.connected,isUpdateRMTReducer]);
    return (
        <View style={styles.headerContainer}>
            <View style={styles.avatarContainer} onTouchStart={()=>{navigation.navigate('profile')}}>
                <Avatar bg="amber.500" source={{
                    uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                }} ml={3} mb={0} zIndex={1} />
                {/* <Text style={styles.textKm} bold >  km</Text> */}
            </View>
            <View style={styles.walletContainer}>
                <View style={styles.tokenContainer}>
                    <View style={styles.mainToken}>
                        <Image size={6} borderRadius={100} source={imagePath.coin} alt="Coin" />
                        <Text color={colors.white} bold ml={1}>{`${RMTokenReducer}`}</Text>
                    </View>
                    <View style={styles.secondToken}>
                    <Image size={5} borderRadius={100} source={imagePath.energy} alt="Energy" />
                        <Text color={colors.white} bold ml={1}>{energyReducer.currentEnergy}</Text>
                    </View>
                </View>
                <View style={styles.notification} onTouchStart={() => navigation.navigate('budget')}>
                    <Avatar bg="lightBlue.400" source={imagePath.wallet} size={6} backgroundColor="#fff">
                        NB
                        <Avatar.Badge bg={colors.red} borderColor={colors.red} mb={5} mr={-3}/>
                    </Avatar>
                </View>
            </View>
        </View>
    )
}
export default Header;
const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.background.mainColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    avatarContainer: {
        paddingHorizontal: 0,
        marginTop:14
    },
    textKm: {
        color: colors.text.secondaryText,
        borderWidth: 1,
        borderColor: colors.boderColor,
        borderRadius: 20,
        textAlign: 'center',
        // width: "20%",
        paddingVertical: 3,
        paddingHorizontal: 5
    },
    walletContainer: {
        flexDirection:'row',
        marginTop:8
    },
    tokenContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.boderColor,
        borderRadius: 20,
        backgroundColor: colors.background.primary,
        justifyContent: 'space-around',
        paddingHorizontal: 15,
        paddingVertical: 8
    },
    mainToken: {
        flexDirection: 'row',
    },
    secondToken: {
        flexDirection: 'row',
        marginLeft: 15
    },
    notification: {
        backgroundColor:colors.background.primary,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 20,
        marginLeft:8

    }
});