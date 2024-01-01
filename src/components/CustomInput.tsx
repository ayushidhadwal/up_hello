import React, { FC } from 'react'
import { Icon, Input, Text, VStack } from 'native-base'
import { Controller } from 'react-hook-form'
import Entypo from 'react-native-vector-icons/Entypo';


type Props = {
    control: any;
    placeholder: string;
    name: string;
    type: any;
    keyboardType: any;
    icon: boolean;
    passwordHide: any;
    showPass:boolean;
}

const CustomInput: FC<Props> = ({ control, placeholder, name, type, keyboardType, icon ,passwordHide,showPass}) => {
    return (

        <Controller
            name={name}
            control={control}
            rules={{
                required: true,
            }}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (

                <>
                    <Input
                        onBlur={onBlur}
                        value={value}
                        onChangeText={onChange}
                        placeholder={placeholder}
                        keyboardType={keyboardType}
                        fontSize={'lg'}
                        mx={4}
                        type={type}
                        // InputRightElement={icon && <Icon  m="2" mr="3" size="6" color="gray.400" as={<Entypo name="eye-with-line" />} />}
                        InputRightElement={icon ? <Icon onPress={passwordHide} m="2" mr="3" size="6" color="gray.400" as={<Entypo name={showPass?"eye":"eye-with-line"} />} /> : null}
                    />
                    {error && (
                        <Text fontSize={'sm'} ml={6} color={'red.500'}>{error.message}</Text>
                    )}

                </>
            )}
        // render={( }) =>

        />
    )
}

export default CustomInput