import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, LabelList } from 'recharts';

const Chart = ({ total }) => {
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50', '#00C49F', '#FFBB28', '#FF8042', '#A28FD0'];

  const getPath = (x, y, width, height) => (
    `M${x},${y + height}
     C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3} ${x + width / 2}, ${y}
     C${x + width / 2},${y + height / 3} ${x + 2 * width / 3},${y + height} ${x + width}, ${y + height}
     Z`
  );

  const TriangleBar = (props) => {
    const { x, y, width, height, index } = props;
    const color = colors[index % colors.length];
    return <path d={getPath(x, y, width, height)} stroke="none" fill={color} />;
  };

  const renderCustomizedLabel = (props) => {
    const { x, y, width, value } = props;
    return (
      <text
        x={x + width / 2}
        y={y}
        fill="#666"
        textAnchor="middle"
        dy={-10}  // Adjust this value to position the label properly
        fontSize={12}
      >
        {value}
      </text>
    );
  };

  return (
    <div className='flex justify-center py-10'>
      <BarChart width={1700} height={400} data={total}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis axisLine={false} />
        <Tooltip />
        <Bar
          dataKey="fee"
          shape={(props) => <TriangleBar {...props} index={props.index} />}
          label={{ 
            position: 'top', 
            formatter: (value) => value,
            style: { fontSize: 12, fill: '#666' }
          }}
        >
          {total.map((entry, index) => (
            <React.Fragment key={`cell-${index}`} />
          ))}
        </Bar>
      </BarChart>
    </div>
  );
};

export default Chart;