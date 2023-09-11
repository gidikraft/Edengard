import { ActivityIndicator, GestureResponderEvent } from "react-native";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutDown,
} from "react-native-reanimated";

import Box from "./Box";
import Icon, { IconName } from "./Icons";
import Pressable, { PressableProps } from "./Pressable";
import Text, { TextProps } from "./Text";
import { PaletteType, useTheme } from "@/theme";

const AnimatedBox = Animated.createAnimatedComponent(Box);

export type ButtonProps = PressableProps & {
  background?: PaletteType;
  loadingColor?: PaletteType;
  icon?: IconName;
  iconSize?: number;
  isloading?: boolean;
  label: string;
  labelProps?: TextProps;
  variant?: "primary" | "secondary" | "textColor" | "white";
};

/**
 * Custom `Button` component with multi variants (primary | secondary | "textColor" | "white)
 * inherits Pressable Props
 * @see {@link PressableProps}
 */
function Button({
  background = "primary",
  loadingColor= "black",
  icon,
  iconSize = 16,
  isloading = false,
  label,
  labelProps,
  variant = "textColor",
  onPress,
  ...rest
}: ButtonProps) {
  const { spacing } = useTheme();
  const handlePress = (event?: GestureResponderEvent | undefined) => {
    if (isloading) return;
    if (onPress) {
      onPress(event);
    }
  };
  return (
    <Pressable
      alignItems="center"
      backgroundColor={background}
      borderRadius={spacing.sml}
      disabled={isloading}
      justifyContent="center"
      onPress={handlePress}
      // paddingVertical="md"
      height={45}
      type="scale"
      {...rest}
    >
      {isloading ? (
        <AnimatedBox
          entering={FadeInUp}
          exiting={FadeOutDown}
          key={`${isloading}`}
        >
          <ActivityIndicator
            size={spacing.md}
            color={loadingColor}
          />
        </AnimatedBox>
      ) : (
        <AnimatedBox
          alignItems="center"
          entering={FadeIn}
          exiting={FadeOut}
          flexDirection="row"
          justifyContent="center"
        >
          {icon && (
            <Icon
              name={icon as IconName}
              size={iconSize}
              style={{ marginRight: spacing.sm }}
            />
          )}
          <Text
            color={variant}
            textAlign="justify"
            variant="button"
            {...labelProps}
          >
            {label}
          </Text>
        </AnimatedBox>
      )}
    </Pressable>
  );
}

export default Button;
