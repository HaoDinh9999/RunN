import React from 'react';
import { View } from 'react-native';
import styles from './DetailProduct.style';
import { Text, Box, AspectRatio, Image, Progress } from 'native-base';
import Header from '../../navigation/header';
import { colors } from '../../themes';
const DetailProductScreen = () => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.bodyContainer}>
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
                uri: 'https://d1mjtvp3d1g20r.cloudfront.net/2022/04/28122922/Asics-3-colour.png',
              }}
              alt="Alternate Text"
              width={200}
              height={100}
              resizeMode="contain"
              style={{ marginTop: -90 }}
            />

            <View style={styles.shoesBackground}>
              <Text color="#C7D5F7" bold style={{ fontSize: 14, textAlign: 'center' }}>
                {'#923478729'}
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
                  }}
                >
                  LV 5
                </Text>
                <Text
                  color="#C7D5F7"
                  bold
                  style={{ width: '33.33%', textAlign: 'center', borderRightWidth: 1 }}
                >
                  {'>> Runner'}
                </Text>
                <Text
                  color="#2C053B"
                  style={{
                    width: '33.33%',
                    textAlign: 'center',
                    backgroundColor: '#CFDDFF',
                    borderTopRightRadius: 20,
                  }}
                >
                  100 / 100
                </Text>
              </View>
            </View>
          </Box>
        </Box>
      </View>
      <View style={styles.lifeTime}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text bold color={colors.white}>
            Lifetime
          </Text>
          <Text fontSize={'lg'} bold color={colors.white}>
            1000
            <Text bold color="#CFDDFF">
              /1000
            </Text>
          </Text>
        </View>
        <Box w="100%" marginTop={1}>
          <Progress
            value={45} bg={colors.background.progress} _filledTrack={{ bg: colors.progress,}}
          />
        </Box>
      </View>
      <View style={styles.mint}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text bold color={colors.white}>
            Mint 2/7
          </Text>
        </View>
        <Box w="100%" marginTop={1}>
          <Progress
            value={15} bg={colors.background.progress} _filledTrack={{ bg: "#CFDDFF",}}
          />
        </Box>
      </View>
      <Text fontSize="lg" bold color={colors.white} style={styles.mint}>Attribute</Text>
    </View>
  );
};
export default DetailProductScreen;
