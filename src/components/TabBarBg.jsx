/* eslint-disable react-native/no-inline-styles */
import { colorList, COLORS, DIMENSIONS, SIZES } from '@/constants';
import { useTheme } from '@/hooks/useTheme';
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Path } from 'react-native-svg';

const DEFAULT_COLORS = {
  background: colorList.darkBackgroundPrimary,
  solidNormal: colorList.darkBackgroundSecondary,
  solidError: colorList.critical,
  gradientPrimary: colorList.primary,
  gradientSecondary: colorList.darkBorder,
};

export const TabBarBg = ({
  width = DIMENSIONS.width * 0.92,
  maxWidth = 600,
  height = SIZES.seventyTwo,
  borderRadius = 42,
  borderWidth = 1,
  backgroundColor = '#fff',
  gradientStart = '#FF6B6B',
  gradientEnd = '#4ECDC4',
  colors = DEFAULT_COLORS,
  gradientPosition = 'center',
  useMeasuredDimensions = true, // New prop to control whether to measure or use provided dimensions
}) => {
  const strokeWidth = borderWidth;
  const { theme } = useTheme();
  const viewRef = useRef(null);

  // Initialize dimensions with provided props
  const [dimensions, setDimensions] = useState({
    width: Math.min(maxWidth, width),
    height: height,
  });

  const { width: w, height: h } = dimensions;
  const r = borderRadius;
  const s = borderWidth / 2;

  const getGradientConfig = type => {
    const configs = {
      center: {
        id: 'gradientCenter',
        stops: [
          { offset: '0', color: colors.gradientSecondary },
          { offset: '0.5', color: colors.gradientPrimary },
          { offset: '1', color: colors.gradientSecondary },
        ],
      },
      left: {
        id: 'gradientLeft',
        stops: [
          { offset: '0', color: colors.gradientSecondary },
          { offset: '0.1', color: colors.gradientPrimary },
          { offset: '1', color: colors.gradientSecondary },
        ],
      },
      right: {
        id: 'gradientRight',
        stops: [
          { offset: '0', color: colors.gradientSecondary },
          { offset: '0.8', color: colors.gradientPrimary },
          { offset: '1', color: colors.gradientSecondary },
        ],
      },
      leftConcentrate: {
        id: 'gradientLeftConcentrate',
        stops: [
          { offset: '0', color: colors.gradientPrimary },
          { offset: '0.8', color: colors.gradientSecondary },
          { offset: '1', color: colors.gradientSecondary },
        ],
      },
      rightConcentrate: {
        id: 'gradientRightConcentrate',
        stops: [
          { offset: '0', color: colors.gradientSecondary },
          { offset: '0.8', color: colors.gradientSecondary },
          { offset: '1', color: colors.gradientPrimary },
        ],
      },
    };
    return configs[type] || configs.center;
  };

  const gradConfigs = {
    center: getGradientConfig('center'),
    left: getGradientConfig('left'),
    right: getGradientConfig('right'),
    leftConcentrate: getGradientConfig('leftConcentrate'),
    rightConcentrate: getGradientConfig('rightConcentrate'),
  };

  const getGradientUrl = (type = 'center') => {
    return `url(#${gradConfigs[type].id})`;
  };

  // Only measure if useMeasuredDimensions is true
  useEffect(() => {
    if (!useMeasuredDimensions) return;

    const measureView = () => {
      if (viewRef.current) {
        viewRef.current.measure((x, y, newWidth, newHeight) => {
          console.log(x, y, newWidth, newHeight, 'use layout effect ');
          if (newWidth > 0 && newHeight > 0) {
            setDimensions({
              width: newWidth,
              height: newHeight + 2 * borderWidth,
            });
          }
        });
      }
    };

    const timer = setTimeout(() => {
      requestAnimationFrame(measureView);
    }, 100);

    return () => clearTimeout(timer);
  }, [useMeasuredDimensions, borderWidth]);

  // Update dimensions when props change
  useEffect(() => {
    if (!useMeasuredDimensions) {
      setDimensions({
        width: Math.min(maxWidth, width),
        height: height,
      });
    }
  }, [width, height, maxWidth, useMeasuredDimensions]);

  // Don't render if dimensions are invalid
  if (!w || !h || w <= 0 || h <= 0) {
    return (
      <View
        ref={viewRef}
        style={{
          width: useMeasuredDimensions ? width + borderWidth : width,
          left: useMeasuredDimensions ? -borderWidth : 0,
          maxWidth,
          height,
          backgroundColor: COLORS.background?.[theme],
          borderRadius: 100,
        }}
      />
    );
  }

  const paths = {
    leftSide: `M ${s} ${h - r} L ${s} ${r}`,
    topLeftCorner: `M ${s} ${r} Q ${s} ${s} ${r} ${s}`,
    topSide: `M ${r} ${s} L ${w - r} ${s}`,
    topRightCorner: `M ${w - r} ${s} Q ${w - s} ${s} ${w - s} ${r}`,
    rightSide: `M ${w - s} ${r} L ${w - s} ${h - r}`,
    bottomRightCorner: `M ${w - s} ${h - r} Q ${w - s} ${h - s} ${w - r} ${
      h - s
    }`,
    bottomSide: `M ${w - r} ${h - s} L ${r} ${h - s}`,
    bottomLeftCorner: `M ${r} ${h - s} Q ${s} ${h - s} ${s} ${h - r}`,
  };

  return (
    <View
      ref={viewRef}
      style={{
        width: useMeasuredDimensions ? width + borderWidth : width,
        left: useMeasuredDimensions ? -borderWidth : 0,
        maxWidth,
        height,
        backgroundColor: COLORS.background?.[theme],
        borderRadius: 100,
      }}
    >
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
        <Svg
          width={w + borderWidth}
          height={h + borderWidth}
          style={{ zIndex: -1, top: -borderWidth }}
        >
          <Defs>
            {/* Center Gradient */}
            <LinearGradient
              id={gradConfigs.center.id}
              x1="0"
              y1="0"
              x2="1"
              y2="0"
              gradientUnits="objectBoundingBox"
            >
              {gradConfigs.center.stops.map((stop, idx) => (
                <Stop
                  key={`center-${idx}`}
                  offset={stop.offset}
                  stopColor={stop.color}
                  stopOpacity="1"
                />
              ))}
            </LinearGradient>

            {/* Left Gradient */}
            <LinearGradient
              id={gradConfigs.left.id}
              x1="0"
              y1="0"
              x2="1"
              y2="0"
              gradientUnits="objectBoundingBox"
            >
              {gradConfigs.left.stops.map((stop, idx) => (
                <Stop
                  key={`left-${idx}`}
                  offset={stop.offset}
                  stopColor={stop.color}
                  stopOpacity="1"
                />
              ))}
            </LinearGradient>

            {/* Right Gradient */}
            <LinearGradient
              id={gradConfigs.right.id}
              x1="0"
              y1="0"
              x2="1"
              y2="0"
              gradientUnits="objectBoundingBox"
            >
              {gradConfigs.right.stops.map((stop, idx) => (
                <Stop
                  key={`right-${idx}`}
                  offset={stop.offset}
                  stopColor={stop.color}
                  stopOpacity="1"
                />
              ))}
            </LinearGradient>

            {/* Left Concentrate Gradient */}
            <LinearGradient
              id={gradConfigs.leftConcentrate.id}
              x1="0"
              y1="0"
              x2="1"
              y2="0"
              gradientUnits="objectBoundingBox"
            >
              {gradConfigs.leftConcentrate.stops.map((stop, idx) => (
                <Stop
                  key={`leftConc-${idx}`}
                  offset={stop.offset}
                  stopColor={stop.color}
                  stopOpacity="1"
                />
              ))}
            </LinearGradient>

            {/* Right Concentrate Gradient */}
            <LinearGradient
              id={gradConfigs.rightConcentrate.id}
              x1="0"
              y1="0"
              x2="1"
              y2="0"
              gradientUnits="objectBoundingBox"
            >
              {gradConfigs.rightConcentrate.stops.map((stop, idx) => (
                <Stop
                  key={`rightConc-${idx}`}
                  offset={stop.offset}
                  stopColor={stop.color}
                  stopOpacity="1"
                />
              ))}
            </LinearGradient>
          </Defs>

          <Path
            d={paths.leftSide}
            fill="none"
            stroke={getGradientUrl('center')}
            strokeWidth={borderWidth}
          />
          <Path
            d={paths.topLeftCorner}
            fill="none"
            stroke={getGradientUrl('center')}
            strokeWidth={borderWidth}
          />
          <Path
            d={paths.topSide}
            fill="none"
            stroke={colors.gradientSecondary}
            strokeWidth={borderWidth}
          />
          <Path
            d={paths.topRightCorner}
            fill={'none'}
            stroke={getGradientUrl('rightConcentrate')}
            strokeWidth={borderWidth}
          />
          <Path
            d={paths.rightSide}
            fill={'none'}
            stroke={colors.gradientSecondary}
            strokeWidth={borderWidth}
          />
          <Path
            d={paths.bottomRightCorner}
            fill={'none'}
            stroke={getGradientUrl('rightConcentrate')}
            strokeWidth={borderWidth}
          />
          <Path
            d={paths.bottomSide}
            fill={'none'}
            stroke={getGradientUrl('left')}
            strokeWidth={borderWidth}
          />
          <Path
            d={paths.bottomLeftCorner}
            fill={'none'}
            stroke={colors.gradientSecondary}
            strokeWidth={borderWidth}
          />
        </Svg>
      </View>
    </View>
  );
};

export default TabBarBg;
