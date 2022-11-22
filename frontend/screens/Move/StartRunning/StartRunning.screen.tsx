import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Dimensions, Platform, PermissionsAndroid } from 'react-native';
import { View, Text, Image } from 'native-base'
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

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.0622;
const LONGITUDE_DELTA = 0.0121;

const StartRunningScreen = ({ navigation }) => {
  const [arrDistances, setArrDistances] = useState([]);
  const [speed, setSpeed] = useState();
  const [totalDistance, setTotalDistance] = useState(0);
  const [start, setStart] = useState(false);
  const [seconds, setSeconds] = useState(90);
  const [minutes, setMinutes] = useState(0);
  const [limitSpeed, setLimitSpeed] = useState(40);
  const mapRef = useRef(null)
  const markerRef = useRef(null)

  const [state, setState] = useState(
    {
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
        longitudeDelta: LONGITUDE_DELTA
      }),
      time: 0,
      distance: 0,
      heading: 0

    }
  )

  const { curLoc, time, distance, destinationCords, isLoading, coordinate, heading } = state
  const updateState = (data) => setState((state) => ({ ...state, ...data }));


  // async function requestLocationPermission() {
  //     try {
  //         const granted = await PermissionsAndroid.request(
  //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  //             {
  //                 'title': 'Location Permission3',
  //                 'message': 'This App needs access to your location ' +
  //                     'so we can know where you are.'
  //             }
  //         )
  //         if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //             console.log("You can use locations2 ")
  //         } else {
  //             console.log("Location permission denied1")
  //         }
  //     } catch (err) {
  //         console.warn(err)
  //     }
  // }
  const getLiveLocation = async () => {
    const locPermissionDenied = await locationPermission()
    if (locPermissionDenied) {
      const result: CurrentLocation = await getCurrentLocation();
      console.log("get live location after 3 second", heading);
      animate(result?.latitude, result?.longitude);
      updateState({
        heading: heading,
        curLoc: { latitude: result?.latitude, longitude: result?.longitude },
        coordinate: new AnimatedRegion({
          latitude: result?.latitude,
          longitude: result?.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        })
      })
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      getLiveLocation();
    }, 3000);
    return () => clearInterval(interval)
  }, [])

  const onPressLocation = () => {
    navigation.navigate('chooseLocation', { getCordinates: fetchValue })
  }
  const fetchValue = (data) => {
    console.log("this is data", data)
    updateState({
      destinationCords: {
        latitude: data.destinationCords.latitude,
        longitude: data.destinationCords.longitude,
      }
    })
  }

  const animate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == 'android') {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 500);
      }
    } else {
      // coordinate.timing(newCoordinate).start();
    }
  }

  // This function will get your current location
  var idGeo;
  const getlocation = (enable) => {
    console.log("enable", enable === true)
    if (enable == true) {
    idGeo = Geolocation.watchPosition(showLoc);
    }
  }

  // This function will show your current location
  const showLoc = (pos) => {
    // if(minutes==0 && seconds==0) {console.log("Dung lai"); return;}
    // else{
    // console.log("Beforeeeee",minutes +"--" + seconds)
    // console.log("POSSsSS:", pos);
    setSpeed(pos?.coords?.speed.toFixed(2));
    if (pos?.coords.speed < limitSpeed) {

      if (start) {
        console.log("Co vo day chua vay2")
        if (parseFloat(arrDistances[arrDistances.length - 1]?.latitude) != parseFloat(pos?.coords?.latitude)) {
          arrDistances?.length > 1 && setTotalDistance(totalDistance => Number((totalDistance + getDistance(
            arrDistances[arrDistances?.length - 1],
            { latitude: pos?.coords?.latitude, longitude: pos?.coords?.longitude },
          ) / 1000).toFixed(2)));
          arrDistances.push({ latitude: pos?.coords?.latitude, longitude: pos?.coords?.longitude });
        }

      }
    }
    else {
      console.log("Eo tinh khoang cach nha con");
    }
    Geolocation.clearWatch(idGeo);

    console.log("arrDistances: ", arrDistances.length);

    // }
  }
  const onCenter = () => {
    mapRef.current.animateToRegion({
      latitude: curLoc?.latitude,
      longitude: curLoc?.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA
    });
  }
  const onPressStart = () => {
    setStart(start => start = true);
    startTimer(minutes * 60 + seconds);
  }
  function startTimer(duration) {
    var timer: number = duration, minutes, seconds;
    var countDown = setInterval(function () {
      setMinutes(Math.floor(Number(timer / 60)));
      setSeconds(Math.floor(Number(timer % 60)));
      if (--timer < 0) {
        clearInterval(countDown);
      }

    }, 1000);
  }
  const checkTimeOut = () => {
    if (start) {
      if (minutes === 0 && seconds === 0) {
        console.log("Dung lai cho bo may, lam on")
        getlocation(false);
        setStart(false);

      }
      else {
        console.log("dang chay bo")
        getlocation(true);
      }
    }

  }



  return (
    <View style={styles.container}>
      {
        checkTimeOut()
      }
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

          <MarkerAnimated
            ref={markerRef}
            coordinate={coordinate}
          >
            <Image
              source={imagePath.running}
              style={{
                width: 110,
                height: 30,
                transform: [{ rotate: `${heading+120}deg` }],
                marginTop: 25,
                justifyContent:'center',
                alignItems:'center'
            }}
              resizeMode="contain"
              alt="Alternate Text"
            />
          </MarkerAnimated>
          {/* <Marker
                        coordinate={destinationCords}
                        image={imagePath.icGreenMarker}
                    /> */}
          {/* {Object.keys(destinationCords).length > 0 && (<Marker
                        coordinate={destinationCords}
                        image={imagePath.icGreenMarker}
                    />)}

                    {Object.keys(destinationCords).length > 0 && (<MapViewDirections
                        origin={curLoc}
                        destination={destinationCords}
                        apikey={GOOGLE_MAP_KEY}
                        strokeWidth={6}
                        strokeColor="red"
                        optimizeWaypoints={true}
                        onStart={(params) => {
                            console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                        }}
                        onReady={result => {
                            console.log(`Distance: ${result.distance} km`)
                            console.log(`Duration: ${result.duration} min.`)
                            fetchTime(result.distance, result.duration),
                                mapRef.current.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        // right: 30,
                                        // bottom: 300,
                                        // left: 30,
                                        // top: 100,
                                    },
                                });
                        }}
                        onError={(errorMessage) => {
                            // console.log('GOT AN ERROR');
                        }}
                    />)} */}
          <Polyline
            coordinates={[...arrDistances]}
            strokeColor="#f99" // fallback for when `strokeColors` is not supported by the map-provider
            strokeColors={['#f99']}
            strokeWidth={5}
          />
        </MapView>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 0,
            right: 0
          }}
          onPress={onCenter}
        >
          <Image source={imagePath.greenIndicator} alt="Alternate Text"/>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomCard}>
        {/* <View style={{ flexDirection: 'row' }}>
                    <Text>Speed : </Text>
                    <Text>{speed}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Distance : </Text>
                    <Text>{totalDistance} km</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text>Time : </Text>
                    <Text>{minutes < 10 ? "0" + minutes : minutes} : {seconds < 10 ? "0" + seconds : seconds} </Text>
                </View> */}
        <View style={styles.propertyContainer} >
          <View style={styles.properyCricle}>
            <Image size={5} borderRadius={100} source={{
              uri: "https://wallpaperaccess.com/full/317501.jpg"
            }} alt="Alternate Text" />
            <Text color={colors.white} bold style={{marginTop:5, marginLeft:-2}}>{distance}km</Text>
          </View>
          <View style={styles.properyCricle}>
            <Image size={5} borderRadius={100} source={{
              uri: "https://wallpaperaccess.com/full/317501.jpg"
            }} alt="Alternate Text" />
            <Text color={colors.white} bold style={{marginTop:5, marginLeft:-2}}>{speed}</Text>
          </View>
          <View style={styles.properyCricle}>
            <Image size={5} borderRadius={100} source={{
              uri: "https://wallpaperaccess.com/full/317501.jpg"
            }} alt="Alternate Text" />
            <Text color={colors.white} bold style={{marginTop:5}}>{minutes < 10 ? "0" + minutes : minutes} : {seconds < 10 ? "0" + seconds : seconds} </Text>

          </View>
        </View>
        <TouchableOpacity
          onPress={onPressStart}
          style={styles.inpuStyle}
        >
          <Text>Start</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
                    onPress={onPressLocation}
                    style={styles.inpuStyle}
                >
                    <Text>Choose your location</Text>
                </TouchableOpacity> */}
      </View>
    </View>
  );
};


export default StartRunningScreen;
