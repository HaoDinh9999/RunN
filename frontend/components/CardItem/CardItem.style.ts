
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { colors } from '../../themes';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.background.mainColor,
    flex: 1,
    justifyContent: 'center',
  },
  typeContainer:{
    flexDirection:"row",
    paddingHorizontal:10,
    paddingVertical:3
  },
  productContainer:{
    alignItems:'center',
    borderColor: colors.boderColor,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    padding:10,
    paddingBottom:15
  },
  footerContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:10,
    paddingVertical:2
  },
  button:{
    backgroundColor: colors.primary,
    borderRadius:30,  
    height:"95%",
    alignItems:'center',

  },
  progressContainer:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  }
});

export default styles;
