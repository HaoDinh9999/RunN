import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Heading, Text, Image, Avatar, Button, View, Input, Icon } from 'native-base';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { User } from '../../../../@core/model/user';
import styles from './EditProfile.style';
import { colors } from '../../../../constant/themes';
import imagePath from '../../../../constant/imagePath';

const EditDetailProfileScreen = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const currentUserReducer: User = useSelector((state: any) => state?.auth?.currentUser);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableHighlight onPress={() => navigation.goBack()}>
          <Image
            size={7}
            borderRadius={100}
            source={imagePath.backWhiteCircle}
            alt="Alternate Text"
          />
        </TouchableHighlight>
        <Heading color={colors.white} style={styles.heading}>
          {props?.route?.params?.title}
        </Heading>
        <TouchableHighlight onPress={() => navigation.goBack()}>
          <Image size={7} borderRadius={100} alt="" />
        </TouchableHighlight>
      </View>
      <View>
        
      </View>
      <View style={styles.bodyContainer}>
        <Input
          w={{
            base: '75%',
            md: '25%',
          }}
          InputRightElement={
            <Image size={5} borderRadius={100} source={imagePath.name} alt="Alternate Text" style={{ marginRight: 10 }} />
          }
          placeholder=    {props?.route?.params?.title}
          fontSize={15}
          color="#fff"
        />
      </View>

      <View
        style={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          bottom: 0,
          width:'100%'
        }}>
      <View
        style={{
          width: '50%',
          marginBottom: 15,
          paddingHorizontal: 15
        }}
      >
        <Button style={styles.button}>SAVE</Button>

        <Text style={{ textAlign: 'center', marginBottom: 15 }} color="#fff">
          © Copyright 2022 RunN.
        </Text>
      </View>
      </View>
      
    </View>
  );
};
export default EditDetailProfileScreen;
