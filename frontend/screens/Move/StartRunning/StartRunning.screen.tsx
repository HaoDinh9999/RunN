import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { View, Text, Image } from 'native-base';
import MapView, { MarkerAnimated, AnimatedRegion, Polyline } from 'react-native-maps';
import { GOOGLE_MAP_KEY } from '../../../constant/googleMapKey';
import MapViewDirections from 'react-native-maps-directions';
import { locationPermission, getCurrentLocation } from '../../../hooks/helperFunction';
import Geolocation from 'react-native-geolocation-service';
import { getDistance } from 'geolib';
import { CurrentLocation } from '../../../@core/model/location';
import imagePath from '../../../constant/imagePath';
import { Avatar } from 'native-base';
import styles from './StartRunning.style';
import { colors } from '../../../themes';
import { useNavigation } from '@react-navigation/native';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0622;
const LONGITUDE_DELTA = 0.0121;

const StartRunningScreen = (props) => {
  const navigation = useNavigation();
  const [arrDistances, setArrDistances] = useState([]);
  const [speed, setSpeed] = useState(0);
  const [totalDistance, setTotalDistance] = useState<number>(0);
  const [start, setStart] = useState<boolean>(props.route.params?.start);
  const [seconds, setSeconds] = useState<number>(props.route.params?.seconds);
  const [minutes, setMinutes] = useState<number>(props.route.params?.minutes);
  const [limitSpeed, setLimitSpeed] = useState<number>(props.route.params?.limitSpeed);
  const [timeout, setTimeout] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const [state, setState] = useState({
    curLoc: {
      latitude: 30.7046,
      longitude: 77.1025,
    },
    destinationCords: {},
    isLoading: false,
    coordinate: new AnimatedRegion({
      latitude: 30.7046,
      longitude: 77.1025,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
    time: 0,
    distance: 0,
    heading: 0,
  });

  const { curLoc, time, distance, destinationCords, isLoading, coordinate, heading } = state;
  const updateState = (data) => setState((state) => ({ ...state, ...data }));

  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission();
    if (locPermissionDenied) {
      const result: CurrentLocation = await getCurrentLocation();
      console.log('get live location after 3 second', heading);
      animate(result?.latitude, result?.longitude);
      updateState({
        heading: heading,
        curLoc: { latitude: result?.latitude, longitude: result?.longitude },
        coordinate: new AnimatedRegion({
          latitude: result?.latitude,
          longitude: result?.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }),
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect (() => {
    startTimer(minutes * 60 + seconds);
  },[]);

  const fetchValue = (data) => {
    updateState({
      destinationCords: {
        latitude: data.destinationCords.latitude,
        longitude: data.destinationCords.longitude,
      },
    });
  };

  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 500);
      }
    } else {
      // coordinate.timing(newCoordinate).start();
    }
  };

  // This function will get your current location
  var idGeo;
  const getlocation = (enable:boolean) => {
    if (enable == true) {
      idGeo = Geolocation.watchPosition(showLoc);
      console.log("vo chua1",start)

    }
  };

  // This function will show your current location
  const showLoc = (pos) => {
    // if(minutes==0 && seconds==0) {console.log("Dung lai"); return;}
    // else{
    // console.log("Beforeeeee",minutes +"--" + seconds)
    // console.log("POSSsSS:", pos);
    console.log("vo chua24232222222",start)

    setSpeed(pos?.coords?.speed.toFixed(2));

    if (pos?.coords.speed < limitSpeed) {

      if (start) {

        if (
          parseFloat(arrDistances[arrDistances.length - 1]?.latitude) !=
          parseFloat(pos?.coords?.latitude) && start
        ) {

          arrDistances?.length > 1 &&
            setTotalDistance(
              Number(
                (
                  totalDistance +
                  getDistance(arrDistances[arrDistances?.length - 1], {
                    latitude: pos?.coords?.latitude,
                    longitude: pos?.coords?.longitude,
                  }) /
                    1000
                ).toFixed(2)
              )
            );
          arrDistances?.length > 1 &&
            console.log(
              'Distance: ',
              getDistance(arrDistances[arrDistances?.length - 1], {
                latitude: pos?.coords?.latitude,
                longitude: pos?.coords?.longitude,
              }) / 1000
            );
          arrDistances.push({ latitude: pos?.coords?.latitude, longitude: pos?.coords?.longitude });
        }
      }
    } else {
      console.log('Eo tinh khoang cach nha con');
    }   
    Geolocation.clearWatch(idGeo);

    console.log('arrDistances: ', arrDistances.length);

    // }
  };
  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: curLoc?.latitude,
      longitude: curLoc?.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    });
  };
  const onPressStart = () => {
    setStart((start) => (start = true));
    startTimer(minutes * 60 + seconds);
  };
  var timer: number;
  function startTimer(duration) {
    (timer = duration), minutes, seconds;
    var countDown = setInterval(function () {
      setMinutes(Math.floor(Number(timer / 60)));
      setSeconds(Number(timer % 60));
      if (--timer < 0) {
        clearInterval(countDown);
        setTimeout(true);
      }
    }, 1000);
  }
  const checkTimeOut = () => {
    if (start) {
      console.log('minutes-- ' + minutes + '-seconds -- ' + seconds);
      if (timeout) {
        console.log('Dung lai cho bo may, lam on');
        getlocation(false);
        setStart(false);
        setSpeed(0);
      } else {
        console.log('dang chay bo');
        getlocation(true);
      }
    }
  };

  return (
    <View style={styles.container}>
      {      
        checkTimeOut()
      }
      <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center',padding:12}}>
      <Image size={5} borderRadius={100} source={imagePath.running_white} alt="running man" resizeMode="stretch"/>
        <Text bold fontSize="xl" color={colors.white} marginLeft={2} >Walking </Text>
      </View>
      {showMap ? (
        <>
          <View style={{ flex: 1 }}>
            <MapView
              ref={mapRef}
              // showsUserLocation={true}
              showsMyLocationButton={false}
              zoomEnabled={true}
              style={styles.map}
              initialRegion={{
                ...curLoc,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
            >
              <MarkerAnimated ref={markerRef} coordinate={coordinate}>
                <Image
                  source={imagePath.running}
                  style={{
                    width: 110,
                    height: 30,
                    transform: [{ rotate: `${heading + 60}deg` }],
                    marginTop: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  resizeMode="contain"
                  alt="Alternate Text"
                />
              </MarkerAnimated>

              <Polyline
                coordinates={[...arrDistances]}
                strokeColor={colors.primary} // fallback for when `strokeColors` is not supported by the map-provider
                strokeColors={[colors.primary]}
                strokeWidth={4}
              />
            </MapView>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top:  8,
                left: 8,
                zIndex: 10,
              }}
              onPress={() => {
                setShowMap(false);
              }}
            >
              <Image source={imagePath.close} size={8}  borderRadius={20} style={{padding:5}}  alt="Alternate Text" />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
              }}
              onPress={onCenter}
            >
              <Image source={imagePath.greenIndicator}  alt="Alternate Text" />
            </TouchableOpacity>
          </View>
          <View style={{ padding: 12, marginTop: 5 }}>
            <View style={styles.bottomCard}>
              <View style={styles.propertyContainer}>
                <View style={styles.properyCricle}>
                  <Image
                    size={5}
                    borderRadius={100}
                    source={imagePath.running}
                    alt="distance"
                  />
                  <Text color={colors.white} bold style={{ marginTop: 5, marginLeft: -2 }}>
                    {totalDistance}km
                  </Text>
                </View>
                <View style={styles.properyCricle}>
                  <Image
                    size={5}
                    borderRadius={100}
                    source={imagePath.speed}
                    alt="Speed"
                  />
                  <Text color={colors.white} bold style={{ marginTop: 5, marginLeft: -2 }}>
                    {speed ? speed : "0.0"}
                  </Text>
                </View>
                <View style={styles.properyCricle}>
                  <Image
                    size={5}
                    borderRadius={100}
                    source={imagePath.alarmClock}
                    alt="Alarm clock"
                  />
                  <Text color={colors.white} bold style={{ marginTop: 5 }}>
                    {minutes < 10 ? '0' + minutes : minutes} :{' '}
                    {seconds < 10 ? '0' + seconds : seconds}{' '}
                  </Text>
                </View>
              </View>
              {/* <TouchableOpacity onPress={onPressStart} style={styles.inpuStyle}>
              <Text>Start</Text>
            </TouchableOpacity> */}
              {/* <TouchableOpacity
                    onPress={onPressLocation}
                    style={styles.inpuStyle}
                >
                    <Text>Choose your location</Text>
                </TouchableOpacity> */}
            </View>
          </View>
        </>
      ) : (
        <View style={styles.bodyMainContainer}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text bold fontSize={70} color={colors.white}>
              {totalDistance === 0 ? '00.00' : totalDistance}
            </Text>
            <Text fontSize="sm" bold color={colors.gray} marginTop={-4}>
              km
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-around',
              marginTop: 15,
              paddingHorizontal: 50,
            }}
          >
            {/* <View style={styles.properyCricle}>
              <Image
                size={5}
                borderRadius={100}
                source={{
                  uri: 'https://wallpaperaccess.com/full/317501.jpg',
                }}
                alt="Alternate Text"
              />
              <Text color={colors.white} bold style={{ marginTop: 5, marginLeft: -2 }}>
                {totalDistance}km
              </Text>
            </View> */}
            <View style={styles.properyCricle}>
              <Image
                size={5}
                borderRadius={100}
                source={imagePath.speed}
                alt="Speed"
              />
              <Text color={colors.white} bold style={{ marginTop: 5, marginLeft: -2 }}>
                {speed ? speed : "0.0"}
              </Text>
            </View>
            <View style={styles.properyCricle}>
              <Image
                size={5}
                borderRadius={100}
                source={imagePath.alarmClock}
                alt="Alarm clock"
              />
              {start ? (
                <Text color={colors.white} bold style={{ marginTop: 5 }}>
                  {minutes < 10 ? '0' + minutes : minutes} :{' '}
                  {seconds < 10 ? '0' + seconds : seconds}{' '}
                </Text>
              ) : (
                <Text color={colors.white} bold style={{ marginTop: 5 }}>
                  00 : 00
                </Text>
              )}
            </View>
          </View>
        </View>
      )}
      {!showMap && (
        <View style={{ padding: 12 }}>
          <View style={styles.bottomCard}>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
              <View style={styles.circleButton} onTouchStart={() => setShowMap(true)}>
                <Image
                  size={10}
                  borderRadius={100}
                  source={imagePath.map}
                  alt="Map"
                />
              </View>
              <View style={styles.circleButton} onTouchStart={()=>navigation.goBack()}>
              <Image
                  size={10}
                  borderRadius={100}
                  source={imagePath.closeWhite}

                  alt="Close out"
                />
              </View>
              <View style={styles.circleButton}>
                <Image
                  size={10}
                  borderRadius={100}
                  source={imagePath.help}

                  alt="Alternate Text"
                />
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default StartRunningScreen;
