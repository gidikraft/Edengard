import { GestureResponderEvent } from "react-native";
import Animated, {
  FadeIn,
  FadeInUp,
  FadeOut,
  FadeOutDown,
} from "react-native-reanimated";

// import { PaletteType, useTheme } from "@/constants/theme";

import ActivityIndicator from "./ActivityIndicator";
import Box from "./Box";
import Icon, { IconName } from "./Icons";
import Pressable, { PressableProps } from "./Pressable";
import Text, { TextProps } from "./Text";
import { PaletteType, useTheme } from "../../src/theme";
// import { PaletteType, useTheme  } from "src/theme";

const AnimatedBox = Animated.createAnimatedComponent(Box);

export type ButtonProps = PressableProps & {
  background?: PaletteType;
  icon?: IconName;
  iconSize?: number;
  isloading?: boolean;
  label: string;
  labelProps?: TextProps;
  variant?: "primary" | "secondary" | "textColor" | "white";
};

/**
 * Custom `Button` component with two variants (primary & secondary)
 * inherits Pressable Props
 * @see {@link PressableProps}
 */
function Button({
  background = "primary",
  icon,
  iconSize = 16,
  isloading = false,
  label,
  labelProps,
  variant = "primary",
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
      borderRadius={10}
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
            // size={16}
            // type={variant === "primary" ? "light" : "dark"}
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
          {icon ? (
            <Icon
              name={icon as IconName}
              size={iconSize}
              style={{ marginRight: spacing.sm }}
            />
          ) : undefined}
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
