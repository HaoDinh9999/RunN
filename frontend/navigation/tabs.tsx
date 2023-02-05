import React, { useEffect, useReducer, useRef, useState } from 'react';
import { Pressable, StatusBar, StyleSheet, LayoutChangeEvent } from 'react-native';
// navigation
import { NavigationContainer } from '@react-navigation/native';
import {
  BottomTabBarProps,
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
// svg
import Svg, { Path } from 'react-native-svg';
// reanimated
import Animated, { useAnimatedStyle, withTiming, useDerivedValue } from 'react-native-reanimated';
import HomeScreen from '../screens/Home/Home.screen';
// lottie
// import Lottie from 'lottie-react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { colors } from '../constant/themes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MoveScreen from '../screens/Move/Move.screen';
import BagScreen from '../screens/Bag/Bag.screen';
import ChallengeScreen from '../screens/Challenge/Challenge.screen';
import MarketScreen from '../screens/Market/Market.screen';
import Header from './header';
import imagePath from '../constant/imagePath';
import { Button, Image, Modal, View, Text } from 'native-base';
import { useWalletConnect } from '@walletconnect/react-native-dapp';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { Contract, providers } from 'ethers';
import { RunnSneakerABI } from '../constant/RunnSneakerABI';
import { mapTokenDataToSneakerInDetail } from '../utils/formatTokenData';
import { PropSneaker } from '../@core/model/sneaker';
import { authActions } from '../screens/Login/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { moveActions } from '../screens/Move/moveSlice';
import { RunnMoveTokenABI } from '../constant/RunnMoveTokenABI';

// ------------------------------------------------------------------

const Tab = createBottomTabNavigator();

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

// ------------------------------------------------------------------

const Tabs = () => {
  const connector = useWalletConnect();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.auth.currentUser);
  const [isShowModal,setIsShowModal] = useState(false);
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
      
      const res = await nftContract.functions.tokenInfosByOwner(connector.accounts[0]);
      const allTokensData = res[0];
      const formattedSneakers = allTokensData?.map(async (sneakerInfo) => {
        const { price, tokenId, saleId, seller } = sneakerInfo;
        const tokenData = await nftContract.tokenData(tokenId);
        return {
          ...mapTokenDataToSneakerInDetail(tokenData),
          id: tokenId,
          saleId,
          seller,
          price,
        };
      });
      const resultSneakers: PropSneaker[] = await Promise.all(formattedSneakers);
      if (resultSneakers.length > 0) {
        dispatch(authActions.updateSneakers(resultSneakers ));
        dispatch(moveActions.updateMaxEnergy(resultSneakers));
      }
    } catch (err) {
      console.log('Err: ', err);
    }
  };

  useEffect(() => {
    if (connector.connected === true) {
      fetchSneakers();
    } else {
      setIsShowModal(true)
      console.log('Vui long dang nhap vi');
    }
  }, [connector.connected]);
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Header/>
      <Modal isOpen={isShowModal} onClose={() => setIsShowModal(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header style={{ justifyContent: 'center', alignItems: 'center' , color:'#f99'}}>
            Warning
          </Modal.Header>
          <Modal.Body>
              <Text color={colors.black}  fontSize="sm" style={{ paddingHorizontal: 15, textAlign:'center', color:'red' }}>
                Please connect your wallet
              </Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Tab.Navigator
        tabBar={(props) => <AnimatedTabBar {...props} />}
        initialRouteName="Move"
        screenOptions={{ headerShown: false, tabBarActiveTintColor: '#e91e63' }}
      >
        {/* <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        /> */}

        <Tab.Screen
          name="Move"
          options={
            {
              // @ts-ignore
                // tabBarIcon: ({ ref }) => <Image ref={ref} loop={false} source={imagePath.runningWhite} style={styles.icon} />,
                tabBarIcon: ({ color, size }) => (
                  <Image source={imagePath.runningWhite}  size={7} alt="move"/>
                ),
            }
          }
          component={MoveScreen}
        />
        {/* <Tab.Screen
          name="Bag"
          options={
            {
              // @ts-ignore
              //   tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('./src/assets/lottie/chat.icon.json')} style={styles.icon} />,
            }
          }
          component={BagScreen}
        /> */}
        <Tab.Screen
          name="Market"
          options={
            {
              // @ts-ignore
              //   tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('./src/assets/lottie/settings.icon.json')} style={styles.icon} />,
              tabBarIcon: ({ color, size }) => (
                <Image source={imagePath.sneakersWhite}  size={7} alt="move"/>
              ),
            }
          }
          component={MarketScreen}
        />
      </Tab.Navigator>
    </>
  );
};

