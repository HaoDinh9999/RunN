import { StyleSheet } from 'react-native';
import { colors } from '../../themes';


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
  containerBody:{
    marginTop:40,
    paddingHorizontal:40
  },
  mainTokenContainer:{
    marginTop:14,
  },
  energyContainer:{
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

  button:{
    backgroundColor: colors.primary,
    borderRadius:30,  
    alignItems:'center',
  }
});

export default styles;
