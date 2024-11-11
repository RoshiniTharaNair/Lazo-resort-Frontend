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
  onEditToggle: (profile: any) => void;
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
    title: <HeaderCell title="First Name" />,
    dataIndex: "firstname",
    key: "firstname",
    render: (firstname: string) => <Text className="text-sm">{firstname}</Text>,
  },
  {
    title: <HeaderCell title="Last Name" />,
    dataIndex: "lastname",
    key: "lastname",
    render: (lastname: string) => <Text className="text-sm">{lastname}</Text>,
  },
  {
    title: <HeaderCell title="Primary Contact" />,
    dataIndex: "primarycontact",
    key: "primarycontact",
    render: (primarycontact: string) => <Text className="text-sm">{primarycontact}</Text>,
  },
  {
    title: <HeaderCell title="Primary Email" />,
    dataIndex: "primaryemail",
    key: "primaryemail",
    render: (primaryemail: string) => <Text className="text-sm">{primaryemail}</Text>,
  },
  {
    title: <HeaderCell title="Username" />,
    dataIndex: "username",
    key: "username",
    render: (username: string) => <Text className="text-sm">{username}</Text>,
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
          content={"Edit Profile"}
          placement="top"
          color="invert"
        >
          <Button
            onClick={() => onEditToggle(row)}
            size="sm"
            variant="outline"
            aria-label={"Edit Profile"}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
        </Tooltip>
        <DeletePopover
          id={row.customerIdentifier.toString()}
          title={`profiles`}
          description={`Are you sure you want to delete Profile #${row.customerIdentifier}?`}
          onDeleteItem={onDeleteItem}
        />
      </div>
    ),
  },
];
