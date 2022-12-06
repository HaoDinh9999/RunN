import { StyleSheet } from 'react-native';

import { colors } from '../../constant/themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.mainColor,
    flex: 1,
    padding: 15
  },
  header:{
    flexDirection:'row',
    width:'100%',
    alignItems:'center'
  },
  containTab:{
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  button:{
    backgroundColor: colors.background.mainColor,
    borderRadius:30,  
    alignItems:'center',
  },
  btnActive:{
    backgroundColor:"#20283E",
  },
  buttonLeft:{
    borderTopRightRadius:0,
    borderBottomRightRadius:0,
  },
  buttonRight:{
    borderTopLeftRadius:0,
    borderBottomLeftRadius:0
  },
  addressContain:{
    marginTop:15,
    backgroundColor:"#aaaaaa",
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:10,
    flexDirection:'row',
    alignItems:'center',
    borderColor:colors.boderColor,
    justifyContent:'center',
    borderWidth:2

  },
  coinContain:{
    marginTop:30,
    backgroundColor:"#161827",
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:10,
    flexDirection:'row',
    alignItems:'center',
    borderColor:colors.boderColor,
    justifyContent:'space-between',
    borderWidth:2

  },
  boxContain:{
    marginTop:10,
    backgroundColor:"#161827",
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:10,
    flexDirection:'row',
    alignItems:'center',
    borderColor:colors.boderColor,
    justifyContent:'space-between',
    borderWidth:2

  },
});

export default styles;
