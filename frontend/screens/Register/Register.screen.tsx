import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  useWalletConnect,
  withWalletConnect,
} from '@walletconnect/react-native-dapp';
import * as React from 'react';
import { Box, Button, Input, NativeBaseProvider, useToast, Text, Checkbox, Image, Alert, VStack, HStack, IconButton, CloseIcon } from 'native-base';
import colors from '../../constant/themes/colors';
import { useDispatch } from 'react-redux';
import { useSignupMutation } from '../../services/modules/users';
// import { ToastAlertComponent } from '../../components/ToastAlert/ToastAlert';
import LoadingComponent from '../../components/Loading/Loading';

function RegisterScreen(props) {
  const [isVertify, setIsVertify] = React.useState(true);
  const [email, setEmail] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [passwordConfirm, setPasswordConfirm] = React.useState<string>();
  const [signup, { isLoading, data, error }] = useSignupMutation();
  const [show, setShow] = React.useState<boolean>(false);


  const dispatch = useDispatch();
  const toast = useToast();
  const handleNavigate = (route: string) => {
    props?.navigation.navigate(route);
  }
  const handleRegister = () => {
    if (password && email && password === passwordConfirm) {
      console.log("Dang register", email, password)
      signup({ email: email, password: password });
    }
    else if(!password || !email || !passwordConfirm) {
      const toastSuccess = {
        title: "Please fill in all the information",
        variant: "solid",
        isClosable: true,
        status: "error",
      }
      toast.show({
        render: ({
          id
        }) => {
          return <ToastAlert id={0}  {...toastSuccess} />
        }
      })
    }
  }
  const resetField = () => {
    setEmail("");
    setPassword("");
    setPasswordConfirm("");

  }
  const handleShowPassword = () => {
    setShow(!show);
  }
  React.useEffect(() => {
    if (data) {
      console.log("data", data.status)
      if (data?.status === "success") {
        const toastSuccess = {
          title: "Register successfully ",
          variant: "solid",
          isClosable: true,
          status: "success",
        }
        toast.show({
          render: ({
            id
          }) => {
            return <ToastAlert id={0}  {...toastSuccess} />
          }
        })
        resetField();
        handleNavigate('login');
      }
    }
  }, [data])
  React.useEffect(() => {
    if (error) {
      console.log(error)
      const toastError = {
        title: "Register failed " + error?.data?.error,
        variant: "solid",
        isClosable: true,
        status: "error",
      }
      toast.show({
        render: ({
          id
        }) => {
          return <ToastAlert id={1}  {...toastError} />
        }
      })
      resetField();

    }
  }, [error])
  const ToastAlert = ({
    id,
    status,
    variant,
    title,
    isClosable,
    ...rest
  }) => <Alert maxWidth="100%" alignSelf="center" flexDirection="row" status={status ? status : "info"} variant={variant} {...rest}>
      <VStack space={1} flexShrink={1} w="100%">
        <HStack flexShrink={1} alignItems="center" justifyContent="space-between">
          <HStack space={2} flexShrink={1} alignItems="center">
            <Alert.Icon />
            <Text fontSize="md" fontWeight="medium" flexShrink={1} color={variant === "solid" ? "lightText" : variant !== "outline" ? "darkText" : null}>
              {title}
            </Text>
          </HStack>
          {isClosable ? <IconButton variant="unstyled" icon={<CloseIcon size="3" />} _icon={{
            color: variant === "solid" ? "lightText" : "darkText"
          }} onPress={() => toast.close(id)} /> : null}
        </HStack>

      </VStack>
    </Alert>;
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <Image
          style={{
            flex: 1, position: 'absolute', resizeMode: 'cover', height: Dimensions.get('window').height
            , width: Dimensions.get('window').width
          }}
          source={{ uri: 'https://cdn.shopify.com/s/files/1/0059/0056/6597/products/photo-id-4620761661509-muscular-athlete-working-out-on-orange-background.jpg?v=1606202737' }} alt="Image"
        />
        <View>
          <Text bold fontSize="2xl" style={styles.titleText}>RunN</Text>

        </View>
        {isLoading ? <LoadingComponent display={true} /> : (
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <Text bold fontSize="2xl" style={styles.titleText}>Register</Text>

              <View style={styles.inputView}>
                <Input variant="rounded" placeholder="Email address" style={styles.input} onChangeText={newText => setEmail(newText)} />
              </View>
              <View style={styles.inputView}>
                <Input variant="rounded" placeholder="Password" style={styles.input} onChangeText={newText => setPassword(newText)} InputRightElement={<Text style={styles.sendText} onPress={handleShowPassword}>Send code</Text>}  type={show ? "text" : "password"}/>
              </View>
              <View style={styles.inputView}>
              <Input variant="rounded" placeholder="Password Confirm" style={styles.input} onChangeText={newText => setPasswordConfirm(newText)} InputRightElement={<Text style={styles.sendText} onPress={handleShowPassword}>Send code</Text>}  type={show ? "text" : "password"}/>
              </View>
              <View style={styles.buttonView}>
                <Button style={styles.button}>
                  <Text style={styles.buttonText} onPress={handleRegister}>Register</Text>
                </Button>
              </View>
              <Text fontSize="xs" style={styles.underlineText} underline onPress={() => handleNavigate("login")}>Login with password</Text>

            </View>

          </View>
        )}

      </View>
    </NativeBaseProvider>
  );
}

export default RegisterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 0,
  },
  tinyLogo: {
    width: 50,
    height: 100,
    blurRadius: 0

  },
  logo: {
    width: 66,
    height: 58,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    marginTop: 100,
    height: 50,
  },
  modalView: {
    margin: 20,
    marginBottom: 100,
    backgroundColor: colors.background.primary,
    borderRadius: 10,
    padding: 35,
    shadowColor: "gray",
    shadowOffset: {
      width: 6,
      height: 6
    },
    shadowOpacity: 2,
    shadowRadius: 4,
    elevation: 10
  },
  button: {
    borderRadius: 20,
    elevation: 2,
    width: "60%",
    fontSize: 18,
    backgroundColor: colors.button.primary,
  },
  buttonView: {
    alignItems: "center",
    marginTop: 15
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  titleText: {
    textAlign: "center",
    marginBottom: 10,
    color: colors.text.white
  },
  buttonText: {
    color: colors.text.white,
    fontWeight: "600"
  },
  sendText: {
    fontSize: 10,
    padding: 10,
    fontWeight: "bold",
    color: colors.button.primary,
    backgroundColor: colors.background.primary

  },
  input: {
    color: colors.text.white,
    borderColor: colors.text.white,
    padding: 10,
    backgroundColor: colors.background.primary
  },
  inputView: {
    margin: 10,

  },
  checkbox: {
    margin: 0
  },
  checkboxView: {
    paddingHorizontal: 22,
    width: "95%",
  },
  hintText: {
    color: "#ccc",
    textAlign: "center",
    fontSize: 11
  },
  redText: {
    color: "#f25b5b"
  },
  underlineText: {
    marginTop: 12,
    textAlign: "center",
    color: colors.text.link
  }
});

