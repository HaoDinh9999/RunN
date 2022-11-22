import { View, Text, Avatar, Image, Badge, Button } from "native-base";
import React from "react";
import { colors } from "../themes";
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileScreen from "../screens/Profile/Profile.screen";
import imagePath from "../constant/imagePath";

const Header = (props) => {
    const navigation = useNavigation();
    return (
        <View style={styles.headerContainer}>
            <View style={styles.avatarContainer} onTouchStart={()=>{navigation.navigate('profile')}}>
                <Avatar bg="amber.500" source={{
                    uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                }} ml={3} mb={-2} zIndex={1} />
                <Text style={styles.textKm} bold > 20.00 km</Text>
            </View>
            <View style={styles.walletContainer}>
                <View style={styles.tokenContainer}>
                    <View style={styles.mainToken}>
                        <Image size={5} borderRadius={100} source={{
                            uri: "https://wallpaperaccess.com/full/317501.jpg"
                        }} alt="Alternate Text" />
                        <Text color={colors.white} bold ml={1}>100</Text>
                    </View>
                    <View style={styles.secondToken}>
                        <Image size={5} borderRadius={100} source={{
                            uri: "https://wallpaperaccess.com/full/317501.jpg"
                        }} alt="Alternate Text" />
                        <Text color={colors.white} bold ml={1}>123</Text>
                    </View>
                </View>
                <View style={styles.notification} onTouchStart={() => navigation.navigate('budget')}>
                    <Avatar bg="lightBlue.400" source={imagePath.wallet} size={6} backgroundColor="#fff">
                        NB
                        <Avatar.Badge bg={colors.red} borderColor={colors.red} mb={5} mr={-3}/>
                    </Avatar>
                </View>
            </View>
        </View>
    )
}
export default Header;
const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: colors.background.mainColor,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    avatarContainer: {
        paddingHorizontal: 0,
        marginTop:14
    },
    textKm: {
        color: colors.text.secondaryText,
        borderWidth: 1,
        borderColor: colors.boderColor,
        borderRadius: 20,
        textAlign: 'center',
        // width: "20%",
        paddingVertical: 3,
        paddingHorizontal: 5
    },
    walletContainer: {
        flexDirection:'row',
        marginTop:8
    },
    tokenContainer: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: colors.boderColor,
        borderRadius: 20,
        backgroundColor: colors.background.primary,
        justifyContent: 'space-around',
        paddingHorizontal: 15,
        paddingVertical: 8
    },
    mainToken: {
        flexDirection: 'row',
    },
    secondToken: {
        flexDirection: 'row',
        marginLeft: 15
    },
    notification: {
        backgroundColor:colors.background.primary,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderRadius: 20,
        marginLeft:8

    }
});