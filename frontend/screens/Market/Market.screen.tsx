import React from "react";
import { View, FlatList } from "react-native";
import { Button, useToast, Text, HStack, Center, Container, Stack, VStack, Heading, ScrollView } from 'native-base';
import ComboBoxComponent from "../../components/Combobox/Combobox";
import styles from './Market.style';
import CardItem from "../../components/CardItem/CardItem";
import { useNavigation } from "@react-navigation/native";
import colors from "../../constant/themes/colors";

const MarketScreen = () => {
    const navigation = useNavigation();

    const _renderItem = ({ item }) => {

        return (
            <View style={styles.spacing}>
                <CardItem />

            </View>
        );
    }



    return (

        <View style={styles.container}>
            <View style={styles.tabTop}>
                <Text style={styles.textTapTop} bold fontSize="sm">Sneakers</Text>
            </View>
            <View style={styles.filter}>
                <ComboBoxComponent label="Sort Price" placeholder="Sort Price" data={dataComboBox} borderWidth={0} style={{ marginLeft: -2, color: colors.white, marginTop: 1 }} />
                <Text fontSize="xs" color={colors.white} bold onPress={() => navigation.navigate('filter')}>Filter</Text>
            </View>
            {/* <ScrollView> */}
            <FlatList data={["1", "2", "3", "4"]} numColumns={2} renderItem={_renderItem} style={{flex: 1}} />

            {/* </ScrollView> */}



        </View>
    )
}
const dataComboBox = [
    { label: "Lowest Price", value: "Lowest" },
    { label: "Highest Price", value: "Highest" },
    { label: "Lastest Price", value: "Lastest" },
];

export default MarketScreen;
