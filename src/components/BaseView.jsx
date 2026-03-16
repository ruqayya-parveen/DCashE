/* eslint-disable react-native/no-inline-styles */
import { View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";


const BaseView = ({
  children,
  removeBottomPadding,
  removeTopPadding,
  containerStyles,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[{
        paddingTop: removeTopPadding ? 0 : insets?.top,
        paddingBottom: removeBottomPadding ? 0 : insets?.bottom
    }, containerStyles]}>
      {children}
    </View>
  );
};

export default BaseView;

