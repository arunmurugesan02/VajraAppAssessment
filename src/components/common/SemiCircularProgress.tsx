import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

type SemiCircularProgressProps = {
  size?: number;
  strokeWidth?: number;
  percentage?: number;
  value?: string | number;
  color?: string;
  backgroundColor?: string;
};

const SemiCircularProgress: React.FC<SemiCircularProgressProps> = ({
  size = 160,
  strokeWidth = 14,
  percentage = 0,
  value = '',
  color = '#000000',
  backgroundColor = '#D3D3D3',
}) => {
  // Clamp the percentage between 0 and 100
  const pct = Math.max(0, Math.min(percentage, 100));
  const radius = (size - strokeWidth) / 2;
  const center = size / 2;

  // Helpers for arc path
  const polarToCartesian = (
    cx: number,
    cy: number,
    r: number,
    angle: number,
  ) => {
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  const describeArc = (startAngle: number, endAngle: number, r: number) => {
    const start = polarToCartesian(center, center, r, startAngle);
    const end = polarToCartesian(center, center, r, endAngle);
    const largeArcFlag = endAngle - startAngle <= Math.PI ? 0 : 1;

    return [
      `M ${start.x} ${start.y}`,
      `A ${r} ${r} 0 ${largeArcFlag} 1 ${end.x} ${end.y}`,
    ].join(' ');
  };

  // Arc angles
  const startAngle = Math.PI;
  const endAngleFull = 0;
  const endAngleProgress = Math.PI * (1 - pct / 100);

  // Paths
  const backgroundPath = describeArc(startAngle, endAngleFull, radius);
  const progressPath = describeArc(startAngle, endAngleProgress, radius);

  return (
    <View style={styles.container}>
      <Svg width={size} height={size / 2} viewBox={`0 0 ${size} ${size / 2}`}>
        {/* Background Arc */}
        <Path
          d={backgroundPath}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />

        {/* Progress Arc */}
        <Path
          d={progressPath}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
        />
      </Svg>
      <View style={[styles.labelContainer, {top: size / 4}]}>
        <Text style={styles.label}>{value}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  labelContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000000',
  },
});

export default SemiCircularProgress;
