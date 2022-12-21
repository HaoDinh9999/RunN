import React, { useState } from 'react';
import { View } from 'react-native';
import { Box, Text, Image, Button, Progress, AspectRatio } from 'native-base';
import { Platform } from 'react-native';
import styles from '../CardSneakersRun/CardSneakersRun.style';
import { colors } from '../../constant/themes';
import { Icon } from 'native-base';
import { ColorSpace } from 'react-native-reanimated';
// import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { PropSneaker } from '../../@core/model/sneaker';

const CardSneakerEmpty = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.shoesContainer}>
      <Box
        //   maxW="80"
        rounded="lg"
        overflow="hidden"
        //   borderColor="coolGray.200"
        borderWidth="1"
        _web={{
          shadow: 2,
          borderWidth: 0,
        }}
        backgroundColor="#2C053B"
      >
        <Box style={styles.modalBackground}>
          <AspectRatio w="100%" ratio={16 / 9} marginTop={-5}>
            <Image
              source={{
                uri: 'https://i.pinimg.com/originals/74/2c/02/742c02a5aaa6c201bd4c16bd8b915bba.png',
              }}
              alt="image"
            />
          </AspectRatio>
          <Image
            source={{
              uri: 'https://www.godinein.com/assets/frontend/default/images/empty-cart.png',
            }}
            alt="Alternate Text"
            width={200}
            height={100}
            resizeMode="contain"
            style={{marginTop:-90}}
          />
        </Box>
      </Box>
    </View>
  );
};
export default CardSneakerEmpty;
