import { StyleSheet, } from 'react-native';
import React, { ReactNode } from 'react';
import Box from './Box';
import Text from './Text';
import Modal from "react-native-modal";

type ModalProps = {
  children?: ReactNode;
  closeModal: () => void;
  showModal: boolean;
  title?: string;
}

const CenterModal = ({
  children,
  closeModal,
  showModal,
  title,
}: ModalProps) => {
  return (
    <Box>
      <Modal
        animationIn="flipInY"
        animationOut='flipOutY'
        isVisible={showModal}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        onSwipeComplete={closeModal}
        statusBarTranslucent
        useNativeDriverForBackdrop
        backdropColor="rgba(30, 31, 38, 0.5)"
        backdropOpacity={1}
        avoidKeyboard
      >
        <Box backgroundColor='white' padding="md" borderRadius={16}>
          {title && <Text variant='bold16' textAlign='center'>{title}</Text>}
          
          {children}
        </Box>
      </Modal>
    </Box>
  )
};

export default CenterModal;

const styles = StyleSheet.create({});
