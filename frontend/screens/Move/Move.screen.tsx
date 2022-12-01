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
import CardSneakersRun from '../../components/CardSneakersRun/CardSneakersRun';

const MoveScreen = () => {
  const navigation = useNavigation();
  const energyReducer: EnergyProps= useSelector((state:any) => state.move.energy);
//   const currentEnergy = useSelector((state:any) => state.move.energy.currentEnergy);
//    const maxEnergy = useSelector((state:any) => state.move.energy.maxEnergy);
   const dispatch = useDispatch();

     const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [isfillEnergy, setIsFillEnergy] = useState<boolean>(true);
  const [timeRefill, setTimeRefill] = useState<number>(20);

  const handleCalEnergy = (): number => {
    return Number((energyReducer.currentEnergy / energyReducer.maxEnergy) * 100);
  };
  useEffect(() => {
    startTimer(timeRefill);
    console.log("Tai sao ko phai vao day chuuuuuuuuuuuuu: ",energyReducer)
  }, [energyReducer]);
  // useEffect(() => {
  //   energyRef.current = energy;
  // });
  var timer: number;
  var countDown: any;
  function startTimer(duration) {
    console.log("Tai sao 1");
    (timer = duration), minutes, seconds;
    countDown = setInterval(function () {
      setHours(Math.floor(timer / (60 * 60)));
      setMinutes(Math.floor((timer / 60) % 60));
      setSeconds(Number(timer % 60));
      if (--timer < 0) {
        if (energyReducer.currentEnergy  >= energyReducer.maxEnergy) {
          console.log("Vao roi thi phai dung chu")
            clearInterval(countDown);
            return;
        }
        else {
          clearInterval(countDown);
          dispatch(moveActions.updateEnergy({...energyReducer,currentEnergy: energyReducer.currentEnergy + energyReducer.maxEnergy * 0.25}))
          // startTimer(timeRefill);
        }

      }
    }, 1000);
  }
  return (
    <>
      <View style={styles.container}>
        <CardSneakersRun/>
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
                _filledTrack={{ bg: colors.coin }}
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
                _filledTrack={{ bg: colors.energy }}
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
