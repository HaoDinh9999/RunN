import { StyleSheet } from 'react-native';
import { colors } from '../../../constant/themes';


const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.mainColor,
    flex: 1,
  },
  header:{
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    padding:15,

  },
  heading:{
    textAlign:'center',
    // marginLeft:-30
  },
  avatar:{
    marginTop:30,
    justifyContent:'center',
    alignItems:'center'
  },
  bodyContainer:{
    marginTop:30,
    // backgroundColor:'#f99',
    height:'100%',
    padding:15,
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
  fieldContainer:{
    
    marginTop:10,
    paddingHorizontal:15,
    paddingVertical:10,
    borderRadius:10,
    flexDirection:'row',
    alignItems:'center',
    borderColor:colors.boderColor,
    justifyContent:'space-between',
    borderWidth:2
  },
  input: {
    color: colors.text.white,
    width:'60%'
    // borderColor: colors.text.white,
    // padding: 10,
    // backgroundColor: colors.background.primary
  },
 
});

export default styles;
