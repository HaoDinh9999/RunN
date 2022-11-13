import { StyleSheet } from 'react-native';

import { colors } from '../../themes';

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
});

export default styles;
