// import { useStyle } from "hooks";
import React, { ReactNode } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  onPress: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  label: string;
  loadingText?: string;
  size?: string;
  icon?: ReactNode;
} & React.ComponentProps<typeof View>;

const Button = ({
  onPress,
  isLoading,
  isDisabled,
  loadingText,
  label,
  icon,
  size,
}: Props) => {
  const stateStyle = isLoading ? styles.loading : styles.normal;
  // const sizeStyle = size ? styles[size] : styles.medium;

  let textColor = "";
  // if (ui.buttonVariant === "danger") textColor = colors.red;
  // if (ui.buttonVariant === "blueOutline") textColor = colors.blue;

  return (
    <Pressable onPress={onPress} disabled={isLoading || isDisabled}>
      <View
        style={[
          styles.wrapper,
          stateStyle,
          isDisabled && styles.disabled,
        ]}
      >
        {icon}
        <Text
          style={[
            styles.text,
            // textColor && { color: textColor },
            isLoading && styles.loading,
          ]}
          minimumFontScale={1}
          maxFontSizeMultiplier={1}
        >
          {isLoading && loadingText ? loadingText : label}
        </Text>
        {isLoading && <ActivityIndicator color={'#000'} />}
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  loading: {
    marginRight: 10,
    opacity: 0.6,
    backgroundColor: '#001D6E',
  },
  medium: {
    paddingBottom: 16,
    paddingLeft: 12,
    paddingRight: 12,
    paddingTop: 16,
  },
  normal: {
    opacity: 1,
    backgroundColor: "#D1AE6C",
  },
  disabled: {
    opacity: 0.6,
    backgroundColor: '#001D6E',
  },
  // eslint-disable-next-line react-native/no-unused-styles
  small: {
    paddingBottom: 10,
    paddingLeft: 2,
    paddingRight: 2,
    paddingTop: 10,
  },
  text: {
    color: '#000',
    fontFamily: "Roboto_700Bold",
    fontSize: 14,
    textAlign: "center",
  },
  wrapper: {
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    height: 45,
  },
});

export const buttonStyles = styles;
