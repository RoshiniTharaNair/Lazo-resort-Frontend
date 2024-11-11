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
  onEditToggle: (employee: any) => void;
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
    title: <HeaderCell title="Employee Code" />,
    dataIndex: "emp_code",
    key: "emp_code",
    render: (emp_code: string) => <Text className="text-sm">{emp_code}</Text>,
  },
  {
    title: <HeaderCell title="First Name" />,
    dataIndex: "first_name",
    key: "first_name",
    render: (first_name: string) => <Text className="text-sm">{first_name}</Text>,
  },
  {
    title: <HeaderCell title="Last Name" />,
    dataIndex: "last_name",
    key: "last_name",
    render: (last_name: string) => <Text className="text-sm">{last_name}</Text>,
  },
  {
    title: <HeaderCell title="Primary Contact" />,
    dataIndex: "prim_contact",
    key: "prim_contact",
    render: (prim_contact: string) => <Text className="text-sm">{prim_contact}</Text>,
  },
  {
    title: <HeaderCell title="Primary Email" />,
    dataIndex: "prim_email",
    key: "prim_email",
    render: (prim_email: string) => <Text className="text-sm">{prim_email}</Text>,
  },
  {
    title: <HeaderCell title="Date of Birth" />,
    dataIndex: "dob",
    key: "dob",
    render: (dob: string) => (
      <Text className="text-sm">{formatDate(dob)}</Text>
    ),
  },
  {
    title: <HeaderCell title="Date of Joining" />,
    dataIndex: "doj",
    key: "doj",
    render: (doj: string) => (
      <Text className="text-sm">{formatDate(doj)}</Text>
    ),
  },
  {
    title: <HeaderCell title="BGV Status" />,
    dataIndex: "bgv_status",
    key: "bgv_status",
    render: (bgv_status: string) => <Text className="text-sm">{bgv_status}</Text>,
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
          content={"Edit Employee"}
          placement="top"
          color="invert"
        >
          <Button
            onClick={() => onEditToggle(row)} // Pass the row data to the toggle function
            size="sm"
            variant="outline"
            aria-label={"Edit Employee"}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
        </Tooltip>
        <DeletePopover
          id={row.emp_code.toString()}
          title={`employees`}
          description={`Are you sure you want to delete Employee #${row.emp_code}?`}
          onDeleteItem={onDeleteItem}
        />
      </div>
    ),
  },
];