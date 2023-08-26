import { NativeStackScreenProps } from "@react-navigation/native-stack";
// import { StoreItemType } from "../utils/files/inventory";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  HomeScreen: undefined;
  Inventory: undefined;
  AddNewItem: undefined;
  // EditItem: { item: StoreItemType };
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;
