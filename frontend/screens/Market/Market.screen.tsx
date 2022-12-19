import React, { useEffect } from "react";
import { View, FlatList } from "react-native";
import { Button, useToast, Text, HStack, Center, Container, Stack, VStack, Heading, ScrollView } from 'native-base';
import ComboBoxComponent from "../../components/Combobox/Combobox";
import styles from './Market.style';
import CardItem from "../../components/CardItem/CardItem";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constant/themes/colors";
import { useDispatch, useSelector } from "react-redux";
import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers, Contract } from "ethers";
import { RunnSneakerABI } from "../../constant/RunnSneakerABI";
import { authActions } from "../Login/authSlice";
import { PropSneaker } from "../../@core/model/sneaker";
import { mapTokenDataToSneaker, mapTokenDataToSneakerInDetail } from "../../utils/formatTokenData";

const MarketScreen = () => {
    const navigation = useNavigation();
    const addressReducer: string = useSelector((state: any) => state.auth.currentUser.addressWallet);
    const signerReducer: any = useSelector((state: any) => state.auth.currentUser.signer);
    const currentUser = useSelector((state:any) => state.auth.currentUser)
    const dispatch = useDispatch();


    useEffect(() => {
        if(addressReducer){
            fetchSneakers();
        }
        else{
            console.log("Vui long dang nhap vi");
        }
    },[addressReducer]);

    const fetchSneakers = async () => {
        try {
          const nftContract = new Contract(
            '0xeeDf9047Fd589F23aE19f597628bc96cB100f30a',
            RunnSneakerABI,
            signerReducer          
        );
          const res = await nftContract.functions.tokenInfosByOwner(addressReducer);
          const allTokensData = res[0];
           const formattedSneakers = allTokensData?.map(async(sneakerInfo) => {
            const { price, tokenId, saleId, seller } = sneakerInfo;
            const  tokenData  = await nftContract.tokenData(tokenId);
            return {
                ...mapTokenDataToSneakerInDetail(tokenData),
                id: tokenId,
                saleId,
                seller,
                price,
              };

            });
            const resultSneakers = await Promise.all(formattedSneakers);          
          if(resultSneakers.length > 0)
            dispatch(authActions.updateCurrentUser({...currentUser,sneakers:resultSneakers}))
    
        } catch (err) {
          console.log("Err: ",err);
        }
      };

    const _renderItem = ({ item }) => {
        console.log(item)
        return (
            <View style={styles.spacing}>
                <CardItem sneaker = {item as PropSneaker}/>

            </View>
        );
    }



    return (

        <View style={styles.container}>
            <View style={styles.tabTop}>
                <Text style={styles.textTapTop} bold fontSize="sm">Sneakers</Text>
            </View>
            <View style={styles.filter}>
                <ComboBoxComponent label="Sort Price" placeholder="Sort Price" data={dataComboBox} borderWidth={0} style={{ marginLeft: -2, color: colors.white, marginTop: 1 }} />
                <Text fontSize="xs" color={colors.white} bold onPress={() => navigation.navigate('filter')}>Filter</Text>
            </View>
            {/* <ScrollView> */}
            <FlatList data={currentUser.sneakers} numColumns={2} renderItem={_renderItem} style={{flex: 1}} />

            {/* </ScrollView> */}



        </View>
    )
}
const dataComboBox = [
    { label: "Lowest Price", value: "Lowest" },
    { label: "Highest Price", value: "Highest" },
    { label: "Lastest Price", value: "Lastest" },
];

export default MarketScreen;
