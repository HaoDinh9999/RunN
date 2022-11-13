import { StyleSheet } from 'react-native';
import { colors } from '../../../themes';


const styles = StyleSheet.create({
    spendContainer:{
        marginTop:15
      },
      coinContain:{
        marginTop:15,
        backgroundColor:"#161827",
        paddingHorizontal:15,
        paddingVertical:10,
        borderRadius:10
      },
      coinLine:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
    
      }
});

export default styles;
