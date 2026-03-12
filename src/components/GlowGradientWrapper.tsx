/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import { View } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import RNLiearGradient from 'react-native-linear-gradient';
import { colorList, COLORS } from '@/constants';
import { useTheme } from '@/hooks/useTheme';

const DEFAULT_COLORS = {
  background: colorList.darkBackgroundPrimary,
  solidNormal: colorList.darkBackgroundSecondary,
  solidError: colorList.critical,
  gradientPrimary: colorList.primary,
  gradientSecondary: colorList.darkBorder,
};

const GradientBorderWrapper = ({
  children = <View />,
  focused = false,
  error = false,
  borderRadius = 12,
  borderWidth = 2,
  backgroundColor = COLORS.background?.dark,
  colors = DEFAULT_COLORS,
  style = {},
  innerStyle = {},
}) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { width: w, height: h } = dimensions;
  const r = borderRadius;
  const s = borderWidth / 2;

  // Top + Left + Right path (3 sides, no bottom)
  // Starts at bottom-left (above corner), goes up → across top → down right → stops at bottom-right (above corner)
  const threeSidesPath =
    w && h
      ? `M ${s} ${h - r} L ${s} ${r} Q ${s} ${s} ${r} ${s} L ${w - r} ${s} Q ${
          w - s
        } ${s} ${w - s} ${r} L ${w - s} ${h - r}`
      : '';

  // Bottom path only (with rounded corners on bottom-left and bottom-right)
  const bottomPath =
    w && h
      ? `M ${w - s} ${h - r} Q ${w - s} ${h - s} ${w - r} ${h - s} L ${r} ${
          h - s
        } Q ${s} ${h - s} ${s} ${h - r}`
      : '';

  return (
    <View
      style={[{ height: 50 }, style]}
      onLayout={({ nativeEvent }) => {
        const { width, height } = nativeEvent.layout;
        setDimensions({ width, height });
      }}
    >
      {/* Inner content */}
      {error ? (
        <>
          <RNLiearGradient
            pointerEvents="none"
            colors={[colors.solidError, colorList.transparent]}
            start={{ x: 3, y: 0.5 }}
            end={{ x: 0.4, y: 0.5 }}
            style={{
              flex: 1,
              borderRadius,
              overflow: 'visible',
              zIndex: 2,
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          />
          <View style={[{ borderRadius }, innerStyle]}>{children}</View>
          {/* </RNLiearGradient> */}
        </>
      ) : (
        <View style={[{ borderRadius, backgroundColor }, innerStyle]}>
          {children}
        </View>
      )}
      {/* SVG border overlay — pointerEvents none so it never blocks touches */}
      {w > 0 && h > 0 && (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: w,
            height: h,
          }}
        >
          <Svg width={w} height={h} style={{ zIndex: -1 }}>
            <Defs>
              {/* Focused: grey → gold → grey */}
              <LinearGradient
                id="focusedGlow"
                x1="0"
                y1="0"
                x2={w}
                y2="0"
                gradientUnits="userSpaceOnUse"
              >
                <Stop
                  offset="0"
                  stopColor={colors.gradientSecondary}
                  stopOpacity="1"
                />
                <Stop
                  offset="0.5"
                  stopColor={colors.gradientPrimary}
                  stopOpacity="1"
                />
                <Stop
                  offset="1"
                  stopColor={colors.gradientSecondary}
                  stopOpacity="1"
                />
              </LinearGradient>
            </Defs>

            {/* Top + Left + Right — always grey, red on error */}
            <Path
              d={threeSidesPath}
              fill="none"
              stroke={
                error
                  ? colors.solidError
                  : focused
                  ? colors.gradientSecondary
                  : colors.solidNormal
              }
              strokeWidth={borderWidth}
            />

            {/* Bottom — gradient on focused/error, grey on blur */}
            <Path
              d={bottomPath}
              fill="none"
              stroke={
                error
                  ? colors.solidError
                  : focused
                  ? 'url(#focusedGlow)'
                  : colors.solidNormal
              }
              strokeWidth={borderWidth}
            />
          </Svg>
        </View>
      )}
    </View>
  );
};

export default GradientBorderWrapper;
