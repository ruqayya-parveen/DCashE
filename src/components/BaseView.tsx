/* eslint-disable react-native/no-inline-styles */
import { StyleSheet, View, ViewStyle } from "react-native";
import React, { PropsWithChildren } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  removeTopPadding?: boolean;
  removeBottomPadding?: boolean;
  containerStyles?: ViewStyle;
};

const BaseView = ({
  children,
  removeBottomPadding,
  removeTopPadding,
  containerStyles,
}: PropsWithChildren<Props>) => {
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

const styles = StyleSheet.create({});
