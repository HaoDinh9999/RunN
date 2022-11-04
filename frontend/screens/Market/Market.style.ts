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
   marginTop: 10,
   borderRadius:20,
   width:"100%",
   alignItems: 'center',
   padding:8
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



  }
});

export default styles;
