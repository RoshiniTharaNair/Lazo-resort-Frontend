'use client';

import React, { useEffect, useState } from 'react';
import WidgetCard from '@/components/cards/widget-card';
import { CustomTooltip } from '@/components/charts/custom-tooltip';
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

interface ChartData {
  name: string;
  count: number;
}

export default function SimpleBarChart({ className }: { className?: string }) {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("Last 5 Days");
  const isMediumScreen = useMedia('(max-width: 1200px)', false);

  useEffect(() => {
    fetchData();
  }, [selectedFilter]);

  const fetchData = async () => {
    try {
      const response = await fetch(`${apiUrl}/bookingroom/view/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const filteredData = filterDataBySelectedOption(data, selectedFilter);
      setChartData(filteredData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const filterDataBySelectedOption = (data: any[], selectedFilter: string): ChartData[] => {
    const filterFunctions: { [key: string]: (data: any[]) => ChartData[] } = {
      "Last 5 Days": filterLast5Days,
      "Last 5 Weeks": filterLast5Weeks,
      "Last 5 Months": filterLast5Months,
      "Last 5 Years": filterLast5Years,
    };

    if (filterFunctions[selectedFilter]) {
      return filterFunctions[selectedFilter](data);
    } else {
      return data.map(item => ({
        name: new Date(item.createdAt).toLocaleDateString(), 
        count: item.numberOfRooms
      }));
    }
  };

  const filterLast5Days = (data: any[]): ChartData[] => {
    const today = new Date();
    const fiveDaysAgo = new Date(today);
    fiveDaysAgo.setDate(today.getDate() - 5);

    const filteredData = data.filter(item => new Date(item.createdAt) >= fiveDaysAgo);
    return groupDataByDay(filteredData);
  };

  const filterLast5Weeks = (data: any[]): ChartData[] => {
    const today = new Date();
    const fiveWeeksAgo = new Date(today);
    fiveWeeksAgo.setDate(today.getDate() - 35);

    const filteredData = data.filter(item => new Date(item.createdAt) >= fiveWeeksAgo);
    return groupDataByWeek(filteredData);
  };

  const filterLast5Months = (data: any[]): ChartData[] => {
    const today = new Date();
    const fiveMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 5, today.getDate());

    const filteredData = data.filter(item => new Date(item.createdAt) >= fiveMonthsAgo);
    return groupDataByMonth(filteredData);
  };

  const filterLast5Years = (data: any[]): ChartData[] => {
    const today = new Date();
    const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());

    const filteredData = data.filter(item => new Date(item.createdAt) >= fiveYearsAgo);
    return groupDataByYear(filteredData);
  };

  const groupDataByDay = (data: any[]): ChartData[] => {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const groupedData = daysOfWeek.map(day => ({ name: day, count: 0 }));

    data.forEach(item => {
      const dayOfWeek = new Date(item.createdAt).getDay();
      groupedData[dayOfWeek].count += item.numberOfRooms;
    });

    return groupedData;
  };

  const groupDataByWeek = (data: any[]): ChartData[] => {
    const groupedData: ChartData[] = [];
    const today = new Date();

    for (let i = 0; i < 5; i++) {
      const weekStartDate = new Date(today.getTime() - i * 7 * 24 * 60 * 60 * 1000);
      const weekEndDate = new Date(weekStartDate.getTime() + 6 * 24 * 60 * 60 * 1000);
      const weekLabel = `${weekStartDate.toDateString()} - ${weekEndDate.toDateString()}`;
      const count = data.filter(item => new Date(item.createdAt) >= weekStartDate && new Date(item.createdAt) <= weekEndDate).reduce((acc, item) => acc + item.numberOfRooms, 0);
      groupedData.unshift({ name: weekLabel, count });
    }

    return groupedData;
  };

  const groupDataByMonth = (data: any[]): ChartData[] => {
    const groupedData: ChartData[] = [];
    const today = new Date();

    for (let i = 0; i < 5; i++) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1).toLocaleString('default', { month: 'long' });
      const count = data.filter(item => new Date(item.createdAt).getMonth() === (today.getMonth() - i)).reduce((acc, item) => acc + item.numberOfRooms, 0);
      groupedData.unshift({ name: month, count });
    }

    return groupedData;
  };

  const groupDataByYear = (data: any[]): ChartData[] => {
    const groupedData: ChartData[] = [];
    const today = new Date();

    for (let i = 0; i < 5; i++) {
      const year = today.getFullYear() - i;
      const count = data.filter(item => new Date(item.createdAt).getFullYear() === year).reduce((acc, item) => acc + item.numberOfRooms, 0);
      groupedData.unshift({ name: year.toString(), count });
    }

    return groupedData;
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const filterOptions = [
    "Last 5 Days",
    "Last 5 Weeks",
    "Last 5 Months",
    "Last 5 Years",
  ];

  return (
    <WidgetCard title={'Room Types Sold'} className={className}>
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
              tickCount={2}
              interval={'preserveStartEnd'}
              domain={['auto', 'dataMax']}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar dataKey="count" fill="#5a5fd7" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </WidgetCard>
  );
}
