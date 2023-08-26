import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { PrimaryButton, PrimaryInput } from '../components';
import { useForm } from 'react-hook-form';

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

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFF',
      }}
    >
      <View style={{ flex: 0.9, paddingHorizontal: 16 }} >
        <Text>HomeScreen</Text>
        <PrimaryInput
          placeholder='Enter your name'
          control={control}
          name="childFirstName"
          errorMessage={errors.childFirstName?.message}
        />
      </View>
      <View style={{ flex: 0.1, paddingHorizontal: 16 }} >
        <PrimaryButton
          label='Go to next'
          onPress={() => console.log('first')}
        />

      </View>
    </SafeAreaView>
  )
};

export default HomeScreen;

const styles = StyleSheet.create({});
