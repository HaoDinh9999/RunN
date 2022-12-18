import { Alert, CloseIcon, HStack, IconButton, useToast, VStack, Text, View } from "native-base";
import React from "react";



const ToastAlertComponent = (props) => {
    console.log("Props", props)
    const {
        id,
        status,
        variant,
        title,
        isClosable,
        ...rest
    } = props;
    const toast = useToast();
    return (
        <View>

        <Alert maxWidth="100%" alignSelf="center" flexDirection="row" status={status ? status : "info"} variant={variant} {...rest}>
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
        </Alert>
        </View>
    )
}

export default ToastAlertComponent;