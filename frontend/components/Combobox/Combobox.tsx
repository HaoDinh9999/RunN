import { Box, Center, CheckIcon, Select, View } from "native-base";
import React from "react";
import colors from "../../themes/colors";

const ComboBoxComponent = (props) => {
  const [service, setService] = React.useState("");
  return (
  <View>
      <Box maxW="200">
        <Select selectedValue={service} minWidth="120" accessibilityLabel={props?.label} placeholder={props?.placeholder}
        borderColor={colors.background.tabBar} 
        _selectedItem={{
        // bg: colors.background.tabBar,
        color:colors.white,
        endIcon: <CheckIcon size="5"/>
      }} mt={1} onValueChange={itemValue => setService(itemValue)} color={colors.white} placeholderTextColor={colors.white} >
         {props?.data.map(itemData => 
              <Select.Item label={itemData.label} value={itemData.value} />
         )}
        </Select>
      </Box>
  </View>
  );
}
export default ComboBoxComponent;