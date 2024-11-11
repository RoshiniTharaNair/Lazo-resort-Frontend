"use client";

import Link from "next/link";
import { HeaderCell } from "@/components/ui/table";
import { Text, Tooltip, Button } from "rizzui";
import PencilIcon from "@/components/icons/pencil";
import DeletePopover from "@/app/shared/delete-popover";

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  onEditToggle: (membership: any) => void;
  customerMap: Record<number, string>;
  resortMap: Record<number, string>;
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
  customerMap,
  resortMap,
}: Columns) => [
  {
    title: <HeaderCell title="#" />,
    dataIndex: "index",
    key: "index",
    width: 50,
    render: (_: any, __: any, index: number) => (
      <Text className="text-sm">{index + 1}</Text>
    ),
  },
  {
    title: <HeaderCell title="Customer" />,
    dataIndex: "customerIdentifier",
    key: "customerIdentifier",
    render: (customerIdentifier: number) => (
      <Text className="text-sm">
        {customerMap[customerIdentifier] || "Unknown"}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Resort" />,
    dataIndex: "resortIdentifier",
    key: "resortIdentifier",
    render: (resortIdentifier: number) => (
      <Text className="text-sm">{resortMap[resortIdentifier] || "Unknown"}</Text>
    ),
  },
  {
    title: <HeaderCell title="Purchase Date" />,
    dataIndex: "purchaseDate",
    key: "purchaseDate",
    render: (purchaseDate: string) => (
      <Text className="text-sm">{formatDate(purchaseDate)}</Text>
    ),
  },
  {
    title: <HeaderCell title="Validity Start" />,
    dataIndex: "validityStart",
    key: "validityStart",
    render: (validityStart: string) => (
      <Text className="text-sm">{formatDate(validityStart)}</Text>
    ),
  },
  {
    title: <HeaderCell title="Validity End" />,
    dataIndex: "validityEnd",
    key: "validityEnd",
    render: (validityEnd: string) => (
      <Text className="text-sm">{formatDate(validityEnd)}</Text>
    ),
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: "status",
    key: "status",
    render: (status: string) => <Text className="text-sm">{status}</Text>,
  },
  {
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: "action",
    key: "action",
    width: 120,
    render: (_: string, row: any) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={"Edit Membership"}
          placement="top"
          color="invert"
        >
          <Button
            onClick={() => onEditToggle(row)}
            size="sm"
            variant="outline"
            aria-label={"Edit Membership"}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
        </Tooltip>
        <DeletePopover
          id={row.membershipIdentifier.toString()}
          title={`memberships`}
          description={`Are you sure you want to delete Membership #${row.membershipIdentifier}?`}
          onDeleteItem={onDeleteItem}
        />
      </div>
    ),
  },
];