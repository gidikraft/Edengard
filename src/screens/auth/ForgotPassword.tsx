import { SafeAreaView, StyleSheet, } from 'react-native';
import React, { useEffect, useState } from 'react';
import { palette } from '@/theme/';
import { Box, Button, Icon, Pressable, PrimaryInput, Text } from '@/components/';
import { RootStackScreenProps } from '@/navigation/types';
import { useForm } from 'react-hook-form';
import auth from '@react-native-firebase/auth';
import { useToast } from '@/hooks/useToast';

const ForgotPassword = ({ navigation }: RootStackScreenProps<'ForgotPasswordScreen'>) => {
  const [isLoading, setIsLoading] = useState(false);
  const [seconds, setSeconds] = useState(30);

  const firebaseAuth = auth();
  const toast = useToast();

  const resetPassword = (data: { email: string }) => {
    setIsLoading(true);
    firebaseAuth.sendPasswordResetEmail(data.email)
      .then(res => {
        toast.success({message: 'Check your email for passwrod reset link'});
        setTimeout(() => {
          navigation.goBack();
        }, 300);
        console.log(res, 'res');
      })
      .catch(error => {
        console.log(error, 'firebase error');
      }).finally(() => {
        setIsLoading(false);
      })

      //   setSeconds(30);
  };

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    setError,
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds]);

  const displayTimer = () => {
    const renderSeconds = seconds < 10 ? `0${seconds}` : seconds;

    return `${renderSeconds}`;
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <Box flex={1} paddingHorizontal='md' >
        <Box flexDirection='row' alignItems="center" marginTop="md">
          <Pressable onPress={() => navigation.goBack()} type='scale'>
            <Icon name='arrow_back' size={16} />
          </Pressable>
          <Text variant="medium20" marginLeft='md'>Forgot Password</Text>
        </Box>

        <Box flex={1} justifyContent='center'>
          <Text variant='bold24'>ForgotPassword</Text>

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

          <Box flexDirection='row' justifyContent='center' marginTop="md">
            <Text variant="regular14" >Tap to resend code in</Text>
            <Pressable onPress={() => console.log('first')} type='scale'>
              <Text variant="medium14" marginLeft='xs' color='textBlue'>{displayTimer()}</Text>
            </Pressable>
          </Box>

          <Button
            label='Login'
            onPress={handleSubmit(resetPassword)}
            backgroundColor="contactColor"
            labelProps={{ color: 'white' }}
            variant='white'
            marginTop='xl'
            isloading={isLoading}
          />
        </Box>
      </Box>
    </SafeAreaView>
  )
};

export default ForgotPassword;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: palette.background
  },

});
