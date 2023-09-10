import { StyleSheet, } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { Box, Button, PrimaryInput, Text } from '@/components/';
import { useTranslation } from "react-i18next";
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
// import Icon from 'react-native-vector-icons/Ionicons';


const Login = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  const onAuthStateChanged = (user) => {
    console.log(JSON.stringify(user), 'user');
    setUser(user);
    if (initializing) setInitializing(false);
  };

  const firbaseSignIn = (data: { email: string, password: string }) => {
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        console.log(JSON.stringify(user), 'User signed in!');
        dispatch(login());
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

  const firbaseSignup = (data: { email: string, password: string }) => {
    auth()
      .createUserWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        user.user.sendEmailVerification();
        dispatch(login());
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
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  // if (!user) {
  return (
    <Box flex={1} backgroundColor='white' paddingHorizontal="md">
      <Box flex={1} justifyContent="center" >
        <Text variant="bold24" color='textColor' marginVertical='sm'>Welcome back {user?.email}</Text>

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
          label='Login'
          onPress={handleSubmit(firbaseSignIn)}
          backgroundColor="buttonGreen"
          variant='textColor'
          marginTop='xl'
        />

        <Button
          label='Create account'
          onPress={handleSubmit(firbaseSignup)}
          backgroundColor="gradientBlue"
          variant='textColor'
          marginTop='xl'
        />

      </Box>
    </Box>
  )
  // }
};

export default Login;

const styles = StyleSheet.create({});
