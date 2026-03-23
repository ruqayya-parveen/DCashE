import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import TabBarBg from '@/components/TabBarBg';
import BaseView from '@/components/BaseView';
import { SIZES } from '@/constants';
import { GlassEffectView } from 'react-native-glass-effect-view';
import CustomText from '@/components/CustomText';
import { IMAGES, SVGS } from '@/constants/imagePath';

const Home = () => {
  return (
    <BaseView>
      <ScrollView
        style={{
          flex: 1,
          padding: SIZES.twenty,
        }}
        contentContainerStyle={{
          gap: SIZES.ten,
          paddingBottom: SIZES.hundredSixty,
        }}
      >
        {[1, 2, 1, 1, 1, 1, 1, 1, 1, 1].map(val => (
          <View></View>
        ))}
      </ScrollView>
    </BaseView>
  );
};

export default Home;

const styles = StyleSheet.create({});
