import { StyleSheet, } from 'react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { Box, Button, PrimaryInput, Text } from '@/components/';
import { useTranslation } from "react-i18next";
// import { login } from '@/store/authSlice';

const Login = () => {
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    getFieldState,
  } = useForm({
    defaultValues: {
      email: "",
      // childLastName: "",
      // classId: "",
      // student_device: DEVICES[0].name,
      // birthday: "",
      // gender: "",
      // classType: "",
      // exam: "",
    },
  });

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const loginUser = () => {
    dispatch(login());
  }

  return (
    <Box flex={1} backgroundColor='white' paddingHorizontal="md">
      <Box marginTop='xxl' >
        <Text variant="medium20">{t("auth.")}</Text>

        <PrimaryInput
          placeholder='Enter your email'
          control={control}
          name="email"
          label='Email'
              rules={{
                required: "First name is required",
                maxLength: {
                  value: 100,
                  message: "Maximum of 100 characters",
                },
                pattern: {
                  value: /^[a-zA-Z ]*$/,
                  message: "Please enter a valid name",
                },
              }}
          errorMessage={errors.email?.message}
        />

        <Button
          label='Go to tabs'
          onPress={loginUser}
          backgroundColor="buttonGreen"
          variant='secondary'
          marginTop='xl'
        />

      </Box>
    </Box>
  )
};

export default Login;

const styles = StyleSheet.create({});
