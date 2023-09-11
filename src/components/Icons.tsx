import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SvgProps } from "react-native-svg";

import address_book from "../assets/svg/address_book.svg";
import arrow_back from "../assets/svg/arrow_back_ios.svg";
import bell from "../assets/svg/bell.svg";
import home from "@/assets/svg/home_tab.svg";
import homeInactive from "@/assets/svg/home_tab_inactive.svg";
import link from "@/assets/svg/up_claret.svg";
import profilePic from "@/assets/svg/profile_pic.svg";
import settings from "@/assets/svg/settings.svg";
import transactions from "@/assets/svg/transactions_tab_active.svg";
import transactionsInactive from "@/assets/svg/transactions_tab_inactive.svg";
import transfer from "@/assets/svg/transfer_tab_active.svg";
import transferInactive from "@/assets/svg/transfer_tab_inactive.svg";

type IconFunction = React.FC<SvgProps>;

export const ICONS = {
    address_book,
    "arrow_back": arrow_back,
    bell,
    home,
    "home-inactive": homeInactive,
    link,
    "profile_pic": profilePic,
    settings,
    transactions,
    "transactions-inactive": transactionsInactive,
    transfer,
    "transfer-inactive": transferInactive,
};

export type IconName = keyof typeof ICONS;
export type IconProps = SvgProps & {
    name: IconName;
    size?: number;
    style?: StyleProp<ViewStyle>;
    stroke?: string;
    outerStroke?: string;
};

/**
 * Custom Icon component based on design systems used in the figma
 */
function Icon({ name, size = 24, style, ...props }: IconProps) {
    const IconImpl: IconFunction = ICONS[name as IconName];
    return IconImpl ?
        <IconImpl height={size} style={style} width={size} {...props} />
        : null;
}

export default Icon;