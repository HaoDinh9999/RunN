import React from 'react';
import { View } from 'react-native';
import { Box, Text } from 'native-base';
import { Platform } from 'react-native';
import styles from './CardItem.style';
import { colors } from '../../themes';
import { Icon } from 'native-base';
// import Ionicons from '@expo/vector-icons/Ionicons';

const CardItem = () => {
  return (
    <Box
      bg={colors.background.tabBar}
      rounded="xl"
      _text={{
        fontSize: 'md',
        fontWeight: '',
        color: 'warmGray.50',
        textAlign: 'center',
      }}
      style={{width:"50%"}}
    >
      <View style={styles.typeContainer}>
        <Text color={colors.text.primaryTitle}>{'>>'}</Text>
        <Text fontSize='sm' color={colors.text.primaryTitle} ml={2} font="bold">Runner</Text>
      </View>
    </Box>
  );
};
export default CardItem;
