'use client';

import { useState, useEffect } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import { DatePicker } from '@/components/ui/datepicker';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import cn from '@/utils/class-names';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function RoomAndInventoryGraph({ className }: { className?: string }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [resortRoomTypes, setResortRoomTypes] = useState<any[]>([]);
  const [inventories, setInventories] = useState<any[]>([]);

  useEffect(() => {
    fetchResortRoomTypes();
    fetchInventories();
  }, [selectedDate]); // Ensure it runs when the selectedDate changes

  const fetchResortRoomTypes = async () => {
    try {
      const response = await fetch(`${apiUrl}/resortRoomType/view`);
      const data = await response.json();
      setResortRoomTypes(data);
    } catch (error) {
      console.error('Error fetching resort room types:', error);
    }
  };

  const fetchInventories = async () => {
    try {
      const response = await fetch(`${apiUrl}/inventories/view`);
      const data = await response.json();
      setInventories(data);
    } catch (error) {
      console.error('Error fetching inventories:', error);
    }
  };

  const filteredResortRoomTypes = resortRoomTypes.filter(
    (type) => new Date(type.createdAt).toDateString() === selectedDate.toDateString()
  );
  const filteredInventories = inventories.filter(
    (inventory) => new Date(inventory.createdAt).toDateString() === selectedDate.toDateString()
  );

  const data = [
    { name: 'Resort Room Types', count: filteredResortRoomTypes.length },
    { name: 'Inventories', count: filteredInventories.length },
  ];

  const generateIntegerTicks = (maxValue: number) => {
    const ticks = [];
    for (let i = 0; i <= maxValue; i++) {
      ticks.push(i);
    }
    return ticks;
  };

  const maxValue = Math.max(...data.map((d) => d.count));

  return (
    <WidgetCard
      title={'Resort Room Types and Inventories'}
      action={
        <div className="relative z-10">
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date) => setSelectedDate(date)}
          dateFormat="MMM dd, yyyy"
          placeholderText="Select Date"
          showPopperArrow={false}
          className="w-36 relative z-10"
        />
        </div>
      }
      className={cn('@container', className)}
    >
      <div className="relative overflow-hidden h-96 w-full pb-4 pt-4 @sm:h-96 @xl:pb-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <XAxis dataKey="name" />
            <YAxis
              ticks={generateIntegerTicks(maxValue)}
              tickFormatter={(value) => Math.floor(value).toString()}
              domain={[0, 'auto']}
              allowDecimals={false}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}