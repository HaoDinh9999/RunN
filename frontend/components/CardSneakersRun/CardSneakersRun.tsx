import React, { useState } from 'react';
import { View } from 'react-native';
import { Box, Text, Image, Button, Progress, AspectRatio } from 'native-base';
import { Platform } from 'react-native';
import styles from './CardSneakersRun.style';
import { colors } from '../../constant/themes';
import { Icon } from 'native-base';
import { ColorSpace } from 'react-native-reanimated';
// import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { PropSneaker } from '../../@core/model/sneaker';
import imagePath from '../../constant/imagePath';

const CardSneakersRun = (props) => {
  const navigation = useNavigation();
  const [sneaker, setSneaker] = useState<PropSneaker>(props?.sneaker);
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
              uri: sneaker?.UrlImage,
            }}
            alt="Alternate Text"
            width={200}
            height={100}
            resizeMode="contain"
            style={{ marginTop: -90 }}
          />

          <View style={styles.shoesBackground}>
            <Text color="#C7D5F7" bold style={{ fontSize: 15, textAlign: 'center' }}>
              #{`${sneaker?.id}`}
            </Text>
            <View style={styles.barShoes}>
              <Text
                color="#2C053B"
                bold
                style={{
                  width: '33.33%',
                  textAlign: 'center',
                  backgroundColor: '#CFDDFF',
                  borderBottomLeftRadius: 20,
                  padding: 1.4
                }}
              >
                LV {`${sneaker?.Level}`}
              </Text>
              <Text
                color="#C7D5F7"
                bold
                fontSize={15}
                style={{ width: '33.33%', textAlign: 'center', borderRightWidth: 1 }}
              >
                {'>> '} {sneaker?.Type}
              </Text>

              {/* <Text
                  color="#fff"
                  style={{
                    width: '33.33%',
                    textAlign: 'center',
                    backgroundColor: colors.primary,
                    borderTopRightRadius: 20,
                    alignItems:'center',
                    justifyContent: 'center',
                    borderColor:colors.primary
                  }}
                  bold
                >
                  {sneaker?.Condition} / 100
                </Text> */}
              <Box w="33.33%">

                <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center', marginBottom:-23, zIndex:3}}>

                  <Image size={5} borderRadius={100} source={imagePath.protect} alt="Condition" />
                  <Text
                    color={colors.white}
                    fontWeight="bold"
                    fontSize={14}
                    style={{
                      textAlign: 'center',
                      marginLeft: 5
                    }}
                  >
                    {sneaker.Condition} <Text color={"#B2B8BF"} fontWeight="bold" fontSize={14}>/ 100</Text>
                  </Text>
                </View>
                <Progress
                  value={sneaker?.Condition}
                  bg={colors.background.progress}
                  _filledTrack={{ bg: colors.primary, borderRadius: 0 }}
                  size="2xl"
                  style={{
                    borderRadius: 0, borderTopRightRadius: 25
                  }}
                >

                </Progress>
              </Box>

            </View>
          </View>
        </Box>
      </Box>
    </View>
  );
};
export default CardSneakersRun;
