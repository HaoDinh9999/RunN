import { Box, Center, CheckIcon, Select, View } from "native-base";
import React from "react";
import colors from "../../constant/themes/colors";

const ComboBoxComponent = (props) => {
  const [service, setService] = React.useState("");
  return (
  <View>
      <Box maxW="200">
        <Select selectedValue={service} minWidth={props?.minWidth ? props.minWidth : "140"} accessibilityLabel={props?.label} placeholder={props?.placeholder} borderWidth={props?.borderWidth}
        _selectedItem={{
        color:colors.white,
        endIcon: <CheckIcon size="5"/>
      }} onValueChange={itemValue => setService(itemValue)} color={colors.white} placeholderTextColor={colors.white} fontWeight="bold" style={{...props.style}}>
         {props?.data.map(itemData => 
              <Select.Item label={itemData.label} value={itemData.value} />
         )}
        </Select>
      </Box>
  </View>
  );
}
export default ComboBoxComponent;