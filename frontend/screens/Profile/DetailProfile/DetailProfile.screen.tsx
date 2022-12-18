import React from "react";
import { TouchableHighlight } from "react-native";
import { Heading, Text, Image, Avatar, Button, View } from "native-base";
import styles from './DetailProfile.style';
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import imagePath from "../../../constant/imagePath";
import { colors } from "../../../constant/themes";


const DetailProfileScreen = () => {
    const navigation = useNavigation();
    const dispatch = useDispatch();


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableHighlight onPress={() => navigation.goBack()}>
                    <Image size={7} borderRadius={100} source={imagePath.backWhiteCircle} alt="Alternate Text" />
                </TouchableHighlight>
                <Heading color={colors.white} style={styles.heading}>Profile</Heading>
                <TouchableHighlight onPress={() => navigation.goBack()}>
                    <Image size={7} borderRadius={100} source={imagePath.backWhiteCircle} alt="Alternate Text" />
                </TouchableHighlight>
            </View>
            <View style={styles.avatar}>
                <Avatar bg="amber.500" source={{
                    uri: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                }} zIndex={1} size="xl" />
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.fieldContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text color={colors.white} bold fontSize="lg" marginLeft={4}>Email</Text>

                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text color={colors.lightGray2} bold fontSize="md" marginRight={2}>vhao1509@gmail.com</Text>
                        <TouchableHighlight onPress={() => navigation.goBack()}>
                            <Image size={7} borderRadius={100} source={imagePath.backWhiteCircle} alt="Alternate Text" />
                        </TouchableHighlight>
                    </View>

                </View>
                <View style={styles.fieldContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text color={colors.white} bold fontSize="lg" marginLeft={4}>Name</Text>

                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text color={colors.lightGray2} bold fontSize="md" marginRight={2}>Hao</Text>
                        <TouchableHighlight onPress={() => navigation.goBack()}>
                            <Image size={7} borderRadius={100} source={imagePath.backWhiteCircle} alt="Alternate Text" />
                        </TouchableHighlight>
                    </View>

                </View>
                <View style={styles.fieldContainer}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text color={colors.white} bold fontSize="lg" marginLeft={4}>Password</Text>

                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text color={colors.lightGray2} bold fontSize="md" marginRight={2}>******</Text>
                        <TouchableHighlight onPress={() => navigation.goBack()}>
                            <Image size={7} borderRadius={100} source={imagePath.backWhiteCircle} alt="Alternate Text" />
                        </TouchableHighlight>
                    </View>

                </View>
            </View>

        </View>
    )
}
export default DetailProfileScreen;
