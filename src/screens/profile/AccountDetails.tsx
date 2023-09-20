import { SafeAreaView, StyleSheet, } from 'react-native';
import React from 'react';
import { Box, Button, Icon, Pressable, PrimaryInput, Text } from '@/components/';
import { palette } from '@/theme/';
import IIcon from 'react-native-vector-icons/Ionicons';
import { RootStackParamList, RootStackScreenProps } from '@/navigation/types';
import { useAppSelector } from '@/hooks/';
import { useForm } from 'react-hook-form';

const AccountDetails = ({ navigation }: RootStackScreenProps<"AccountDetails">) => {
  const { userData } = useAppSelector((state) => state.auth);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      gender: "",
      dob: "",
    },
  });

  const updateProfile = (data: { firstName: string, lastName: string, phoneNumber: string }) => {
    console.log(data, 'data');

  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Box flex={1} backgroundColor="background" paddingHorizontal='sm'>
        <Box flexDirection='row' alignItems="center" marginTop="md">
          <Pressable onPress={() => navigation.goBack()} type='scale'>
            <IIcon name="chevron-back-outline" size={16} color={palette.black} />
          </Pressable>
          <Text variant="bold20" marginLeft='md'>Bio-data</Text>
        </Box>

        <Box alignItems='center' marginTop="xl">
          <Icon name='profile-photo' size={72} />

          <Text textTransform='capitalize' variant='bold16' marginTop='sl' color='textColor'>{`${userData?.firstName} ${userData?.lastName}`}</Text>
          <Text variant='regular14' marginTop='sml' color='secondaryText'>{userData?.userEmail} </Text>
        </Box>

        <PrimaryInput
          placeholder='What’s your first name?'
          control={control}
          name="firstName"
          rules={{
            pattern: {
              value: /^[a-zA-Z]*$/,
              message: "Please enter a valid name",
            },
          }}
          inputStyle={{ backgroundColor: palette.white, borderColor: palette.white }}
          inputContainerStyle={{ marginTop: 24, }}
          errorMessage={errors.firstName?.message}
        />

        <PrimaryInput
          placeholder='What’s your last name?'
          control={control}
          name="lastName"
          rules={{
            required: "Password is required",
            maxLength: {
              value: 32,
              message: "Maximum of 32 characters",
            },
            minLength: {
              value: 6,
              message: 'Password must be 6 or more',
            },
            pattern: {
              value: /^[a-zA-Z]*$/,
              message: "Please enter a valid name",
            },
          }}
          inputStyle={{ backgroundColor: palette.white, borderColor: palette.white }}
          inputContainerStyle={{ marginTop: 24, }}
          errorMessage={errors.firstName?.message}
        />

        <PrimaryInput
          placeholder='Phone number'
          control={control}
          name="phoneNumber"
          // label='First name'
          rules={{
            pattern: {
              value: /^[0-9]*$/,
              message: "Please enter a valid phone number",
            },
          }}
          inputStyle={{ backgroundColor: palette.white, borderColor: palette.white }}
          inputContainerStyle={{ marginTop: 24, }}
          errorMessage={errors.firstName?.message}
        />
      </Box>

      <Button
        background='contactColor'
        label='Update Profile'
        labelProps={{ color: 'white' }}
        marginHorizontal='xl'
        marginBottom='lg'
        borderRadius={16}
        onPress={handleSubmit(updateProfile)}
      />
    </SafeAreaView>
  )
};

export default AccountDetails;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: palette.background,
  },
});
