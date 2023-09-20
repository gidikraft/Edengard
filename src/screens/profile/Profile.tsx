import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Box, Button, Icon, Pressable, Text } from '@/components/';
import { palette } from '@/theme/';
import { useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { RootState } from '@/store/Store';
import { LogoutModal } from '../../components/Modals/';
import { RootTabScreenProps } from '@/navigation/types';
import { useToast } from '@/hooks/useToast';

const Profile = ({navigation}: RootTabScreenProps<"ProfileSCreen">) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const firebaseAuth = auth();
  const toast = useToast();

  // const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.auth);

  const toggleLogoutModal = () => setShowLogoutModal(prev => !prev);

  const loginOutUser = async () => {
    await firebaseAuth.signOut()
      .then(() => {
        console.log('User signed out!');
        // dispatch(logout());
      });
  };

  const goToNotification = () => navigation.navigate("NotificationScreen");

  return (
    <SafeAreaView style={styles.maincontainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box flex={1} paddingHorizontal='md' >
          <Text variant="bold24" marginTop='xl'>Account</Text>

          <Box flexDirection='row' alignItems='center' marginTop='xxl'>
            <Icon name='profile_pic' size={50} />
            <Box marginLeft='sml' >
              <Text variant='medium18' textTransform='capitalize'>{`${userData?.firstName} ${userData?.lastName}`}</Text>
              <Text variant='regular14' color='secondary'>0 contributions</Text>
            </Box>
          </Box>

          <Button
            label='View full profile'
            borderRadius={60}
            marginTop='xxl'
            variant='white'
            height={48}
          />

          <Box marginTop='xl'>
            <ProfileItem
              title='My bookings'
              itemPress={() => toast.success({message: 'Hello world'})}
            />
            <Box borderBottomWidth={1} borderColor="border" marginBottom="md" />

            <ProfileItem
              title='My messages'
              itemPress={() => toast.error({message: 'Hello world'})}
            />

            <Text variant='bold18' marginTop='xl' marginBottom='md'>Support</Text>

            <ProfileItem
              title='Help center'
              itemPress={() => toast.info({message: 'Hello world'})}
            />

            <Box borderBottomWidth={1} borderColor="border" marginBottom="md" />

            <ProfileItem
              title='App feedback'
            />

            <Text variant='bold18' marginTop='xl' marginBottom='md'>Preferences</Text>

            <ProfileItem
              title='Language (English, UK)'
            />

            <ProfileItem
              title='Notification'
              itemPress={goToNotification}
            />

            <ProfileItem
              logout
              title='Logout'
              itemPress={toggleLogoutModal}
            />

          </Box>
        </Box>
      </ScrollView>
      <LogoutModal
        closeModal={toggleLogoutModal}
        logout={loginOutUser}
        modalVisible={showLogoutModal}
      />
    </SafeAreaView>
  )
};

export default Profile;

type ProfileItemProps = {
  title: string;
  itemPress?: () => void;
  logout?: boolean
}

const ProfileItem = ({ logout, title, itemPress }: ProfileItemProps) => {
  return (
    <Pressable
      flexDirection='row'
      justifyContent='space-between'
      marginBottom='md'
      alignItems='center'
      height={34}
      onPress={itemPress}
      type='scale'
    >
      <Text variant='regular16' color={logout ? 'error' : 'textColor'}>{title}</Text>

      <Icon name='link' size={15} />
    </Pressable>
  )
}

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: palette.background
  },
});
