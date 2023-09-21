import { Alert, StyleSheet, } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { Box, Button, Pressable, PrimaryInput, Text } from '@/components/';
import auth from '@react-native-firebase/auth';
import { RootStackScreenProps } from '@/navigation/types';
import { useAppDispatch } from '@/hooks/';
import { getFromLS, saveToLS } from '@/services/localStorage/storage';
import { palette } from '@/theme/';
import {
  GoogleSignin,
  // GoogleSigninButton,
  // statusCodes,
} from '@react-native-google-signin/google-signin';
import { useToast } from '@/hooks/useToast';


const Login = ({ navigation }: RootStackScreenProps<"LoginScreen">) => {
  const [isLoading, setIsLoading] = useState(false);

  const firebaseAuth = auth();
  const dispatch = useAppDispatch();
  // const { t } = useTranslation();
  const toast = useToast();
  // GoogleSignin.configure({
  //   webClientId: '"client_type": 3',
  // });


  const firbaseSignIn = (data: { email: string, password: string }) => {
    setIsLoading(true);
    firebaseAuth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((user) => {
        if (user.user?.emailVerified) {
          console.log(JSON.stringify(user), 'Successfully signed in!');
          saveToLS('@username', data.email);
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

        if (error.code === 'auth/wrong-password') {
          console.log('That password is invalid!');
          setError("password", {
            type: "validate",
            message: 'The password is invalid!',
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

  const onGoogleButtonPress = async () => {
    toast.info({message: 'Coming soon'});
    // // Check if your device supports Google Play
    // await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // // Get the users ID token
    // const { idToken, user } = await GoogleSignin.signIn();

    // // Create a Google credential with the token
    // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    // console.log(idToken, googleCredential, user, 'googleCredential');

    // // Sign-in the user with the credential
    // return firebaseAuth.signInWithCredential(googleCredential);
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

  const getSecret = async () => {
    const val = await getFromLS("@username");
    if (val) {
      setValue("email", val);
    }
  };

  useEffect(() => {
    getSecret();
  }, []);

  return (
    <Box flex={1} backgroundColor='background' paddingHorizontal="md">
      <Box flex={1} justifyContent="center" >
        <Text variant="bold24" color='textColor' marginVertical='sm'>Welcome back</Text>

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
          keyboardType="email-address"
          errorMessage={errors.email?.message}
          inputContainerStyle={{ marginTop: 24, }}
        />

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
              value: /^[a-zA-Z0-9]*$/,
              message: "Please enter a valid password",
            },
          }}
          secureTextEntry
          errorMessage={errors.password?.message}
          inputContainerStyle={{ marginTop: 24, }}
        />

        <Pressable marginTop='md' onPress={goToResetPassword} type='scale'>
          <Text textAlign='right' color='textBlue'>Forgot password?</Text>
        </Pressable>

        <Button
          label='Login'
          onPress={handleSubmit(firbaseSignIn)}
          backgroundColor="contactColor"
          labelProps={{ color: 'white' }}
          variant='textColor'
          marginTop='lg'
          isloading={isLoading}
        />

        <Box flexDirection='row' marginTop='md' justifyContent='space-between' alignItems='center'>
          <Box height={1} backgroundColor="border" width={'33%'} />
          <Text variant="medium14" textAlign="center" color="secondary">or login with</Text>
          <Box height={1} backgroundColor="border" width={'33%'} />
        </Box>

        <Button
          label='Google'
          onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with google'))}
          backgroundColor="white"
          variant='textColor'
          borderWidth={1}
          borderColor="border"
          marginTop='md'
          icon='google'
          isloading={isLoading}
        />

        <Button
          label='Phone number'
          onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with google'))}
          backgroundColor="white"
          variant='textColor'
          borderWidth={1}
          borderColor="border"
          marginTop='md'
          icon='phone'
          isloading={isLoading}
        />

        <Box flexDirection='row' justifyContent='center' marginTop='sl'>
          <Text >Don't have an account?</Text>
          <Pressable type='scale' onPress={goToSignup} >
            <Text marginLeft='xs' color='textBlue'>Sign up</Text>
          </Pressable>
        </Box>
      </Box>
    </Box>
  )
};

export default Login;

const styles = StyleSheet.create({});
