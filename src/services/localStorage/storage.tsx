import AsyncStorage from '@react-native-async-storage/async-storage'
import { Platform } from 'react-native'

export const saveToLS = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    // saving error
  }
};

export const getFromLS = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key)
    if (!data) return data

    return JSON.parse(data)
  } catch (e) {
    // saving error
  }
};

export const removeFromLS = async (key: string) => {
  await AsyncStorage.removeItem(key)
};

export const clearLS = async () => {
  const asyncStorageKeys = await AsyncStorage.getAllKeys()

  if (asyncStorageKeys.length > 0) {
    if (Platform.OS === 'android') {
      await AsyncStorage.clear()
    }
    if (Platform.OS === 'ios') {
      await AsyncStorage.multiRemove(asyncStorageKeys)
    }
  }
};
