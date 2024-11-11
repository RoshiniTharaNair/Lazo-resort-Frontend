import Link from "next/link";
import Image from "next/image";
import { routes } from "@/config/routes";
import { Button } from "rizzui";
import WelcomeBanner from "@/components/banners/welcome";
import ProfitWidget from "@/app/shared/resort/dashboard/profit-widget";
import PromotionalSales from "@/app/shared/resort/dashboard/promotional-sales";
import { PiPlusBold } from "react-icons/pi";
import welcomeImg from "../../../../../public/shop-illustration.png";
import HandWaveIcon from "@/components/icons/hand-wave";
import RoomCategoryInventorySimpleBarChart from "../../chart-widgets/room-category-inventory-simple-bar-chart";
import StackedAreaChart from "../../chart-widgets/stacked-area-chart";
import SimpleRadarChart from "../../chart-widgets/simple-radar-chart";
import CustomizedMixChart from "../../chart-widgets/customized-mix-chart";
import RadialBarChart from "../../chart-widgets/radial-bar-chart";
import { useState, useEffect } from 'react';
import { Resort } from '@/types/BookingTypes';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function ResortDashboard() {
  const [resorts, setResorts] = useState<Resort[]>([]);
  const [selectedResort, setSelectedResort] = useState<Resort | null>(null);

  useEffect(() => {
    const fetchResorts = async () => {
      try {
        const response = await fetch(`${apiUrl}/resorts/view`);
        const data: Resort[] = await response.json();
        setResorts(data);
        if (data.length > 0) {
          setSelectedResort(data[0]);
        }
      } catch (error) {
        console.error('Error fetching resorts:', error);
      }
    };

    fetchResorts();
  }, []);

  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        {/* WelcomeBanner spans all 12 columns on larger screens */}
        <WelcomeBanner
          title={
            <>
              Good Morning, <br /> Younus{" "}
              <HandWaveIcon className="inline-flex h-8 w-8" />
            </>
          }
          description={
            "Here's the snapshot of your hotel's activity today. Review bookings, availability, and guest feedback at a glance."
          }
          media={
            <div className="absolute -bottom-6 end-4 hidden w-[300px] @2xl:block lg:w-[320px] 2xl:-bottom-7 2xl:w-[330px]">
              <div className="relative">
                <Image
                  src={welcomeImg}
                  alt="Welcome shop image form freepik"
                  className="dark:brightness-95 dark:drop-shadow-md"
                />
              </div>
            </div>
          }
          contentClassName="@2xl:max-w-[calc(100%-340px)]"
          className="border border-muted bg-gray-0 pb-8 @4xl:col-span-2 @7xl:col-span-12 lg:pb-9 dark:bg-gray-100/30"
        >
          <Link href={routes.resort.booking} className="inline-flex">
            <Button as="span" className="h-[38px] shadow md:h-10">
              <PiPlusBold className="me-1 h-4 w-4" /> Start Booking
            </Button>
          </Link>
        </WelcomeBanner>

        {/* ProfitWidget and PromotionalSales each take up 6 columns, making them side by side */}
        <ProfitWidget selectedResort={selectedResort} />
        <PromotionalSales className="@4xl:col-span-2 @7xl:col-span-6 @7xl:row-start-2" />
        
        {/* Additional charts */}
        <RoomCategoryInventorySimpleBarChart className="@7xl:col-span-6" />
        <StackedAreaChart className="@7xl:col-span-6" />
        <SimpleRadarChart className="@7xl:col-span-6" />
        <RadialBarChart className="@7xl:col-span-6" />
        <CustomizedMixChart className="lg:col-span-2 @7xl:col-span-6" />
      </div>
    </div>
  );
}