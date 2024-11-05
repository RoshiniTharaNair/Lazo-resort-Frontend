'use client';

import React, { useEffect, useState } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
import { RoundedTopBarFill } from '@/components/charts/rounded-topbar';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useMedia } from '@/hooks/use-media';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function SimpleBarChart({ className }: { className?: string }) {
  const [chartData, setChartData] = useState([]);
  const isMediumScreen = useMedia('(max-width: 1200px)', false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/ResortRoomType/getCount`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const formattedData = data.map((item: any) => ({
          name: item.roomType,
          totalInventory: item.total_inventory, // Ensure this key matches the response
        }));
        setChartData(formattedData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <WidgetCard title={'Resort Room Type Inventory Count'} className={className}>
      <div className="mt-8 mb-8 aspect-[1060/660] w-full lg:mt-10 lg:mb-10">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            barSize={isMediumScreen ? 18 : 24}
            margin={{
              left: -10,
            }}
            className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tickLine={false} dataKey="name" />
            <YAxis
              tickLine={true}
              tickCount={2} // Set the number of ticks on Y-axis
              interval={'preserveStartEnd'} // Preserve the start and end ticks
              domain={['auto', 'dataMax']} // Set the domain of Y-axis to 'auto'
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="totalInventory" fill="#5a5fd7" shape={<RoundedTopBarFill />} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
