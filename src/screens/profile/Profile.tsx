import { Dimensions, Modal, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { Box, Button, CenterModal, Icon, Pressable, PrimaryButton, Text } from '@/components/';
import { palette } from '@/theme/';
import { useDispatch, useSelector } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { logout } from '@/store/authSlice';
import { RootState } from '@/store/Store';
import { LogoutModal } from '../../components/Modals/';

const Profile = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const firebaseAuth = auth();
  // const dispatch = useDispatch();
  const { userData } = useSelector((state: RootState) => state.auth);

  const toggleLogoutModal = () => setShowLogoutModal(prev => !prev);

  const loginOutUser = async () => {
    await firebaseAuth.signOut()
      .then(() => {
        console.log('User signed out!');
        // dispatch(logout());
      });

    // await dbReference.goOnline();
  };

  return (
    <SafeAreaView style={styles.maincontainer}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box flex={1} paddingHorizontal='md' >
          <Text variant="bold24" marginTop='xl'>Account</Text>

          <Box flexDirection='row' alignItems='center' marginTop='xxl'>
            <Icon name='profile_pic' size={50} />
            <Box marginLeft='sml' >
              <Text variant='medium18' textTransform='capitalize'>{userData?.name}</Text>
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
            />
            <Box borderBottomWidth={1} borderColor="border" marginBottom="md" />

            <ProfileItem
              title='My messages'
            />

            <Text variant='bold18' marginTop='xl' marginBottom='md'>Support</Text>

            <ProfileItem
              title='Help center'
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
