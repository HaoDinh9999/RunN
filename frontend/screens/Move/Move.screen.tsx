import React, { useEffect, useRef, useState } from 'react';
import { Text, Box, AspectRatio, Image, Progress, Button, View } from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import styles from './Move.style';
import { colors } from '../../constant/themes';
import imagePath from '../../constant/imagePath';
import { useDispatch, useSelector } from 'react-redux';
import { moveActions, selectEnergy } from './moveSlice';
import { EnergyProps } from '../../@core/model/move';
import CardSneakersRun from '../../components/CardSneakersRun/CardSneakersRun';
import Slick from 'react-native-slick';
import { PropSneaker } from '../../@core/model/sneaker';
import CardSneakerEmpty from '../../components/CardSneakerEmpty/CardSneakerEmpty.screen';

const MoveScreen = () => {
  const navigation = useNavigation();
  let energyReducer: EnergyProps = useSelector((state: any) => state.move.energy);
  let timingReducer: boolean = useSelector((state: any) => state.move.timing);
  let sneakerReducers: PropSneaker[] = useSelector(
    (state: any) => state.auth.currentUser?.sneakers
  );
  const RMTokenReducer: number = useSelector((state: any) => state.auth?.currentUser?.RMToken);

  let movingReducer : any = useSelector((state:any) => state.move);

  const dispatch = useDispatch();

  const [seconds, setSeconds] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  const [isfillEnergy, setIsFillEnergy] = useState<boolean>(true);
  const [timeRefill, setTimeRefill] = useState<number>(180);
  const [timeCount, setTimeCount] = useState<number>(0);
  const [timeout, setTimeout] = useState<boolean>(false);
  const [sneaker,setSneaker] = useState<PropSneaker>();

  var timer: number;

  const handleCalEnergy = (): number => {
    return Number((energyReducer?.currentEnergy / energyReducer?.maxEnergy) * 100);
  };

  useEffect(() => {
    if(energyReducer?.currentEnergy < energyReducer?.maxEnergy && timingReducer === false)
    dispatch(moveActions.updateTiming(true));

  },[movingReducer])

  useEffect(() => {
    if (energyReducer?.currentEnergy < energyReducer?.maxEnergy) {
      dispatch(moveActions.updateTiming(true));
    } else if ((energyReducer?.currentEnergy === energyReducer.maxEnergy)) {
      dispatch(moveActions.updateTiming(false));
    }
    if (timingReducer === true && energyReducer?.currentEnergy < energyReducer?.maxEnergy)
      startTimer(timeRefill);
  }, [timingReducer]);

  useEffect(() => {
    if (timeout === true) {
      handleTimeOut();
    }
  }, [timeout]);

  const handleTimeOut = () => {
    console.log('handleTimeout', energyReducer);
    dispatch(moveActions.updateTiming(false));
    if (energyReducer?.currentEnergy >= energyReducer?.maxEnergy) {
      console.log('Vao roi thi phai dung chu');
      dispatch(moveActions.updateTiming(false));
      return;
    } else {
      dispatch(
        moveActions.updateCurrentEnergy(
          energyReducer?.currentEnergy + energyReducer?.maxEnergy * 0.25
        )
      );
      if (energyReducer?.currentEnergy + energyReducer?.maxEnergy * 0.25 < energyReducer.maxEnergy)
        dispatch(moveActions.updateTiming(true));
      else dispatch(moveActions.updateTiming(false));
    }
    setTimeout(false);
  };
  var countDown: any;
  function startTimer(duration) {
    console.log('Tai sao 1');
    (timer = duration), minutes, seconds;
    countDown = setInterval(function () {
      setHours(Math.floor(timer / (60 * 60)));
      setMinutes(Math.floor((timer / 60) % 60));
      setSeconds(Number(timer % 60));
      setTimeout(false);
      if (--timer < 0) {
        // console.log("Result", energyReducer);
        dispatch(moveActions.updateTiming(false));
        setTimeout(true);
        clearInterval(countDown);
      }
    }, 1000);
    return () => clearInterval(countDown);
  }
  let chooseSneaker ;
  return (
    <>
      <View style={styles.container}>
        {sneakerReducers?.length > 0 ? (
          <Slick style={styles.wrapper} showsButtons loop={false}>
            {sneakerReducers?.map((sneaker: PropSneaker) => {
              chooseSneaker=sneaker;
              return (
                <View style={styles.slide1}>
                  <CardSneakersRun sneaker={sneaker}/>
                </View>
              );
            })}
          </Slick>
        ): (
          <CardSneakerEmpty/>
        )}

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
              {`${RMTokenReducer}`}  
                <Text bold color={colors.gray}>
                   {'-'}RMT
                </Text>
              </Text>
            </View>
            <Box w="100%" marginTop={1}>
              <Progress
                value={100}
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
                {energyReducer?.currentEnergy}{' '}
                <Text bold color={colors.gray}>
                  / {energyReducer?.maxEnergy}.0
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
        <View style={{ marginTop: 30,marginBottom:30, paddingHorizontal: 80 }}>
          <Button
            style={styles.button}
            onPress={() =>
              energyReducer?.currentEnergy >= 1 &&
              navigation.navigate('startRunning', {
                start: true,
                minutes: 0,
                seconds: 120,
                limitSpeed: 100,
                chooseSneaker
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
