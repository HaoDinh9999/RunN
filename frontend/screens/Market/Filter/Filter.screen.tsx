import React from "react";
import { View } from "react-native";
import { Text, Image, Button } from "native-base";
import styles from "./Filter.style";
import { colors } from "../../../constant/themes";

const FilterScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerFilter}>
                <Text bold fontSize={"xl"} color={colors.white}>Filter</Text>
                <Image size={5} borderRadius={100} source={{
                    uri: "https://wallpaperaccess.com/full/317501.jpg"
                }} alt="Alternate Text" />
            </View>
            <View style={styles.typeContainer}>
                <Text bold fontSize={"sm"} color={colors.white}>Filter</Text>
                <View style={styles.containButton}>
                    <Button style={styles.button}>
                        <Text color={colors.white} bold fontSize="sm" >Walker</Text>
                    </Button>
                    <Button style={styles.button}>
                        <Text color={colors.white} bold fontSize="sm" >Runner</Text>
                    </Button>
                    <Button style={styles.button}>
                        <Text color={colors.white} bold fontSize="sm" >Jogger</Text>
                    </Button>
                    <Button style={styles.button}>
                        <Text color={colors.white} bold fontSize="sm">Trainer</Text>
                    </Button>
                </View>
            </View>
        </View>
    )
}
export default FilterScreen;
