import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell, ResponsiveContainer } from 'recharts';

interface ChartData {
  name: string;
  value: number;
}

interface AssetManufacturerChartProps {
  data: ChartData[];
  onFilterChange: (key: 'fabricante', value: string) => void;
  activeFilter?: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-700 p-2 border border-gray-600 rounded-md text-sm shadow-lg">
          <p className="label text-white">{`${label} : ${payload[0].value} assets`}</p>
        </div>
      );
    }
    return null;
};

const AssetManufacturerChart: React.FC<AssetManufacturerChartProps> = ({ data, onFilterChange, activeFilter }) => {
  const handleBarClick = (data: any, index: number) => {
    if (data && data.name) {
      onFilterChange('fabricante', data.name);
    }
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
        layout="vertical"
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" horizontal={false} />
        <XAxis type="number" stroke="#9ca3af" />
        <YAxis type="category" dataKey="name" stroke="#9ca3af" width={80} tick={{fontSize: 12}} />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(168, 85, 247, 0.1)' }} />
        <Bar dataKey="value" name="Device Count" barSize={20} cursor="pointer" onClick={handleBarClick}>
            {data.map((entry, index) => (
                <Cell 
                    key={`cell-${index}`}
                    fill="#a855f7"
                    opacity={activeFilter && entry.name !== activeFilter ? 0.4 : 1}
                />
            ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default AssetManufacturerChart;
