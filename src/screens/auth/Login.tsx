import { Alert, StyleSheet, } from 'react-native';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { Box, Button, Pressable, PrimaryInput, Text } from '@/components/';
import auth from '@react-native-firebase/auth';
import { RootStackScreenProps } from '@/navigation/types';
import { useAppDispatch } from '@/hooks/';
// import Icon from 'react-native-vector-icons/Ionicons';


const Login = ({ navigation }: RootStackScreenProps<"LoginScreen">) => {
  const [isLoading, setIsLoading] = useState(false);

  const firebaseAuth = auth();
  const dispatch = useAppDispatch();
  // const { t } = useTranslation();

  const firbaseSignIn = (data: { email: string, password: string }) => {
    setIsLoading(true);
    firebaseAuth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        if (user.user?.emailVerified) {
          console.log(JSON.stringify(user), 'Successfully signed in!');
          // dispatch(login());
        } else {
          Alert.alert("Email not verified", "Please verify your email by clicking the link sent to your mail");
        }
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
        });
      }).finally(() => {
        setIsLoading(false);
      })
  };

  const goToSignup = () => {
    navigation.navigate("SignupScreen");
  };

  const goToResetPassword = () => {
    navigation.navigate("ForgotPasswordScreen");
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
  
  return (
    <Box flex={1} backgroundColor='background' paddingHorizontal="md">
      <Box flex={1} justifyContent="center" >
        <Text variant="bold24" color='textColor' marginVertical='sm'>Welcome back</Text>

        <Box marginTop="lg" >
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
        <Pressable marginTop='md' onPress={goToResetPassword} type='scale'>
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
};

export default Login;

const styles = StyleSheet.create({});
