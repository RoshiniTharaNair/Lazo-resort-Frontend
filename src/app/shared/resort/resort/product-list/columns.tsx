"use client";

import Link from "next/link";
import { HeaderCell } from "@/components/ui/table";
import {
  Badge,
  Text,
  Checkbox,
  Progressbar,
  Tooltip,
  ActionIcon,
  Button,
} from "rizzui";
import { routes } from "@/config/routes";
import PencilIcon from "@/components/icons/pencil";
import { PiStarFill } from "react-icons/pi";
import DeletePopover from "@/app/shared/delete-popover";
import { ResortType } from "@/data/resort";

// get status badge
function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case "pending":
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case "publish":
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
        </div>
      );
  }
}

// get stock status
function getStockStatus(status: number) {
  if (status === 0) {
    return (
      <>
        <Progressbar
          value={status}
          color="danger"
          label={"out of stock"}
          className="h-1.5 w-24 bg-red/20"
        />
        <Text className="pt-1.5 text-[13px] text-gray-500">out of stock </Text>
      </>
    );
  } else if (status <= 20) {
    return (
      <>
        <Progressbar
          value={status}
          color="warning"
          label={"low stock"}
          className="h-1.5 w-24 bg-orange/20"
        />
        <Text className="pt-1.5 text-[13px] text-gray-500">
          {status} low stock
        </Text>
      </>
    );
  } else {
    return (
      <>
        <Progressbar
          value={status}
          color="success"
          label={"stock available"}
          className="h-1.5 w-24 bg-green/20"
        />
        <Text className="pt-1.5 text-[13px] text-gray-500">
          {status} in stock
        </Text>
      </>
    );
  }
}

// get rating calculation
function getRating(rating: number[]) {
  let totalRating = rating.reduce((partialSum, value) => partialSum + value, 0);
  let review = totalRating / rating?.length;

  return (
    <div className="flex items-center">
      <span className="me-1 shrink-0">{review.toFixed(1)}</span>
      {[...new Array(5)].map((arr, index) => {
        return index < Math.round(review) ? (
          <PiStarFill className="w-4 fill-orange text-orange" key={index} />
        ) : (
          <PiStarFill className="w-4 fill-gray-300 text-gray-300" key={index} />
        );
      })}{" "}
      <span className="ms-1 shrink-0">({totalRating})</span>
    </div>
  );
}

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  onEditToggle: (booking: any) => void;
};

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
  onEditToggle,
}: Columns) => [
  {
    title: <HeaderCell title="#" />, // Auto-increment column header
    dataIndex: "index",
    key: "index",
    width: 50,
    render: (_: any, __: any, index: number) => (
      <Text className="text-sm">{index + 1}</Text> // Display the index + 1 for auto-increment
    ),
  },
  {
    title: <HeaderCell title="Resort Label" />,
    dataIndex: "label",
    key: "label",
    width: 150,
    render: (label: string) => <Text className="text-sm">{label}</Text>,
  },
  {
    title: <HeaderCell title="Reservation Contact" />,
    dataIndex: "reservation_cont",
    key: "reservation_cont",
    width: 150,
    render: (reservation_cont: string) => (
      <Text className="text-sm">{reservation_cont}</Text>
    ),
  },
  {
    title: <HeaderCell title="Services Contact" />,
    dataIndex: "services_cont",
    key: "services_cont",
    width: 150,
    render: (services_cont: string) => (
      <Text className="text-sm">{services_cont}</Text>
    ),
  },
  {
    title: <HeaderCell title="Support Contact" />,
    dataIndex: "support_cont",
    key: "support_cont",
    width: 150,
    render: (support_cont: string) => (
      <Text className="text-sm">{support_cont}</Text>
    ),
  },
  {
    title: <HeaderCell title="Reservation Email" />,
    dataIndex: "reservation_email",
    key: "reservation_email",
    width: 150,
    render: (reservation_email: string) => (
      <Text className="text-sm">{reservation_email}</Text>
    ),
  },
  {
    title: <HeaderCell title="Services Email" />,
    dataIndex: "services_email",
    key: "services_email",
    width: 150,
    render: (services_email: string) => (
      <Text className="text-sm">{services_email}</Text>
    ),
  },
  {
    title: <HeaderCell title="Support Email" />,
    dataIndex: "support_email",
    key: "support_email",
    width: 150,
    render: (support_email: string) => (
      <Text className="text-sm">{support_email}</Text>
    ),
  },
  {
    title: <HeaderCell title="Careers Email" />,
    dataIndex: "careers_email",
    key: "careers_email",
    width: 150,
    render: (careers_email: string) => (
      <Text className="text-sm">{careers_email}</Text>
    ),
  },
  {
    title: <HeaderCell title="Resort Description" />,
    dataIndex: "description",
    key: "description",
    width: 150,
    render: (description: string) => (
      <Text className="text-sm">{description}</Text>
    ),
  },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: "action",
    key: "action",
    width: 120,
    render: (_: string, row: ResortType) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={"Edit Resort"}
          placement="top"
          color="invert"
        >
          <Button
            onClick={() => onEditToggle(row)} // Pass the row data to the toggle function
            size="sm"
            variant="outline"
            aria-label={"Edit Resort"}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
        </Tooltip>
        <DeletePopover
          id={row.resortIdentifier}
          title={`resort`}
          description={`Are you sure you want to delete this #${row.resortIdentifier} Resort?`}
          onDeleteItem={onDeleteItem}
        />
      </div>
    ),
  },
];