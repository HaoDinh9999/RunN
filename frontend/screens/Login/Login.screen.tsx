import {
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
import { Box, Button, Input, NativeBaseProvider, useToast, Text, Checkbox, Pressable, Image } from 'native-base';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Dimensions } from 'react-native';


function LoginScreen(props) {
    const [show, setShow] = React.useState(false);
    const window = Dimensions.get("window");
    const screen = Dimensions.get("screen");
        const handleNavigate = (route:string) => {
        props?.navigation.navigate(route);
      }
    return (
        <NativeBaseProvider>
            <View style={styles.container}>
                <Image
          style={{ flex: 1,position:'absolute', resizeMode: 'contain',height: Dimensions.get('window').height
          , width:Dimensions.get('window').width}}
          source={{uri: 'https://t3.ftcdn.net/jpg/02/60/67/54/240_F_260675400_Dk3xroh2EeEPNml0M4A3ziaLTZNnJyrN.jpg'}}
         />
                <View>
                    <Text bold fontSize="xl" style={styles.titleText}>RunN</Text>
                </View>
                <View style={styles.modalContainer}>
                    <View style={styles.modalView}>
                        <Text bold fontSize="lg" style={styles.titleText}>Login</Text>

                        <View style={styles.input}>
                            <Input variant="rounded" placeholder="Email address" />
                        </View>
                        <View style={styles.input}>
                            <Input w={{
                                base: "100%",
                                md: "25%"
                            }} variant="rounded" type={show ? "text" : "password"} InputRightElement={
                                // <MaterialCommunityIcons name="bell" color="#f99" size={30} /> 
                                <Text style={styles.showPass}>Show</Text>
                            } placeholder="Password" />              
                        </View>
                        <View style={styles.checkboxView}>
                            <Checkbox value="Checkbox" size="sm" style={styles.checkbox}>
                                <Text italic style={styles.hintText}>
                                    Agree with <Text style={styles.redText}>Terms of Use</Text> & <Text style={styles.redText}>Privacy Policy</Text>
                                </Text>
                            </Checkbox>
                        </View>
                        {/* <Text style={styles.hintText} italic fontSize="xs">Account will be automatically registed</Text> */}
                        <View style={styles.buttonView}>
                            <Button style={styles.button}>
                                <Text style={styles.buttonText} onPress={()=>handleNavigate("home")}>LOGIN</Text>
                            </Button>
                        </View>
                        <Text fontSize="xs" style={styles.underlineText} underline onPress={()=>handleNavigate("loginVertify")}>Email Vertify Code</Text>

                    </View>

                </View>
            </View>
        </NativeBaseProvider>
    );
}

export default LoginScreen;
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
        backgroundColor: "#fff",
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
        fontSize: 18
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
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
        marginBottom: 10
    },
    buttonText: {
        color: "#fff",
    },
    sendText: {
        fontSize: 10,
        padding: 10,
        fontWeight: "bold",
        color: "#0891B2"
    },
    input: {
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
        textAlign: "center"
    },
    showPass:{
        fontSize:10,
        padding:10,
        fontWeight:"bold",
        color:"#0891B2"
      },
});

