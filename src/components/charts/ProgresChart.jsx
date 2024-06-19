


import * as React from 'react';
import {
  GaugeContainer,
  GaugeValueArc,
  GaugeReferenceArc,
  useGaugeState,
} from '@mui/x-charts/Gauge';

function GaugePointer({ value }) {
  const { valueAngle, outerRadius, cx, cy } = useGaugeState();

  if (valueAngle === null) {
    // No value to display
    return null;
  }

  // Calculate target position based on value angle
  const target = {
    x: cx + outerRadius * Math.sin(valueAngle),
    y: cy - outerRadius * Math.cos(valueAngle),
  };

  return (
    <g>
      <circle cx={cx} cy={cy} r={5} fill="red" />
      <path
        d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
        stroke="red"
        strokeWidth={3}
      />
    </g>
  );
}

export default function ProgresChart() {
  const [value, setValue] = React.useState(30); // Example initial value

  // Example: Animate value over time (just a demonstration)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue(prevValue => (prevValue + 1) % 101); // Increment value in a loop from 0 to 100
    }, 1000); // Change value every second

    return () => clearInterval(interval);
  }, []);

  return (
    <GaugeContainer
      width={200}
      height={200}
      startAngle={-110}
      endAngle={110}
      value={value}
    >
      <GaugeReferenceArc />
      <GaugeValueArc />
      <GaugePointer value={value} />
    </GaugeContainer>
  );
}
