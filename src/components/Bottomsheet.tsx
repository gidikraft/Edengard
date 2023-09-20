import { Dimensions, StyleSheet, ViewStyle } from 'react-native';
import React, { ReactNode } from 'react';
import Box from './Box';
import Modal from "react-native-modal";
import Text from './Text';

type BottomSheetProps = {
  showModal: boolean;
  closeModal: () => void;
  children?: ReactNode;
  modalHeight?: number;
  avoidkeyboard?: boolean;
  withoutCloseIcon?: boolean;
  withoutSwipe?: boolean;
  style?: ViewStyle;
};

const Bottomsheet = ({
  showModal,
  closeModal,
  children,
  modalHeight,
  avoidkeyboard,
  withoutCloseIcon,
  withoutSwipe,
  style
}: BottomSheetProps) => {
  const { height } = Dimensions.get("window");

  return (
    <Box>
      <Modal
        isVisible={showModal}
        onBackdropPress={closeModal}
        onSwipeComplete={closeModal}
        deviceHeight={height}
        statusBarTranslucent
        useNativeDriverForBackdrop
        backdropColor="rgba(30, 31, 38, 0.5)"
        backdropOpacity={1}
        avoidKeyboard={avoidkeyboard}
        style={styles.container}
        swipeDirection={"down"}
        >
        <Box >
          {children}
        </Box>
      </Modal>
    </Box>
  )
};

export default Bottomsheet;

const styles = StyleSheet.create({
  container: {
    margin: 0,
    padding: 0,
    justifyContent: "flex-end",
  },
});
