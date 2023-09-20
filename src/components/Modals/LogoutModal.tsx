import { StyleSheet, TouchableOpacity, } from 'react-native';
import React from 'react';
import CenterModal from '../CenterModal';
import Box from '../Box';
import Text from '../Text';
import { palette } from '@/theme/';

type LogoutModalProps = {
  closeModal: () => void;
  modalVisible: boolean;
  logout: () => void
};

const LogoutModal = ({
  closeModal,
  logout,
  modalVisible
}: LogoutModalProps) => {
  return (
    <CenterModal
      closeModal={closeModal}
      showModal={modalVisible}
      title='Log out'
    >
      <Box marginTop="sl">
        <Text color='secondary' variant="regular12" textAlign='center' paddingHorizontal='xl'>
          Are you sure you want to log out? You'll need to login again to use the app.
        </Text>

        <Box flexDirection='row' justifyContent='space-between' marginTop='xl'>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.cancel}
            onPress={closeModal}
          >
            <Text variant='medium12' color='primary' >Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.logout}
            onPress={() => {
              closeModal();
              setTimeout(() => {
                logout();
              }, 500);
            }}
          >
            <Text variant='medium12' color='white' >Log out</Text>
          </TouchableOpacity>
        </Box>
      </Box>
    </CenterModal>
  )
};

export default LogoutModal;

const styles = StyleSheet.create({
  cancel: { 
    borderWidth: 1, 
    width: '48%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 8, 
    borderColor: palette.primary, 
    height: 40 
  },
  logout: { 
    width: '48%', 
    justifyContent: 'center', 
    alignItems: 'center', 
    borderRadius: 8, 
    backgroundColor: palette.contactColor, 
    height: 40 
  },
});
