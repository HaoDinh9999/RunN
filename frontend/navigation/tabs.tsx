// import React from "react";
// import {
//     View,
//     Image,
//     TouchableOpacity,
//     Text,
//     StyleSheet
// } from "react-native";
// import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs"
// import HomeScreen from "../screens/Home/Home.screen";
// import { colors, fonts } from "../themes";

// const Tab = createBottomTabNavigator()

// const Tabs = () => {
//     return (
//         <Tab.Navigator
//         screenOptions={{
//             tabBarShowLabel: false,
//             headerShown: false,
//             tabBarStyle: {
//                 position: 'absolute',
//                 bottom:0,
//                 left:0,
//                 right:0,
//                 elevation:0,
//                 backgroundColor: colors.white,
//                 height:100,
//                 borderTopColor: "transparent",
//                 borderTopRightRadius: 50,
//                 borderTopLeftRadius: 50
//             },

//           }}
//         >
//             <Tab.Screen
//                 name="Home"
//                 component={HomeScreen}
//                 options={{
//                     tabBarIcon: ({ focused }) => (
//                         <View style= {{ alignItems: 'center',
//                         justifyContent: 'center'}} >
//                             {/* <Image
//                                 // source={icons.pizza_tab}
//                                 resizeMode="contain"
//                                 style={{
//                                     width: 30,
//                                     height: 30,
//                                     // tintColor: focused ? COLORS.primary : COLORS.black
//                                 }}
//                             /> */}
//                             <Text style={{ color: focused ? colors.primary : colors.black,
//                             ...fonts.body5
//                             }} >Home</Text>
//                         </View>
//                     )
//                 }}
//             />

//         </Tab.Navigator>
//     )
// }

// export default Tabs;

import React, { useEffect, useReducer, useRef } from 'react';
import { Pressable, StatusBar, StyleSheet, View, Text, LayoutChangeEvent } from 'react-native';
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
import { colors } from '../themes';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MoveScreen from '../screens/Move/Move.screen';
import BagScreen from '../screens/Bag/Bag.screen';
import ChallengeScreen from '../screens/Challenge/Challenge.screen';
import MarketScreen from '../screens/Market/Market.screen';
import Header from './header';

// ------------------------------------------------------------------

const Tab = createBottomTabNavigator();

const AnimatedSvg = Animated.createAnimatedComponent(Svg);

// ------------------------------------------------------------------

const Tabs = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Header/>
      <Tab.Navigator
        tabBar={(props) => <AnimatedTabBar {...props} />}
        initialRouteName="Home"
        screenOptions={{ headerShown: false, tabBarActiveTintColor: '#e91e63' }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Move"
          options={
            {
              // @ts-ignore
              //   tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('./src/assets/lottie/upload.icon.json')} style={styles.icon} />,
            }
          }
          component={MoveScreen}
        />
        <Tab.Screen
          name="Bag"
          options={
            {
              // @ts-ignore
              //   tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('./src/assets/lottie/chat.icon.json')} style={styles.icon} />,
            }
          }
          component={BagScreen}
        />
        <Tab.Screen
          name="Market"
          options={
            {
              // @ts-ignore
              //   tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={require('./src/assets/lottie/settings.icon.json')} style={styles.icon} />,
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
    backgroundColor: 'white',
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
