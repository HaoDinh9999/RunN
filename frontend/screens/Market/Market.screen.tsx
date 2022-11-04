import React from "react";
import { View } from "react-native";
import { Button, useToast, Text, HStack, Center } from 'native-base';
import ComboBoxComponent from "../../components/Combobox/Combobox";
import { colors } from "../../themes";
import styles from './Market.style';
import CardItem from "../../components/CardItem/CardItem";

const MarketScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.tabTop}>
                <Text style={styles.textTapTop}>Sneakers</Text>
            </View>
            <View style={styles.filter}>
                <ComboBoxComponent label="Latest" placeholder="Latest" data={dataComboBox}/>
                <Text fontSize="xs" color={colors.white}>Filter</Text>
            </View>
            {/* <View style={styles.containCard}>
                <CardItem/>
                <CardItem/>
            </View> */}
            <HStack space={2} justifyContent="space-between">
                <CardItem/>
                <CardItem/>
                {/* <Center h="40" w="20" bg="primary.700" rounded="md" shadow={3} /> */}
            </HStack>
          
        </View>
    )
}
const dataComboBox = [
    {label:"Lowest Price", value:"Lowest"},
    {label:"Highest Price", value:"Highest"},
    {label:"Lastest Price", value:"Lastest"},
];

export default MarketScreen;
