import React from "react";
import { TouchableHighlight, View } from "react-native";
import { Heading, Text, Image, Avatar, Button } from "native-base";
import styles from './Profile.style';
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../themes";

const ProfileScreen = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableHighlight onPress={() => navigation.goBack()}>
                    <Image size={5} borderRadius={100} source={{
                        uri: "https://wallpaperaccess.com/full/317501.jpg"
                    }} alt="Alternate Text" />
                </TouchableHighlight>
                <Heading color={colors.white} style={styles.heading}>Accout</Heading>
            </View>
            <View style={styles.modalProfile}>
                <View style={styles.info}>
                    <Avatar bg="amber.500" source={{
                        uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                    }} zIndex={1} size="lg" />
                    <View style={styles.infoItem}>
                        <Text color={colors.white} bold fontSize="lg" >Runner</Text>
                        <Text color={colors.text.thirdText} bold>vhao1509@gmail.com</Text>
                    </View>
                </View>
                <Image size={7} borderRadius={100} source={{
                    uri: "https://wallpaperaccess.com/full/317501.jpg"
                }} alt="Alternate Text" />
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.buttonInfor}>
                    <Text bold color={colors.white} fontSize="sm">Activation Code</Text>
                    <View style={styles.textIcon}>
                        <Text color={colors.white} fontSize="sm" mr={2} bold>0</Text>
                        <TouchableHighlight onPress={() => { }}>
                            <Image size={3} borderRadius={100} source={{
                                uri: "https://wallpaperaccess.com/full/317501.jpg"
                            }} alt="Alternate Text" />
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.buttonInfor}>
                    <Text bold color={colors.white} fontSize="sm">Credit point</Text>
                    <View style={styles.textIcon}>
                        <Text color={colors.white} fontSize="sm" mr={2} bold>0</Text>
                        <TouchableHighlight onPress={() => { }}>
                            <Image size={3} borderRadius={100} source={{
                                uri: "https://wallpaperaccess.com/full/317501.jpg"
                            }} alt="Alternate Text" />
                        </TouchableHighlight>
                    </View>
                </View>
                <View style={styles.buttonInfor}>
                    <Text bold color={colors.white} fontSize="sm">Version</Text>
                    <View style={styles.textIcon}>
                        <Text color={colors.white} fontSize="sm" bold >1.0.0</Text>
                    </View>
                </View>
            </View>
            <View style={{justifyContent:'flex-end', flex:1, paddingHorizontal:80, paddingBottom:10}}>
                <Button style={styles.button} onPress={()=>navigation.navigate('loginVertify')}>LOG OUT</Button>
            </View>
        </View>
    )
}
export default ProfileScreen;
