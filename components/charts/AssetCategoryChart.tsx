import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ChartData {
  name: string;
  value: number;
}

interface AssetCategoryChartProps {
  data: ChartData[];
  onFilterChange: (key: 'subcategoria', value: string) => void;
  activeFilter?: string;
}

const COLORS = ['#3b82f6', '#22c55e', '#eab308', '#a855f7', '#ec4899', '#64748b', '#f97316', '#14b8a6'];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-700 p-2 border border-gray-600 rounded-md text-sm shadow-lg">
          <p className="label text-white">{`${payload[0].name} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
};

const AssetCategoryChart: React.FC<AssetCategoryChartProps> = ({ data, onFilterChange, activeFilter }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }}/>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          innerRadius={60}
          fill="#8884d8"
          dataKey="value"
          stroke="none"
          onClick={(payload) => onFilterChange('subcategoria', payload.name)}
          cursor="pointer"
        >
          {data.map((entry, index) => (
            <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
                opacity={activeFilter && entry.name !== activeFilter ? 0.4 : 1}
            />
          ))}
        </Pie>
        <Legend
            iconSize={10}
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{ color: '#9ca3af', fontSize: '12px', paddingLeft: '20px' }}
            formatter={(value) => <span className="text-gray-400">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default AssetCategoryChart;
