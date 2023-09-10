import { SafeAreaView, StyleSheet, } from 'react-native';
import React from 'react';
import { Box, Button, Pressable, PrimaryInput, Text } from '@/components/';
import { palette } from '@/theme';
import { useForm } from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import { RootStackScreenProps } from '@/navigation/types';

const Signup = ({ navigation }: RootStackScreenProps<"SignupScreen">) => {

  const firbaseSignup = (data: { email: string, password: string }) => {
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        user.user.sendEmailVerification();
        // dispatch(login());
        console.log(JSON.stringify(user), 'User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error, 'firebase signin error');
      });
  };

  const goToLogin = () => {
    navigation.navigate("LoginScreen");
  };

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

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Box paddingHorizontal="md" justifyContent="center" flex={1}>
        <Text variant='bold24'>Create an account</Text>

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
                value: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
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
                value: 32,
                message: "Maximum of 32 characters",
              },
              minLength: {
                value: 3,
                message: 'Length must be 3 or more',
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
          label='Create account'
          onPress={handleSubmit(firbaseSignup)}
          backgroundColor="gradientBlue"
          variant='textColor'
          marginTop='xl'
        />

        <Box flexDirection='row' justifyContent='center' marginTop='sm'>
          <Text >Already have an account?</Text>
          <Pressable type='scale' onPress={goToLogin} >
            <Text marginLeft='xs' color='gradientBlue'>Login instead</Text>
          </Pressable>
        </Box>

      </Box>
    </SafeAreaView>
  )
};

export default Signup;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: palette.white
  },

})
