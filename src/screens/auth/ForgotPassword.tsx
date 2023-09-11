import { SafeAreaView, StyleSheet,  } from 'react-native';
import React from 'react';
import { palette } from '@/theme';
import { Box, Icon, Pressable, Text } from '@/components/';
import { RootStackScreenProps } from '@/navigation/types';

const ForgotPassword = ({ navigation}: RootStackScreenProps<'ForgotPasswordScreen'>) => {
  return (
    <SafeAreaView style={styles.maincontainer}>
      <Box flex={1} paddingHorizontal='md' >
        <Box flexDirection='row' alignItems="center" marginTop="md">
          <Pressable onPress={() => navigation.goBack()} type='scale'>
            <Icon name='arrow_back' size={16}/>
          </Pressable>
          {/* <Text variant="bold22" marginLeft='md'>Forgot Password</Text> */}
        </Box>

        <Box flex={1} justifyContent='center'>
          <Text variant='bold24'>ForgotPassword</Text>

        </Box>


      </Box>
    </SafeAreaView>
  )
};

export default ForgotPassword;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: palette.white
  },

});
