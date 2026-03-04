import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React, { PropsWithChildren, ReactNode } from "react";
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
    <View style={{
        paddingTop: removeTopPadding ? 0 : insets?.top,
        paddingBottom: removeBottomPadding ? 0 : insets?.bottom
    }}>
      <Text>BaseView</Text>
      {children}
    </View>
  );
};

export default BaseView;

const styles = StyleSheet.create({});
