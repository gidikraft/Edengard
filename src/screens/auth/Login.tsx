import { StyleSheet, } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { Box, Button, Pressable, PrimaryInput, Text } from '@/components/';
import { useTranslation } from "react-i18next";
import Toast from 'react-native-toast-message';
import auth from '@react-native-firebase/auth';
import { RootStackParamList, RootStackScreenProps } from '@/navigation/types';
// import Icon from 'react-native-vector-icons/Ionicons';


const Login = ({ navigation }: RootStackScreenProps<"LoginScreen">) => {
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true)
    auth()
      .signInWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        console.log(JSON.stringify(user), 'User signed in!');
        dispatch(login());
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          setError("email", {
            type: "validate",
            message: 'That email address is already in use!',
          })
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
          setError("email", {
            type: "validate",
            message: 'That email address is invalid!',
          });
        }

        console.error(error, 'firebase signin error');
        setError("email", {
          type: "validate",
          message: 'An error occured',
        })
      }).finally(() => {
        setIsLoading(false);
      })
  };

  const goToSignup = () => {
    navigation.navigate("SignupScreen");
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
                value: 32,
                message: "Maximum of 32 characters",
              },
              minLength: {
                value: 6,
                message: 'Password must be 6 or more',
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
        <Pressable marginTop='md' onPress={goToSignup} type='scale'>
          <Text textAlign='right' color='buttonGreen'>Forgot password?</Text>
        </Pressable>

        <Button
          label='Login'
          onPress={handleSubmit(firbaseSignIn)}
          backgroundColor="buttonGreen"
          variant='textColor'
          marginTop='xl'
          isloading={isLoading}
        />

        <Box flexDirection='row' justifyContent='center' marginTop='sm'>
          <Text >Don't have an account?</Text>
          <Pressable type='scale' onPress={goToSignup} >
            <Text marginLeft='xs' color='buttonGreen'>Sign up</Text>
          </Pressable>
        </Box>
      </Box>
    </Box>
  )
  // }
};

export default Login;

const styles = StyleSheet.create({});
