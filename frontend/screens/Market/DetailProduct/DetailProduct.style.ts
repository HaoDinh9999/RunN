import { StyleSheet } from 'react-native';

import { colors } from '../../../constant/themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.mainColor,
    flex: 1,
    padding: 12
  },
  bodyContainer:{
    borderWidth:3,
    borderRadius:12,
    borderColor:"#2C3C6F",
    marginTop:12
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
  },
  lifeTime:{
    marginTop:14,
  },
  mint:{
    marginTop:14
  },
  containAttribute:{
    backgroundColor:'#161827',
    paddingHorizontal:10,
    paddingBottom:25
  },
  attributeItem:{
    flexDirection: 'row',
    justifyContent:'space-between',
    // alignItems:'center',
    // textAlign:'center'
  },
  bottom:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor:colors.background.tabBar,
    paddingHorizontal: 20,
    paddingVertical:12,
    borderTopLeftRadius:40,
    borderTopRightRadius:40,

  },
  button:{
    backgroundColor: colors.primary,
    borderRadius:30,  
    alignItems:'center',
  }
});

export default styles;
