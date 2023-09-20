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
import IIcon from 'react-native-vector-icons/Ionicons';

const Profile = ({ navigation }: RootTabScreenProps<"ProfileSCreen">) => {
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
      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, paddingHorizontal: 16 }} contentContainerStyle={{ paddingBottom: 30 }}>
        <Text variant="bold20" marginTop='xl'>Profile</Text>

        <Box
          padding="sl"
          marginTop="lg"
          backgroundColor="contactColor"
          borderRadius={4}
          flexDirection='row'
          alignItems='center'
          justifyContent='space-between'
          style={{
            shadowColor: 'rgba(0,0,0,0.2',
            elevation: 4,
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22
          }}
        >
          <Box flexDirection='row' alignItems='center'>
            <Icon name='profile-photo' size={50} />
            <Box paddingHorizontal='sm'>
              <Text variant="bold14" color="white">Profile</Text>
              <Text variant="regular12" color="white" textTransform='capitalize'>{`${userData?.firstName} ${userData?.lastName}`}</Text>
            </Box>
          </Box>

          <Pressable type='scale'>
            <IIcon name="pencil-outline" size={20} color={palette.white} />
          </Pressable>
        </Box>

        <Box
          backgroundColor="white"
          marginTop="lg"
          padding='md'
          style={{
            shadowColor: 'rgba(0,0,0,0.2',
            elevation: 4,
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22
          }}
        >
          <ProfileItem
            title='My Account '
            description='Make changes to your account'
            iconName='person-outline'
            itemPress={() => navigation.navigate("AccountDetails")}
          />

          <ProfileItem
            title='Saved Beneficiary'
            description='Manage your saved account'
            iconName='people-outline'
            itemPress={() => toast.success({ message: 'Hello world' })}
          />

          <ProfileItem
            title='Face ID / Touch ID'
            description='Manage your device security'
            iconName='lock-closed-outline'
            itemPress={() => toast.success({ message: 'Hello world' })}
          />

          <ProfileItem
            title='Two-Factor Authentication'
            description='Further secure your account for safety'
            iconName='shield-checkmark-outline'
            itemPress={() => toast.error({ message: 'Hello world' })}
          />

          <ProfileItem
            title='Log out'
            description='Close all running sessions'
            iconName='exit-outline'
            itemPress={toggleLogoutModal}
            logout
          />
        </Box>

        <Text variant="medium14" color="secondary" marginTop='lg'>More</Text>

        <Box
          backgroundColor="white"
          marginTop="lg"
          padding='md'
          style={{
            shadowColor: 'rgba(0,0,0,0.2',
            elevation: 4,
            shadowOffset: {
              width: 0,
              height: 1
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22
          }}
        >
          <ProfileItem
            title='Help & Support'
            iconName='notifications-outline'
            itemPress={() => toast.success({ message: 'Hello world' })}
          />

          <ProfileItem
            title='About App'
            iconName='heart-outline'
            itemPress={() => toast.success({ message: 'Hello world' })}
          />
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
  description?: string;
  logout?: boolean;
  iconName: string;
  itemPress?: () => void;
  title: string;
}

const ProfileItem = ({ logout, title, itemPress, description, iconName }: ProfileItemProps) => {
  return (
    <Pressable
      flexDirection='row'
      justifyContent='space-between'
      marginVertical='md'
      alignItems='center'
      height={34}
      onPress={itemPress}
      type='scale'
    >
      <Box flexDirection='row' alignItems='center'>
        <Box height={40} width={40} justifyContent='center' alignItems='center' backgroundColor={logout ? "redBackground" : "background"} borderRadius={20}>
          <IIcon name={iconName} size={20} color={logout ? palette.error : palette.contactColor} />
        </Box>
        <Box paddingLeft='ssm'>
          <Text variant='medium14' color={logout ? 'error' : 'textColor'}>{title}</Text>
          {description &&
            <Text variant='regular12' color={logout ? 'textRed' : 'secondaryText'}>{description}</Text>
          }
        </Box>
      </Box>

      <IIcon name="chevron-forward-outline" size={20} color={palette.secondary} />
    </Pressable>
  )
};

const styles = StyleSheet.create({
  maincontainer: {
    flex: 1,
    backgroundColor: palette.background
  },
});
