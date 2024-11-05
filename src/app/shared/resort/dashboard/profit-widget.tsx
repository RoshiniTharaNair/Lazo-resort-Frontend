"use client";

import { useState, useEffect } from 'react';
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
  ComposedChart,
  Area,
  Line,
} from 'recharts';
import { useMedia } from '@/hooks/use-media';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

interface BookingData {
  bookingIdentifier: number;
  resortIdentifier: number;
  recDate: string;
  empCode: string;
  customerIdentifier: number;
  vendorIdentifier: number;
  transactionReference: string;
  paymentMode: string;
  base: number;
  gst: number;
  comments: string;
  checkInDate: string;
  checkOutDate: string;
  primaryContact: string;
  primaryEmail: string;
  specialRequest: string;
  createdAt: string;
  updatedAt: string;
}

export default function BookingsChart({ className }: { className?: string }) {
  const [filteredData, setFilteredData] = useState<{ name: string; bookings: number; }[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("Last 5 Days");

  useEffect(() => {
    fetchData();
  }, [selectedFilter]);

  const fetchData = async () => {
    try {
      // Fetch data from your backend API
      const response = await fetch(`${apiUrl}/bookings/view`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const data: BookingData[] = await response.json();
      
      // Filter data based on selected filter
      const filteredData = filterDataBySelectedOption(data, selectedFilter);
      
      // Update state with filtered data
      setFilteredData(filteredData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const filterDataBySelectedOption = (data: BookingData[], selectedFilter: string) => {
    const filterFunctions: { [key: string]: (data: BookingData[]) => { name: string; bookings: number; }[] } = {
      "Last 5 Days": filterLast5Days,
      "Last 5 Weeks": filterLast5Weeks,
      "Last 5 Months": filterLast5Months,
      "Last 5 Years": filterLast5Years,
    };

    if (filterFunctions[selectedFilter]) {
      return filterFunctions[selectedFilter](data);
    } else {
      // Default to returning the original data if no filter function found
      return data.map(item => ({ name: item.checkInDate, bookings: 1 })); // Assuming each item represents a booking
    }
  };

  const filterLast5Days = (data: BookingData[]) => {
    // Filter data for the last 5 days
    const today = new Date();
    const fiveDaysAgo = new Date(today);
    fiveDaysAgo.setDate(today.getDate() - 5);
  
    const filteredData = data.filter(item => new Date(item.checkInDate) >= fiveDaysAgo);
  
    // Group filtered data by day
    const groupedData = groupDataByDay(filteredData);
  
    return groupedData;
  };
  
  const filterLast5Weeks = (data: BookingData[]) => {
    // Filter data for the last 5 weeks
    const today = new Date();
    const fiveWeeksAgo = new Date(today);
    fiveWeeksAgo.setDate(today.getDate() - 35); // 7 days in a week * 5 weeks = 35 days
  
    const filteredData = data.filter(item => new Date(item.checkInDate) >= fiveWeeksAgo);
  
    // Group filtered data by week
    const groupedData = groupDataByWeek(filteredData);
  
    return groupedData;
};
  
  const filterLast5Months = (data: BookingData[]) => {
    // Filter data for the last 5 months
    const today = new Date();
    const fiveMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, today.getDate());
  
    const filteredData = data.filter(item => new Date(item.checkInDate) >= fiveMonthsAgo);
  
    // Group filtered data by month
    const groupedData = groupDataByMonth(filteredData);
  
    return groupedData;
  };
  
  const filterLast5Years = (data: BookingData[]) => {
    // Filter data for the last 5 years
    const today = new Date();
    const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
  
    const filteredData = data.filter(item => new Date(item.checkInDate) >= fiveYearsAgo);
  
    // Group filtered data by year
    const groupedData = groupDataByYear(filteredData);
  
    return groupedData;
  };
  
  const groupDataByDay = (data: BookingData[]) => {
    // Group data by day of the week (e.g., Monday, Tuesday, etc.)
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const groupedData = Array.from({ length: 7 }, () => ({ name: "", bookings: 0 }));

    data.forEach(item => {
      const dayOfWeek = new Date(item.checkInDate).getDay();
      groupedData[dayOfWeek].name = days[dayOfWeek];
      groupedData[dayOfWeek].bookings += 1;
    });

    return groupedData;
  };

  const groupDataByWeek = (data: BookingData[]) => {
    // Group data by week
    const groupedData: { name: string; bookings: number; }[] = [];
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000); // Get date one week ago
  
    // Group bookings by week
    const groupedBookings = data.reduce((acc: Map<number, number>, item: BookingData) => {
      const checkInDate = new Date(item.checkInDate);
      const weeksAgo = Math.floor((today.getTime() - checkInDate.getTime()) / (1000 * 3600 * 24 * 7));
      if (weeksAgo < 5) {
        acc.set(weeksAgo, (acc.get(weeksAgo) || 0) + 1);
      }
      return acc;
    }, new Map<number, number>());
  
    // Convert grouped bookings to an array of objects
    for (let i = 0; i < 5; i++) {
      const weekStartDate = new Date(today.getTime() - i * 7 * 24 * 60 * 60 * 1000);
      const weekEndDate = new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000);
      const weekLabel = `${weekStartDate.toDateString()} - ${weekEndDate.toDateString()}`;
      const bookings = groupedBookings.get(i) || 0;
      groupedData.unshift({ name: weekLabel, bookings });
    }
  
    return groupedData;
  };
  
  const groupDataByMonth = (data: BookingData[]) => {
    // Group data by month
    const groupedData: { name: string; bookings: number; }[] = [];
    const today = new Date();
  
    // Group bookings by month
    const groupedBookings = data.reduce((acc: Map<number, number>, item: BookingData) => {
      const checkInDate = new Date(item.checkInDate);
      const monthsAgo = today.getMonth() - checkInDate.getMonth() + (12 * (today.getFullYear() - checkInDate.getFullYear()));
      if (monthsAgo < 5) {
        acc.set(monthsAgo, (acc.get(monthsAgo) || 0) + 1);
      }
      return acc;
    }, new Map<number, number>());
  
    // Convert grouped bookings to an array of objects
    for (let i = 0; i < 5; i++) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1).toLocaleString('default', { month: 'long' });
      const bookings = groupedBookings.get(i) || 0;
      groupedData.unshift({ name: month, bookings });
    }
  
    return groupedData;
  };
  
  const groupDataByYear = (data: BookingData[]) => {
    // Group data by year
    const groupedData: { name: string; bookings: number; }[] = [];
    const today = new Date();
  
    // Group bookings by year
    const groupedBookings = data.reduce((acc: Map<number, number>, item: BookingData) => {
      const checkInDate = new Date(item.checkInDate);
      const yearsAgo = today.getFullYear() - checkInDate.getFullYear();
      if (yearsAgo < 5) {
        acc.set(yearsAgo, (acc.get(yearsAgo) || 0) + 1);
      }
      return acc;
    }, new Map<number, number>());
  
    // Convert grouped bookings to an array of objects
    for (let i = 0; i < 5; i++) {
      const year = today.getFullYear() - i;
      const bookings = groupedBookings.get(i) || 0;
      groupedData.unshift({ name: year.toString(), bookings });
    }
  
    return groupedData;
  };
  

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const isMediumScreen = useMedia('(max-width: 1200px)', false);
  const filterOptions = [
    "Last 5 Days",
    "Last 5 Weeks",
    "Last 5 Months",
    "Last 5 Years",
  ];

  const generateIntegerTicks = (maxValue: number) => {
    let ticks = [];
    for (let i = 0; i <= maxValue; i++) {
      ticks.push(i);
    }
    return ticks;
  };
  const maxValue = Math.max(...filteredData.map(item => item.bookings), 0);
  return (
    <WidgetCard title={'Bookings Chart'} className={className}>
      <div className="flex justify-center space-x-4 mb-4">
        {filterOptions.map(option => (
          <button
            key={option}
            className={`px-4 py-2 rounded-md focus:outline-none ${selectedFilter === option ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
            onClick={() => handleFilterChange(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <div className="aspect-[1060/660] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={filteredData}
            barSize={isMediumScreen ? 18 : 24}
            margin={{ left: -10 }}
            className="[&_.recharts-cartesian-grid-vertical]:opacity-0"
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis tickLine={false} dataKey="name" />
            <YAxis
              tickLine={false}
              ticks={generateIntegerTicks(maxValue)}
              tickFormatter={(value) => Math.floor(value).toString()}
              allowDecimals={false}
              domain={[0, 'dataMax + 1']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area type="monotone" dataKey="bookings" fill="#8884d8" stroke="#8884d8" />
            <Bar dataKey="bookings" fill="#5a5fd7" />
            <Line type="monotone" dataKey="uv" stroke="#ff7300" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
