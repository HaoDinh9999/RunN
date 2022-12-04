import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useWalletConnect,
  withWalletConnect,
} from '@walletconnect/react-native-dapp';
import * as React from 'react';
import { Box, Button, Input, NativeBaseProvider, useToast, Text, Checkbox,Image } from 'native-base';
import colors from '../../themes/colors';

function RegisterScreen(props) {
  const [isVertify, setIsVertify] = React.useState(true);
  const handleNavigate = (route: string) => {
    props?.navigation.navigate(route);
  }
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
      <Image
          style={{ flex: 1,position:'absolute', resizeMode: 'cover',height: Dimensions.get('window').height
          , width:Dimensions.get('window').width}}
          source={{uri: 'https://cdn.shopify.com/s/files/1/0059/0056/6597/products/photo-id-4620761661509-muscular-athlete-working-out-on-orange-background.jpg?v=1606202737'}}  alt="Image"
         />
        <View>
          <Text bold fontSize="2xl" style={styles.titleText}>RunN</Text>

        </View>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text bold fontSize="2xl" style={styles.titleText}>Register</Text>

            <View style={styles.inputView}>
              <Input variant="rounded" placeholder="Email address" style={styles.input} />
            </View>
            <View style={styles.inputView}>
              <Input variant="rounded" placeholder="Email vertification code" style={styles.input} InputRightElement={<Text style={styles.sendText}>Send code</Text>} />
            </View>
            {/* <View style={styles.checkboxView}>
              <Checkbox value="Checkbox" size="sm" style={styles.checkbox}>
                <Text italic style={styles.hintText}>
                  Agree with <Text style={styles.redText}>Terms of Use</Text> & <Text style={styles.redText}>Privacy Policy</Text>
                </Text>
              </Checkbox>
            </View> */}
            {/* <Text style={styles.hintText} italic fontSize="xs">Account will be automatically registed</Text> */}
            <View style={styles.buttonView}>
              <Button style={styles.button}>
                <Text style={styles.buttonText} onPress={() => handleNavigate("home")}>Register</Text>
              </Button>
            </View>
            <Text fontSize="xs" style={styles.underlineText} underline onPress={() => handleNavigate("login")}>Login with password</Text>

          </View>

        </View>
      </View>
    </NativeBaseProvider>
  );
}

export default RegisterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  tinyLogo: {
    width: 50,
    height: 100,
    blurRadius: 0

  },
  logo: {
    width: 66,
    height: 58,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 100,
    height: 50,
  },
  modalView: {
    margin: 20,
    marginBottom: 100,
    backgroundColor: colors.background.primary,
    borderRadius: 10,
    padding: 35,
    shadowColor: "gray",
    shadowOffset: {
      width: 6,
      height: 6
    },
    shadowOpacity: 2,
    shadowRadius: 4,
    elevation: 10
  },
  button: {
    borderRadius: 20,
    elevation: 2,
    width: "60%",
    fontSize: 18,
    backgroundColor: colors.button.primary,
  },
  buttonView: {
    alignItems: "center",
    marginTop: 15
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  titleText: {
    textAlign: "center",
    marginBottom: 10,
    color:colors.text.white
  },
  buttonText: {
    color: colors.text.white,
    fontWeight:"600"
  },
  sendText: {
    fontSize: 10,
    padding: 10,
    fontWeight: "bold",
    color: colors.button.primary,    
    backgroundColor:colors.background.primary

  },
  input: {
    color:colors.text.white,
    borderColor:colors.text.white,
    padding: 10,
    backgroundColor:colors.background.primary
  },
  inputView:{
    margin: 10,

  },
  checkbox: {
    margin: 0
  },
  checkboxView: {
    paddingHorizontal: 22,
    width: "95%",
  },
  hintText: {
    color: "#ccc",
    textAlign: "center",
    fontSize: 11
  },
  redText: {
    color: "#f25b5b"
  },
  underlineText: {
    marginTop: 12,
    textAlign: "center",
    color:colors.text.link
  }
});

