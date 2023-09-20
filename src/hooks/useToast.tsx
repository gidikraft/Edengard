import Snackbar from 'react-native-snackbar';
import { palette } from '@/theme/';

type ToastProps = {
  actionLabel?: string;
  message: string;
  toastAction?: () => void;
  length?: number
}

export const useToast = () => {
  const error = ({
    actionLabel = "Close",
    message,
    toastAction,
  }: ToastProps) => {
    Snackbar.show({
      text: message,
      duration: Snackbar.LENGTH_INDEFINITE,
      backgroundColor: palette.error,
      textColor: palette.white,
      action: {
        text: actionLabel,
        textColor: palette.textColor,
        onPress: () => {
          Snackbar.dismiss();
          toastAction?.();
        },
      },
      marginBottom: 30,
    });
  }

  const success = ({ length = Snackbar.LENGTH_LONG, message }: ToastProps) => {
    Snackbar.show({
      text: message,
      duration: length,
      backgroundColor: palette.success,
      textColor: palette.textColor,
      marginBottom: 30,
    });
  }

  const info = ({ length = Snackbar.LENGTH_LONG, message }: ToastProps) => {
    Snackbar.show({
      text: message,
      duration: length,
      textColor: palette.white,
      marginBottom: 30,
    });
  }

  return { error, success, info };
}
