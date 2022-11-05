import { StyleSheet } from 'react-native';

import { colors } from '../../themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.mainColor,
    flex: 1,
    padding: 10
    // justifyContent: 'center',
  },
  tabTop:{
   backgroundColor: colors.background.tabBar,
   borderRadius:20,
   width:"100%",
   alignItems: 'center',
   padding:10,
   borderColor:colors.boderColor,
   borderWidth:1

},
  textTapTop:{
    color: colors.white
  },
  filter:{
    paddingHorizontal:5,
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  containCard:{
    flexDirection:"row",
    justifyContent:"space-between",
    alignItems:"center"
  },
  spacing:{
    flex:1,
    paddingVertical:5,
    paddingHorizontal:3
    // backgroundColor:"#f99"
  }
});

export default styles;