// ------------------------------------------------------------------

const PlaceholderScreen = () => {
  return <View style={{ flex: 1, backgroundColor: '#604AE6' }} />;
};

// ------------------------------------------------------------------

const AnimatedTabBar = ({
  state: { index: activeIndex, routes },
  navigation,
  descriptors,
}: BottomTabBarProps) => {
  const { bottom } = useSafeAreaInsets();

  // get information about the components position on the screen -----

  const reducer = (state: any, action: { x: number; index: number }) => {
    // Add the new value to the state
    return [...state, { x: action.x, index: action.index }];
  };

  const [layout, dispatch] = useReducer(reducer, []);
  console.log(layout);

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({ x: event.nativeEvent.layout.x, index });
  };

  // animations ------------------------------------------------------

  const xOffset = useDerivedValue(() => {
    // Our code hasn't finished rendering yet, so we can't use the layout values
    if (layout.length !== routes.length) return 0;
    // We can use the layout values
    // Copy layout to avoid errors between different threads
    // We subtract 25 so the active background is centered behind our TabBar Components
    // 20 pixels is the width of the left part of the svg (the quarter circle outwards)
    // 5 pixels come from the little gap between the active background and the circle of the TabBar Components
    return [...layout].find(({ index }) => index === activeIndex)!.x - 25;
    // Calculate the offset new if the activeIndex changes (e.g. when a new tab is selected)
    // or the layout changes (e.g. when the components haven't finished rendering yet)
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      // translateX to the calculated offset with a smooth transition
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
    };
  });

  return (
    <View style={[styles.tabBar, { paddingBottom: bottom }]}>
      <AnimatedSvg
        width={110}
        height={60}
        viewBox="0 0 110 60"
        style={[styles.activeBackground, animatedStyles]}
      >
        <Path
          fill={colors.background.mainColor}
          d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
        />
      </AnimatedSvg>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const { options } = descriptors[route.key];

          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              onLayout={(e) => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
};

// ------------------------------------------------------------------

type TabBarComponentProps = {
  active?: boolean;
  options: BottomTabNavigationOptions;
  onLayout: (e: LayoutChangeEvent) => void;
  onPress: () => void;
};

const TabBarComponent = ({ active, options, onLayout, onPress }: TabBarComponentProps) => {
  // handle lottie animation -----------------------------------------
  const ref = useRef(null);

  useEffect(() => {
    if (active && ref?.current) {
      // @ts-ignore
      ref.current.play();
    }
  }, [active]);

  // animations ------------------------------------------------------

  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, { duration: 250 }),
        },
      ],
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, { duration: 250 }),
    };
  });

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
      <Animated.View style={[styles.componentCircle, animatedComponentCircleStyles]} />
      <Animated.View style={[styles.iconContainer, animatedIconContainerStyles]}>
        {/* @ts-ignore */}
        {options.tabBarIcon ? options.tabBarIcon({ ref }) : <Text>?</Text>}
      </Animated.View>
    </Pressable>
  );
};

// ------------------------------------------------------------------

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.background.tabBar,
  },
  activeBackground: {
    position: 'absolute',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  component: {
    height: 60,
    width: 60,
    marginTop: -5,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: colors.background.mainColor,
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    height: 36,
    width: 36,
  },
});

export default Tabs;
