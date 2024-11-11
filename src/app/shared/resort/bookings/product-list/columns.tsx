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
import PencilIcon from "@/components/icons/pencil";
import { PiStarFill } from "react-icons/pi";
import DeletePopover from "@/app/shared/delete-popover";
import { BookingType } from "@/data/bookings";

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
    case "confirmed":
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

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
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
    title: <HeaderCell title="Resort" />,
    dataIndex: "resortName",
    key: "resortName",
    render: (resortName: string) => <Text className="text-sm">{resortName}</Text>,
  },
  // {
  //   title: <HeaderCell title="Rec Date" />,
  //   dataIndex: "recDate",
  //   key: "recDate",
  //   render: (date: string) => (
  //     <Text className="text-sm">{formatDate(date)}</Text>
  //   ),
  // },
  {
    title: <HeaderCell title="Employee code" />,
    dataIndex: "empCode",
    key: "empCode",
    render: (ref: string) => <Text className="text-sm">{ref}</Text>,
  },
  {
    title: <HeaderCell title="Customer" />,
    dataIndex: "customerName",
    key: "customerName",
    render: (customerName: string) => <Text className="text-sm">{customerName}</Text>,
  },
  {
    title: <HeaderCell title="Vendor" />,
    dataIndex: "vendorName",
    key: "vendorName",
    render: (vendorName: string) => <Text className="text-sm">{vendorName}</Text>,
  },
  {
    title: <HeaderCell title="Transaction Reference" />,
    dataIndex: "transactionReference",
    key: "transactionReference",
    render: (ref: string) => <Text className="text-sm">{ref}</Text>,
  },
  {
    title: <HeaderCell title="Payment Mode" />,
    dataIndex: "paymentMode",
    key: "paymentMode",
    render: (ref: string) => <Text className="text-sm">{ref}</Text>,
  },
  {
    title: <HeaderCell title="Base Price" />,
    dataIndex: "base",
    key: "base",
    render: (base: number | null | undefined) => (
      <Text className="text-sm">
        {base != null ? `₹${base.toFixed(2)}` : "N/A"}
      </Text>
    ),
  },  
  {
    title: <HeaderCell title="GST" />,
    dataIndex: "gst",
    key: "gst",
    render: (gst: number | null | undefined) => (
      <Text className="text-sm">
        {typeof gst === "number" ? `₹${gst.toFixed(2)}` : "N/A"}
      </Text>
    ),
  },    
  {
    title: <HeaderCell title="Check-In Date" />,
    dataIndex: "checkInDate",
    key: "checkInDate",
    render: (date: string) => (
      <Text className="text-sm">{formatDate(date)}</Text>
    ),
  },
  {
    title: <HeaderCell title="Check-Out Date" />,
    dataIndex: "checkOutDate",
    key: "checkOutDate",
    render: (date: string) => (
      <Text className="text-sm">{formatDate(date)}</Text>
    ),
  },
  {
    title: <HeaderCell title="Primary Contact" />,
    dataIndex: "primaryContact",
    key: "primaryContact",
    render: (primaryContact: string) => <Text className="text-sm">{primaryContact}</Text>,
  },
  {
    title: <HeaderCell title="Primary Email" />,
    dataIndex: "primaryEmail",
    key: "primaryEmail",
    render: (primaryEmail: string) => <Text className="text-sm">{primaryEmail}</Text>,
  },
  {
    title: <HeaderCell title="Special Request" />,
    dataIndex: "specialRequest",
    key: "specialRequest",
    render: (specialRequest: string) => <Text className="text-sm">{specialRequest}</Text>,
  },
  {
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: "action",
    key: "action",
    width: 120,
    render: (_: string, row: BookingType) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={"Edit Booking"}
          placement="top"
          color="invert"
        >
          <Button
            onClick={() => onEditToggle(row)} // Pass the row data to the toggle function
            size="sm"
            variant="outline"
            aria-label={"Edit Booking"}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
        </Tooltip>
        <DeletePopover
          id={row.bookingIdentifier.toString()}
          title={`bookings`}
          description={`Are you sure you want to delete this #${row.bookingIdentifier} Booking?`}
          onDeleteItem={onDeleteItem}
        />
      </div>
    ),
  },
];