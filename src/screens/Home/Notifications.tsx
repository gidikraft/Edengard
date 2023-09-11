import { SafeAreaView, StyleSheet, } from 'react-native';
import React from 'react';
import { Box, Icon, Pressable, Text } from '@/components/';
import { RootStackScreenProps } from '@/navigation/types';
import { palette } from '@/theme';

const Notifications = ({ navigation }: RootStackScreenProps<"NotificationScreen">) => {
  return (
    <Box flex={1} backgroundColor='background'>
      <Box flex={1} backgroundColor="background" paddingHorizontal='md' marginTop="xl">
        <Box flexDirection='row' alignItems="center" marginTop="md">
          <Pressable onPress={() => navigation.goBack()} type='scale'>
            <Icon name='arrow_back' size={16} />
          </Pressable>
          <Text variant="medium24" marginLeft='md'>Notification</Text>
        </Box>

          {/* <Text variant="bold22" marginLeft='md'>Forgot Password</Text> */}
      </Box>
    </Box>
  )
};

export default Notifications;

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: palette.background,
  },
});
