
import { StyleSheet } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { colors } from '../../constant/themes';

const styles = StyleSheet.create({
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
         marginBottom:15 
      },
});

export default styles;
