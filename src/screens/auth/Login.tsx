import { StyleSheet, } from 'react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { Box, Button, PrimaryInput, Text } from '@/components/';
import { useTranslation } from "react-i18next";
import Toast from 'react-native-toast-message';
// import Icon from 'react-native-vector-icons/Ionicons';


const Login = () => {
  const {
    control,
    formState: { errors },
    getFieldState,
    getValues,
    handleSubmit,
    register,
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const dispatch = useDispatch();
  // const { t } = useTranslation();
  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'This is some something 👋'
    });
  }


  const loginUser = (data: { email: string }) => {
    // showToast();
    dispatch(login());
  };

  return (
    <Box flex={1} backgroundColor='white' paddingHorizontal="md">
      <Box flex={1} justifyContent="center" >
        <Text variant="bold24" color='textColor' marginVertical='sm'>Welcome back</Text>

        <Box marginTop="xl" >
          <PrimaryInput
            placeholder='Enter your email'
            control={control}
            name="email"
            label='Email'
            rules={{
              required: "Email is required",
              maxLength: {
                value: 100,
                message: "Maximum of 100 characters",
              },
              pattern: {
                value: /^[a-zA-Z ]*$/,
                message: "Please enter a valid email",
              },
            }}
            errorMessage={errors.email?.message}
          />
        </Box>

        <Box marginTop="md" >
          <PrimaryInput
            placeholder='Enter password'
            control={control}
            name="password"
            label='Password'
            rules={{
              required: "Password is required",
              maxLength: {
                value: 100,
                message: "Maximum of 100 characters",
              },
              pattern: {
                value: /^[a-zA-Z ]*$/,
                message: "Please enter a valid password",
              },
            }}
            secureTextEntry
            errorMessage={errors.password?.message}
          />
        </Box>

        <Button
          label='Go to tabs'
          onPress={handleSubmit(loginUser)}
          backgroundColor="buttonGreen"
          variant='textColor'
          marginTop='xl'
        />

      </Box>
    </Box>
  )
};

export default Login;

const styles = StyleSheet.create({});
