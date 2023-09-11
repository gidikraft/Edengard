import { Alert, SafeAreaView, StyleSheet, } from 'react-native';
import React, { useState } from 'react';
import { Box, Button, Pressable, PrimaryInput, Text } from '@/components/';
import { palette } from '@/theme';
import { useForm } from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import { RootStackScreenProps } from '@/navigation/types';
import Toast from 'react-native-toast-message';
import database from '@react-native-firebase/database';

const Signup = ({ navigation }: RootStackScreenProps<"SignupScreen">) => {
  const [isLoading, setIsLoading] = useState(false);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'Hello',
      text2: 'Check your email for verification link 👋'
    });
  };

  const dbReference = database();

  const addToDb = (data: { email: string, name: string, password: string }) => {
    const username = data.email.split("@")?.[0];
    //set to null to delete data or .remove()
    dbReference.ref(`/User/${username}`).set({
      userInfo: data.email,
      name: data.name
    })
    .then(() => console.log('User has been added to db.'));
  };

  const firbaseSignup = (data: { email: string, name: string, password: string }) => {
    setIsLoading(true);
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        user.user.sendEmailVerification();
        user.user?.updateProfile({
          displayName: data.name
        })
        addToDb(data);
        goToLogin();

        showToast();
        Alert.alert("Success", "Check verification link sent to your email");
        console.log(JSON.stringify(user), 'User account created & signed in!');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          setError("email", {
            type: "validate",
            message: 'That email address is already in use!',
          })
          return false;
        }
        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setError("email", {
            type: "validate",
            message: 'That email address is invalid!',
          })
          return false;
        }
        console.error(error, 'firebase signin error');
        setError("email", {
          type: "validate",
          message: 'An error occured',
        })
      }).finally(() => setIsLoading(false));
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
    setError,
    setValue,
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: ""
    },
  });

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Box paddingHorizontal="md" justifyContent="center" flex={1}>
        <Text variant='bold24'>Create an account</Text>

        <Box marginTop="lg" >
          <PrimaryInput
            placeholder='Enter your name'
            control={control}
            name="name"
            label='Name'
            rules={{
              required: "Name is required",
              maxLength: {
                value: 100,
                message: "Maximum of 100 characters",
              },
              pattern: {
                value: /^[a-zA-Z ]*$/,
                message: "Please enter a valid name",
              },
            }}
            errorMessage={errors.name?.message}
          />
        </Box>

        <Box marginTop="md" >
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
          isloading={isLoading}
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
    backgroundColor: palette.background
  },

})
