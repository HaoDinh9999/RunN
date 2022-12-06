import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../../constant/themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.tabBar,
    flex: 1,
  },
  propertyContainer: {
    backgroundColor: colors.background.mainColor,
    flexDirection:'row',
    width:"100%",
    justifyContent:'space-between'
  },
  properyCricle:{
    borderWidth:1,
    borderRadius:50,
    // paddingHorizontal: 8,
    // paddingVertical:12,
    width:80,
    height:80,
    backgroundColor:colors.background.mainColor,
    borderColor:colors.boderColor,
    alignItems:"center",
    justifyContent:'center'
  },
  bottomCard: {
    backgroundColor: colors.background.mainColor,
    width: '100%',
    paddingHorizontal: 30,
    paddingVertical:10,
    borderRadius:30,
    justifyContent:'center',
    alignItems:'center',
    flexDirection:'row'
    // borderTopEndRadius: 24,
    // borderTopStartRadius: 24,
  },
  inpuStyle: {
    backgroundColor: 'white',
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    height: 48,
    justifyContent: 'center',
    marginTop: 16,
  },
  map: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: colors.background.mainColor,
  },
  bodyMainContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
  },
  circleButton:{
    padding: 10,
    borderWidth:1,
    borderRadius:50,
    backgroundColor:colors.background.tabBar,
    borderColor:colors.boderColor,
    alignItems:"center",
    justifyContent:'center'
  },
  circleButtonSmall:{
    // borderWidth:1,
    // borderRadius:50,
    backgroundColor:colors.background.tabBar,
    // borderColor:colors.boderColor,
    alignItems:"center",
    justifyContent:'center',
    flexDirection:'column'
  },
  button:{
    backgroundColor: colors.background.mainColor,
    borderRadius:30,  
    alignItems:'center',
  }
});

export default styles;
