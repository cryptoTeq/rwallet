import React from "react";
import { View, Text, StatusBar } from "react-native";
import { useMyWallet } from "../../hooks";
import { COLORS, FONTS, screens, icons } from "../../constants";

import { Assets, Header, BalanceInfo, PageLoading } from "../../components";

const Wallet = ({ navigation }) => {
  const { isLoading, data } = useMyWallet();
  const { assets, totalValue, currencyCode, currencySign } = data;

  const pressHandler = (asset) => {
    navigation.navigate(screens.ASSET_DETAILS, { asset });
  };

  const handleMenuPress = () => {
    navigation.navigate(screens.SETTINGS);
  };
  if (isLoading) return <PageLoading />;

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.black }}>
      <StatusBar barStyle="light-content" />
      <Header
        onMenuPress={handleMenuPress}
        titleComponent={
          <BalanceInfo
            totalValue={totalValue}
            currencyCode={currencyCode}
            currencySign={currencySign}
          />
        }
        toolbarButtons={[
          {
            name: "send",
            label: "Send",
            icon: icons.arrowUp,
            disabled: true,
          },
          {
            name: "receive",
            label: "Receive",
            icon: icons.arrowDown,
            disabled: true,
          },
        ]}
      />
      <Assets assets={assets} onPress={pressHandler} />
    </View>
  );
};

export default Wallet;
