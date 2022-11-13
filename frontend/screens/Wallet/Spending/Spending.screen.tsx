import React from "react";
import { View } from "react-native";
import styles from './Spending.style';
import { Text, Image, Divider } from "native-base";
import { colors } from "../../../themes";
const SpendingScreen = () => {
    return (
        <View style={styles.spendContainer}>
        <Text color={colors.white} bold fontSize="xl">Spending Account</Text>
        <View style={styles.coinContain}>
            <View style={styles.coinLine}>
                <View style={{ flexDirection: 'row' }}>
                    <Image size={5} borderRadius={100} source={{
                        uri: "https://wallpaperaccess.com/full/317501.jpg"
                    }} alt="Alternate Text" />
                    <Text color={colors.white} bold fontSize="md" marginLeft={4}>CALO</Text>

                </View>
                <Text color={colors.white} bold fontSize="lg">0</Text>

            </View>
            <Divider my="2" _light={{
                bg: colors.background.progress
            }} _dark={{
                bg: "gray.50"
            }} />
            <View style={styles.coinLine}>
                <View style={{ flexDirection: 'row' }}>
                    <Image size={5} borderRadius={100} source={{
                        uri: "https://wallpaperaccess.com/full/317501.jpg"
                    }} alt="Alternate Text" />
                    <Text color={colors.white} bold fontSize="md" marginLeft={4}>FIT</Text>

                </View>
                <Text color={colors.white} bold fontSize="lg">0</Text>

            </View>
        </View>
    </View>
    )
}
export default SpendingScreen;
