import { Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../../themes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.tabBar,
    flex: 1,
  },
  propertyContainer: {
    backgroundColor: colors.background.tabBar,
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
    backgroundColor: colors.background.tabBar,
    width: '100%',
    padding: 30,
    borderTopEndRadius: 24,
    borderTopStartRadius: 24,
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
    backgroundColor: '#f99',
  },
});

export default styles;
