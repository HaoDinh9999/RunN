import React from "react";
import { TouchableHighlight } from "react-native";
import { Heading, Text, Image, Avatar, Button, Spinner, View } from "native-base";
import { colors } from "../../constant/themes";

const LoadingComponent = (props) => {
    return (
        <View style={{justifyContent:'center', alignItems:'center',backgroundColor:'transparent', flex:1}}>
            {console.log(props)}
                  <Spinner color={colors.primary} size={100} />

        </View>
    )
}
export default LoadingComponent;
