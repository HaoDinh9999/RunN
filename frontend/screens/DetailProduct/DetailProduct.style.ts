import { StyleSheet } from 'react-native';

import { colors } from '../../themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.mainColor,
    flex: 1,
    padding: 10
  },
  bodyContainer:{
    borderWidth:3,
    borderRadius:12,
    borderColor:"#2C3C6F"
  },
  modalBackground:{
    alignItems:'center'
  },
  shoesBackground:{
    backgroundColor:"#2C053B",
    width:"100%", 
    padding: 12
  },
  barShoes:{
    backgroundColor:"#2C053B", 
    paddingHorizontal: 5, 
    flexDirection:'row',
    alignItems:'center',
    textAlign:'center',
    borderRadius:25,
  }
});

export default styles;
