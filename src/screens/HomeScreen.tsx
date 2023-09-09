import { SafeAreaView, StyleSheet, } from 'react-native';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../store/authSlice';
import { RootState } from '@/store/Store';
import { Box, Button, Icon, Pressable, PrimaryButton, PrimaryInput, Text } from '@/components/';
// import { RootState } from '../store/Store';

const HomeScreen = () => {

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    getFieldState,
  } = useForm({
    defaultValues: {
      childFirstName: "",
      // childLastName: "",
      // classId: "",
      // student_device: DEVICES[0].name,
      // birthday: "",
      // gender: "",
      // classType: "",
      // exam: "",
    },
  });

  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated)

  const buttonPress = () => {
    console.log('first', getValues(), isAuthenticated)
  }

  const loginAction = () => {
    dispatch(logout());
  }

  const dispatch = useDispatch();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
      <Box paddingHorizontal='md'>

        <PrimaryInput
          placeholder='Enter your name'
          control={control}
          name="childFirstName"
          label='Name'
          errorMessage={errors.childFirstName?.message}
        />
        <PrimaryButton
          label='Go to next'
          onPress={loginAction}
        />
        <Pressable onPress={buttonPress} type='scale'>
          <Icon name='address_book' />
        </Pressable>

        <Button
          label='Go to tabs'
          onPress={buttonPress}
          backgroundColor="buttonGreen"
          variant='secondary'
        />
      </Box>
    </SafeAreaView>
  )
};

export default HomeScreen;

const styles = StyleSheet.create({});
