import { StyleSheet } from 'react-native';
import { colors } from '../../constant/themes';


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.mainColor,
    flex: 1,
    padding: 12,
  },
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  shoesContainer:{
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
    marginTop:10,
    paddingHorizontal:40,
    marginBottom:0
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
