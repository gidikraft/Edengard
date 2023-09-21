import React, { useContext, useState } from "react";
import {
  StyleSheet,
  TextInput as RTextInput,
  TextStyle,
  KeyboardTypeOptions,
  Platform,
  TouchableOpacity,
  ViewStyle,
  View,
} from "react-native";
import { Controller, Control } from "react-hook-form";
import Text from "./Text";
import Icon from "./Icons";
import Pressable from "./Pressable";
import { PaletteType } from "@/theme/";

export enum inputtype {
  select = "select",
  input = "input",
  date = "date",
}

type InputProps = {
  secureTextEntry?: boolean;
  autoFocus?: boolean;
  label?: string;
  keyboardType?: KeyboardTypeOptions;
  placeholder: string;
  // ui?: StylingProps<TextStyle>;
  name: string;
  control: Control<any>;
  errorMessage?: string;
  rules?: any;
  editable?: boolean;
  defaultValue?: string;
  multiline?: boolean;
  numberOfLines?: number;
  submitfunc?: any;
  inputStyle?: TextStyle;
  inputContainerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  rightLabel?: string;
  rightIcon?: boolean;
  onRightLabelPress?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onPress?: () => void;
  showDatePicker?: boolean;
  selectDate?: (date: Date) => void;
  closeDateModal?: () => void;
  type?: inputtype;
  textStyle?: TextStyle;
  containerStyle?: ViewStyle
};

const CustomTextInput = ({
  secureTextEntry = false,
  autoFocus = false,
  defaultValue,
  control,
  editable = true,
  name,
  label,
  placeholder,
  inputContainerStyle,
  errorMessage,
  keyboardType = "default",
  multiline = false,
  numberOfLines = 1,
  submitfunc,
  rules,
  inputStyle,
  labelStyle,
  rightLabel,
  rightIcon,
  onRightLabelPress,
  onFocus,
  onBlur,
  showDatePicker,
  selectDate,
  closeDateModal,
  type,
  onPress,
  textStyle,
  containerStyle
}: InputProps) => {
  const [showPassword, setShowPassword] = useState(true);

  const [borderColor, setBorderColor] = useState("rgba(205, 201, 201, 0.12)");
  const [backgroundColor, setBackgroundColor] = useState<string>("rgba(205, 201, 201, 0.12)");
  const hitSlop = { top: 20, left: 5, bottom: 10, right: 5 };
  const labelHitSlop = { top: 25, left: 20, bottom: 20, right: 20 };

  const handleBlur = () => {
    setBorderColor("rgba(205, 201, 201, 0.12)");
    setBackgroundColor("rgba(205, 201, 201, 0.12)");
    if (onBlur) {
      onBlur();
    }
  };

  const handleFocus = () => {
    setBorderColor("rgba(17, 43, 244, 0.32)");
    setBackgroundColor("white");
    if (onFocus) {
      onFocus();
    }
  };

  const togglePassword = () => setShowPassword(prev => !prev);

  return (
    <View
      style={{
        ...inputContainerStyle,
        // height: 45,
        width: "100%",
      }}>
      <Controller
        control={control}
        rules={rules}
        render={({ field: { onChange, value } }) => (
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
              {label &&
                <Text variant="medium12" color='textColor' style={labelStyle}>
                  {label}
                </Text>
              }
              {rightLabel && (
                <TouchableOpacity
                  activeOpacity={0.5}
                  hitSlop={labelHitSlop}
                  onPress={onRightLabelPress}>
                  <Text variant="medium12" color='blue'>
                    {rightLabel}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
            <View
              style={{
                ...styles(editable).inputArea,
                ...containerStyle,
                borderWidth: 1,
                borderColor,
                backgroundColor
              }}>
              <RTextInput
                secureTextEntry={secureTextEntry && showPassword}
                autoFocus={autoFocus}
                defaultValue={defaultValue}
                editable={editable}
                autoCapitalize="none"
                style={{
                  ...styles(editable).input,
                  ...inputStyle,
                  ...textStyle,
                }}
                placeholder={placeholder}
                // placeholderTextColor={colors.bodyLight}
                onBlur={() => handleBlur()}
                onFocus={() => handleFocus()}
                onChangeText={onChange}
                value={value}
                keyboardType={keyboardType}
                multiline={multiline}
                textAlignVertical={multiline ? "top" : "auto"}
                numberOfLines={numberOfLines}
                onSubmitEditing={() => submitfunc?.()}
                hitSlop={hitSlop}
                onPressIn={onPress}
              />
              {type === "date" || type === "select" ? (
                <TouchableOpacity
                  hitSlop={hitSlop}
                  style={{ marginRight: 4 }}
                  onPress={onPress}
                >
                  {/* <Entypo
                    name="chevron-small-down"
                    size={24}
                    color="rgba(22, 22, 22, 0.8)"
                  /> */}
                </TouchableOpacity>
              ) : null}
              {rightIcon ? (
                <TouchableOpacity
                  hitSlop={hitSlop}
                  style={{ marginRight: 14 }}
                  onPress={onPress}>
                  {/* <LockIcon /> */}
                </TouchableOpacity>
              ) : null}
              {secureTextEntry &&
                <Pressable marginRight='sml' onPress={togglePassword}>
                  <Icon name={!showPassword ? "secured" : 'unsecured'} />
                </Pressable>
              }
            </View>
          </View>
        )}
        name={name}
      />

      {errorMessage && (
        <Text variant='medium12' color='error' marginTop="xs" >
          {errorMessage}
        </Text>
      )}
      {/* {type === "date" && (
        <DateTimePickerModal
          isVisible={showDatePicker}
          mode="date"
          onConfirm={selectDate}
          onCancel={closeDateModal}
        />
      )} */}
    </View>
  );
};

export default CustomTextInput;

const styles = (editable: boolean) => {
  return StyleSheet.create({
    input: {
      borderColor: "rgba(205, 201, 201, 0.12)",
      borderWidth: 1,
      // color: editable ? "inherit" : theme.colors.bodyLight,
      fontFamily: "Inter-Regular",
      fontSize: 14,
      height: Platform.OS === "android" ? 49 : 44,
      paddingHorizontal: 12,
      flex: 1,
      borderRadius: 8,
      // overflow: 'hidden'
    },
    inputArea: {
      backgroundColor: "rgba(22, 22, 22, 0.05)",
      flexDirection: "row",
      alignItems: "center",
      height: 45,
      borderRadius: 8,
      marginTop: 8,
    },
  });
};
