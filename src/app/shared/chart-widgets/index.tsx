import SimpleLineChart from "@/app/shared/chart-widgets/simple-line-chart";
import CustomizedDotLineChart from "@/app/shared/chart-widgets/customized-dot-line-chart";
import SimpleBarChart from "@/app/shared/chart-widgets/simple-bar-chart";
import MixBarChart from "@/app/shared/chart-widgets/mix-bar-chart";
import CustomShapeBarChart from "@/app/shared/chart-widgets/custom-shape-bar-chart";
import BrushBarChart from "@/app/shared/chart-widgets/brush-bar-chart";
import SimpleAreaChart from "@/app/shared/chart-widgets/simple-area-chart";
import StackedAreaChart from "@/app/shared/chart-widgets/stacked-area-chart";
import SimpleRadarChart from "@/app/shared/chart-widgets/simple-radar-chart";
import RadialBarChart from "@/app/shared/chart-widgets/radial-bar-chart";
import CustomizedMixChart from "@/app/shared/chart-widgets/customized-mix-chart";
import RoomCategoryInventorySimpleBarChart from "./room-category-inventory-simple-bar-chart";
import WelcomeBanner from "@/components/banners/welcome";
import HandWaveIcon from "@/components/icons/hand-wave";
import welcomeImg from "../../../../public/shop-illustration.png";
import Image from "next/image";
import { routes } from "@/config/routes";
import Link from "next/link";
import { PiPlusBold } from "react-icons/pi";
import { Button } from "rizzui";
import ProfitWidget from "../resort/dashboard/profit-widget";
import RoomAndInventoryGraph from "../resort/dashboard/promotional-sales";

export default function ChartWidgets() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 3xl:gap-8">
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
      {/* <SimpleLineChart /> */}
      {/* <CustomizedDotLineChart /> */}
      {/* <SimpleBarChart /> */}
      {/* <MixBarChart /> */}
      {/* <CustomShapeBarChart /> */}
      {/* <BrushBarChart /> */}
      {/* <SimpleAreaChart /> */}
      {/* <StackedAreaChart /> */}
      {/* <SimpleRadarChart /> */}
      {/* <RadialBarChart /> */}
      {/* <CustomizedMixChart className="lg:col-span-2" /> */}
      <ProfitWidget/>
      <RoomAndInventoryGraph/>
      <RoomCategoryInventorySimpleBarChart />
    </div>
  );
}
