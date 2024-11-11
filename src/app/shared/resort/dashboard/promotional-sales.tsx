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
  const [bookingRooms, setBookingRooms] = useState<any[]>([]);
  const [inventories, setInventories] = useState<any[]>([]);

  useEffect(() => {
    fetchBookingRooms();
    fetchInventories();
  }, [selectedDate]); // Ensure it runs when the selectedDate changes

  const fetchBookingRooms = async () => {
    try {
      const response = await fetch(`${apiUrl}/bookingroom/view/`);
      const data = await response.json();
      setBookingRooms(data);
    } catch (error) {
      console.error('Error fetching booking rooms:', error);
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

  const filteredBookingRooms = bookingRooms.filter(
    (room) => new Date(room.createdAt).toDateString() === selectedDate.toDateString()
  );

  const filteredInventories = inventories.filter(
    (inventory) => new Date(inventory.effectiveDate).toDateString() === selectedDate.toDateString()
  );

  // Calculate the sum of avlCount (inventory) and the sum of numberOfRooms (rooms booked) on the selected day
  const totalInventory = filteredInventories.reduce((sum, inv) => sum + inv.avlCount, 0);
  const totalRoomsBooked = filteredBookingRooms.reduce((sum, room) => sum + room.numberOfRooms, 0);

  const data = [
    { name: 'Inventory', count: totalInventory },
    { name: 'Rooms Booked', count: totalRoomsBooked },
  ];

  const generateIntegerTicks = (maxValue: number) => {
    const ticks = [];
    for (let i = 0; i <= maxValue; i++) {
      ticks.push(i);
    }
    return ticks;
  };

  const maxValue = Math.max(...data.map((d) => d.count), 0);

  return (
    <WidgetCard
      title={'Day Sales'}
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
            <Bar dataKey="count" fill="#8884d8" name="Day Sales" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
