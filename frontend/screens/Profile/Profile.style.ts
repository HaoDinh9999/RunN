import { StyleSheet } from 'react-native';

import { colors } from '../../themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.mainColor,
    flex: 1,
    padding:15,
  },
  header:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  heading:{
    textAlign:'center',
    width:'100%'
  },
  modalProfile:{
    backgroundColor:colors.background.primary,
    marginTop:15,
    borderRadius:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    paddingHorizontal:10,
    paddingVertical:8
  },
  info:{
    flexDirection:'row',
    alignItems:'center',
  },
  infoItem:{
    marginLeft:10
  },
  bodyContainer:{

  },
  buttonInfor:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    textAlign:'center',
    paddingTop:20
  },
  textIcon:{
    flexDirection:'row',
    alignItems:'center'

  },
  button:{
    backgroundColor:colors.background.mainColor,
    color:colors.boderColor,
    borderColor:colors.lightGray,
    borderWidth:1,
    borderRadius:25,
    fontWeight:'bold',
  }
});

export default styles;
