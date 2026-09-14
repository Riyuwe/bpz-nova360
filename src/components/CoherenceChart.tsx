import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Polyline, Circle, Line, Text as SvgText } from 'react-native-svg';

interface CoherenceChartProps {
  data: number[];
  labels: string[];
  color?: string;
}

export const CoherenceChart: React.FC<CoherenceChartProps> = ({
  data,
  labels,
  color = '#7C3AED',
}) => {
  const width = 300;
  const height = 100;
  const padding = { top: 10, right: 10, bottom: 24, left: 30 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  const max = Math.max(...data) * 1.1;
  const min = 0;

  const points = data.map((v, i) => {
    const x = padding.left + (i / (data.length - 1)) * plotW;
    const y = padding.top + (1 - (v - min) / (max - min)) * plotH;
    return { x, y, v };
  });

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(' ');

  return (
    <View style={styles.container}>
      <Svg width={width} height={height}>
        {/* Grid lines */}
        {[0, 0.5, 1].map((t, i) => {
          const y = padding.top + t * plotH;
          const val = (max * (1 - t)).toFixed(1);
          return (
            <React.Fragment key={i}>
              <Line
                x1={padding.left}
                y1={y}
                x2={width - padding.right}
                y2={y}
                stroke="#2D2640"
                strokeWidth={1}
              />
              <SvgText x={padding.left - 4} y={y + 4} textAnchor="end" fontSize={9} fill="#6B7280">
                {val}
              </SvgText>
            </React.Fragment>
          );
        })}
        {/* Line */}
        <Polyline
          points={polylinePoints}
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {/* Dots */}
        {points.map((p, i) => (
          <Circle key={i} cx={p.x} cy={p.y} r={3} fill={color} />
        ))}
        {/* X labels */}
        {labels.map((label, i) => {
          const x = padding.left + (i / (labels.length - 1)) * plotW;
          return (
            <SvgText
              key={i}
              x={x}
              y={height - 4}
              textAnchor="middle"
              fontSize={9}
              fill="#6B7280"
            >
              {label}
            </SvgText>
          );
        })}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 8,
  },
});
