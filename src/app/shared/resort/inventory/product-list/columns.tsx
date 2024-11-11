"use client";

import React from "react";
import { HeaderCell } from "@/components/ui/table";
import { Badge, Text, Progressbar, Tooltip, Button } from "rizzui";
import PencilIcon from "@/components/icons/pencil";
import DeletePopover from "@/app/shared/delete-popover";
import { InventoryeType } from "@/data/inventories";

type ResortData = {
  resortIdentifier: number;
  label: string;
};

type RoomTypeData = {
  recIdentifier: number;
  roomType: string;
  maxOccupancy: number;
};

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

type ColumnsProps = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  onEditToggle: (inventory: any) => void;
  resorts: ResortData[];
  roomTypes: RoomTypeData[];
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
  resorts,
  roomTypes,
}: ColumnsProps) => [
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
    dataIndex: "resortIdentifier",
    key: "resortIdentifier",
    width: 150,
    render: (resortIdentifier: number) => {
      // Find the label for the resortIdentifier
      const resort = resorts.find(
        (resort) => resort.resortIdentifier === resortIdentifier
      );
      return <Text className="text-sm">{resort?.label || "Unknown"}</Text>;
    },
  },
  {
    title: <HeaderCell title="Room Class" />,
    dataIndex: "roomClass",
    key: "roomClass",
    width: 150,
    render: (roomClass: number) => {
      // Find the room type for the roomClass
      const roomType = roomTypes.find(
        (roomType) => roomType.recIdentifier === roomClass
      );
      return (
        <Text className="text-sm">{roomType?.roomType || "Unknown"}</Text>
      );
    },
  },
  {
    title: <HeaderCell title="Max Occupancy" />,
    dataIndex: "roomClass",
    key: "maxOccupancy",
    width: 150,
    render: (roomClass: number) => {
      // Find the max occupancy for the roomClass
      const roomType = roomTypes.find(
        (roomType) => roomType.recIdentifier === roomClass
      );
      return (
        <Text className="text-sm">{roomType?.maxOccupancy || "Unknown"}</Text>
      );
    },
  },
  {
    title: <HeaderCell title="Effective Date" />,
    dataIndex: "effectiveDate",
    key: "effectiveDate",
    width: 150,
    render: (effectiveDate: string) => (
      <Text className="text-sm">{formatDate(effectiveDate)}</Text>
    ),
  },
  {
    title: <HeaderCell title="Available Count" />,
    dataIndex: "avlCount",
    key: "avlCount",
    width: 150,
    render: (avlCount: number) => getStockStatus(avlCount),
  },
  {
    title: <HeaderCell title="Base Price" />,
    dataIndex: "basePrice",
    key: "basePrice",
    width: 150,
    render: (basePrice: number) => (
      <Text className="text-sm">{`${basePrice.toFixed(2)}`}</Text>
    ),
  },
  {
    title: <HeaderCell title="GST" />,
    dataIndex: "gst",
    key: "gst",
    width: 100,
    render: (gst: string) => <Text className="text-sm">{gst}</Text>,
  },
  {
    title: <HeaderCell title="Discount" />,
    dataIndex: "discount",
    key: "discount",
    width: 100,
    render: (discount?: string) => (
      <Text className="text-sm">{discount || "N/A"}</Text>
    ),
  },
  {
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: "action",
    key: "action",
    width: 120,
    render: (_: string, row: InventoryeType) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={"Edit Room Type"}
          placement="top"
          color="invert"
        >
          <Button
            onClick={() => onEditToggle(row)} // Pass the row data to the toggle function
            size="sm"
            variant="outline"
            aria-label={"Edit Room Type"}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
        </Tooltip>
        <DeletePopover
          id={row.inventoryIdentifier.toString()}
          title={`room type`}
          description={`Are you sure you want to delete this #${row.inventoryIdentifier} Room Type?`}
          onDeleteItem={onDeleteItem}
        />
      </div>
    ),
  },
];