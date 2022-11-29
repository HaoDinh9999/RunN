import React, { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { Text, Box, AspectRatio, Image, Progress, Button } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import styles from './Move.style';
import { colors } from '../../themes';
import imagePath from '../../constant/imagePath';
import { useDispatch, useSelector } from 'react-redux';
import { moveActions } from './moveSlice';
import { EnergyProps } from '../../@core/model/move';

const MoveScreen = () => {
  const navigation = useNavigation();
  const energyReducer: EnergyProps= useSelector((state:any) => state.move.energy);
//   const currentEnergy = useSelector((state:any) => state.move.energy.currentEnergy);
//    const maxEnergy = useSelector((state:any) => state.move.energy.maxEnergy);
   const dispatch = useDispatch();

   
  const [energy, setEnergy] = useState<number>(energyReducer.currentEnergy);
  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [isfillEnergy, setIsFillEnergy] = useState<boolean>(true);
  const [timeRefill, setTimeRefill] = useState<number>(20);
  const energyRef = useRef(energy);

  const handleCalEnergy = (): number => {
    return Number((energyReducer.currentEnergy / energyReducer.maxEnergy) * 100);
  };
  useEffect(() => {
    startTimer(timeRefill);
  }, []);
  useEffect(() => {
    energyRef.current = energy;
  });
  var timer: number;
  var countDown: any;
  function startTimer(duration) {
    (timer = duration), minutes, seconds;
    countDown = setInterval(function () {
      setHours(Math.floor(timer / (60 * 60)));
      setMinutes(Math.floor((timer / 60) % 60));
      setSeconds(Number(timer % 60));
      if (--timer < 0) {
        console.log("Timeout", energyReducer.maxEnergy)
        if (energyRef.current >= energyReducer.maxEnergy) {
            clearInterval(countDown);
            return;
        }
        else {
          clearInterval(countDown);
          console.log("Timeout2", energy)

          dispatch(moveActions.updateEnergy({...energyReducer,currentEnergy: energyRef.current}))
          startTimer(timeRefill);
        }
        setEnergy((energy) => energy + energyReducer.maxEnergy * 0.25);
        console.log('ALo energy', energyRef.current);
      }
    }, 1000);
  }
  return (
    <>
      <View style={styles.container}>
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
        <View style={styles.containerBody}>
          <Text
            fontSize="2xl"
            bold
            color={colors.white}
            style={{ justifyContent: 'center', textAlign: 'center' }}
          >
            Your earning
          </Text>
          <View style={styles.mainTokenContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text fontSize={'sm'} bold color={colors.white}>
                1000
                <Text bold color={colors.gray}>
                  /1000 FIT
                </Text>
              </Text>
            </View>
            <Box w="100%" marginTop={1}>
              <Progress
                value={45}
                bg={colors.background.progress}
                _filledTrack={{ bg: colors.progress }}
              />
            </Box>
          </View>
          <View style={styles.energyContainer}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}
            >
              <Image size={5} borderRadius={100} source={imagePath.energy} alt="Energy" />
              <Text fontSize={'sm'} bold color={colors.white}>
                {energyReducer.currentEnergy}{' '}
                <Text bold color={colors.gray}>
                  / {energyReducer.maxEnergy}.0
                </Text>
              </Text>
            </View>
            <Box w="100%" marginTop={1}>
              <Progress
                value={handleCalEnergy()}
                bg={colors.background.progress}
                _filledTrack={{ bg: colors.primary }}
              />
              <View
                style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}
              >
                <Text fontSize={'sm'} bold color={colors.gray}>
                  Next refill in {'  '}
                  <Text bold color={colors.white}>
                    {hours < 10 ? '0' + hours : hours}h : {minutes < 10 ? '0' + minutes : minutes}m
                    : {seconds < 10 ? '0' + seconds : seconds}s{' '}
                  </Text>
                </Text>
              </View>
            </Box>
          </View>
        </View>
        <View style={{ marginTop: 30, paddingHorizontal: 80 }}>
          <Button
            style={styles.button}
            onPress={() =>
              navigation.navigate('startRunning', {
                start: true,
                minutes: 0,
                seconds: 120,
                limitSpeed: 100,
              })
            }
          >
            <Text color={colors.white} bold fontSize="sm">
              START
            </Text>
          </Button>
        </View>
      </View>
    </>
  );
};
export default MoveScreen;
