import React, { useEffect } from 'react';
import {  FlatList } from 'react-native';
import {
  Button,
  useToast,
  Text,
  HStack,
  Center,
  Container,
  Stack,
  VStack,
  Heading,
  ScrollView,
  Image,
  View
} from 'native-base';
import ComboBoxComponent from '../../components/Combobox/Combobox';
import styles from './Market.style';
import CardItem from '../../components/CardItem/CardItem';
import { useNavigation } from '@react-navigation/native';
import colors from '../../constant/themes/colors';
import { useDispatch, useSelector } from 'react-redux';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { providers, Contract } from 'ethers';
import { RunnSneakerABI } from '../../constant/RunnSneakerABI';
import { authActions } from '../Login/authSlice';
import { PropSneaker } from '../../@core/model/sneaker';
import { mapTokenDataToSneaker, mapTokenDataToSneakerInDetail } from '../../utils/formatTokenData';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import { moveActions } from '../Move/moveSlice';
import imagePath from '../../constant/imagePath';

const MarketScreen = () => {
  const navigation = useNavigation();
  const currentUser = useSelector((state: any) => state.auth.currentUser);
  const dispatch = useDispatch();
  const connector = useWalletConnect();

//   useEffect(() => {
//     if (connector.connected === true) {
//       fetchSneakers();
//     } else {
//       console.log('Vui long dang nhap vi');
//     }
//   }, [connector.connected]);

//   const fetchSneakers = async () => {
//     try {
//       const provider = new WalletConnectProvider({
//         infuraId: '6507b4b41a0c450ba0fe748e96881466',
//         connector: connector,
//       });
//       await provider.enable();
//       const web3Provider = new providers.Web3Provider(provider);
//       const signer = web3Provider.getSigner();
//       const nftContract = new Contract(
//         '0xeeDf9047Fd589F23aE19f597628bc96cB100f30a',
//         RunnSneakerABI,
//         signer
//       );
//       const res = await nftContract.functions.tokenInfosByOwner(connector.accounts[0]);
//       const allTokensData = res[0];
//       const formattedSneakers = allTokensData?.map(async (sneakerInfo) => {
//         const { price, tokenId, saleId, seller } = sneakerInfo;
//         const tokenData = await nftContract.tokenData(tokenId);
//         return {
//           ...mapTokenDataToSneakerInDetail(tokenData),
//           id: tokenId,
//           saleId,
//           seller,
//           price,
//         };
//       });
//       const resultSneakers: PropSneaker[] = await Promise.all(formattedSneakers);
//       if (resultSneakers.length > 0) {
//         dispatch(authActions.updateCurrentUser({ ...currentUser, sneakers: resultSneakers }));
//         dispatch(moveActions.updateMaxEnergy(resultSneakers));
//       }
//     } catch (err) {
//       console.log('Err: ', err);
//     }
//   };

  const _renderItem = ({ item, index }) => {
    console.log(connector.connected);
    const lastItem = index === currentUser?.sneakers?.length -1
    return (
      <View style={{    flex:1, paddingVertical:4,paddingHorizontal:4, maxWidth: lastItem ? '50%' : '100%'}}>
        <CardItem sneaker={item as PropSneaker} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabTop}>
        <Text style={styles.textTapTop} bold fontSize="sm">
          My Sneakers
        </Text>
      </View>
      <View style={styles.filter}>
        <ComboBoxComponent
          label="Sort"
          placeholder="Sort"
          data={dataComboBox}
          borderWidth={0}
          style={{ marginLeft: -2, color: colors.white, marginTop: 1 }}
        />
        <Text fontSize="xs" color={colors.white} bold >
          Filter
        </Text>
      </View>
      {/* <ScrollView> */}
      {console.log(currentUser?.sneakers?.length >0)}
      {currentUser?.sneakers?.length >0 ? (
        
          <FlatList
            data={currentUser.sneakers}
            numColumns={2}
            renderItem={_renderItem}
          />
      ) : (
        <View style={{ width: '100%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Image
            source={imagePath.empty}
            alt="Alternate Text"
            size={220}
            resizeMode="contain"
          />
        </View>
      )}

      {/* </ScrollView> */}
    </View>
  );
};
const dataComboBox = [
  { label: 'Latest', value: 'Latest' },
  { label: 'Oldest', value: 'Oldest' },
  { label: 'Default', value: 'Default' },
];

export default MarketScreen;
