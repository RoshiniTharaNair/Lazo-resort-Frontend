"use client";

import Link from "next/link";
import { HeaderCell } from "@/components/ui/table";
import {
  Text,
  Tooltip,
  Button,
} from "rizzui";
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
  onEditToggle: (coupon: any) => void;
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
    title: <HeaderCell title="#" />,
    dataIndex: "index",
    key: "index",
    width: 50,
    render: (_: any, __: any, index: number) => (
      <Text className="text-sm">{index + 1}</Text>
    ),
  },
  {
    title: <HeaderCell title="Coupon Code" />,
    dataIndex: "couponString",
    key: "couponString",
    render: (couponString: string) => <Text className="text-sm">{couponString}</Text>,
  },
  {
    title: <HeaderCell title="Discount Value" />,
    dataIndex: "discountValue",
    key: "discountValue",
    render: (discountValue: number) => <Text className="text-sm">{discountValue}</Text>,
  },
  {
    title: <HeaderCell title="Discount Unit" />,
    dataIndex: "discountUnit",
    key: "discountUnit",
    render: (discountUnit: string) => <Text className="text-sm">{discountUnit}</Text>,
  },
  {
    title: <HeaderCell title="Minimum Booking Value" />,
    dataIndex: "minBookingValue",
    key: "minBookingValue",
    render: (minBookingValue: number) => <Text className="text-sm">{minBookingValue}</Text>,
  },
  {
    title: <HeaderCell title="Maximum Discount Value" />,
    dataIndex: "maxDiscountValue",
    key: "maxDiscountValue",
    render: (maxDiscountValue: number) => <Text className="text-sm">{maxDiscountValue}</Text>,
  },
  {
    title: <HeaderCell title="Validity" />,
    dataIndex: "validity",
    key: "validity",
    render: (validity: string) => (
      <Text className="text-sm">{formatDate(validity)}</Text>
    ),
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
          content={"Edit Coupon"}
          placement="top"
          color="invert"
        >
          <Button
            onClick={() => onEditToggle(row)}
            size="sm"
            variant="outline"
            aria-label={"Edit Coupon"}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
        </Tooltip>
        <DeletePopover
          id={row.couponIdentifier.toString()}
          title={`coupons`}
          description={`Are you sure you want to delete Coupon #${row.couponIdentifier}?`}
          onDeleteItem={onDeleteItem}
        />
      </div>
    ),
  },
];