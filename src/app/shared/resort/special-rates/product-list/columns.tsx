'use client';

import { HeaderCell } from '@/components/ui/table';
import {
  Text,
  Tooltip,
  Button,
} from 'rizzui';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';
import { VoidDateType } from '@/data/void-date';

// Type for the Columns
type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  onEditToggle: (voidDate: VoidDateType) => void;
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
    title: <HeaderCell title="Special Date" />,
    dataIndex: 'voidDate',
    key: 'voidDate',
    render: (voidDate: string) => (
      <Text className="text-sm">
        {formatDate(voidDate)}
      </Text>
    ),
  },
  {
    title: <HeaderCell title="Resort" />,
    dataIndex: 'resortLabel', // Use resortLabel instead of resortIdentifier
    key: 'resortLabel',
    width: 150,
    render: (resortLabel: string) => <Text className="text-sm">{resortLabel}</Text>,
  },
  {
    title: <HeaderCell title="Price Multiplier" />,
    dataIndex: 'voidMultiplier',
    key: 'voidMultiplier',
    render: (voidMultiplier: number) => (
      <Text className="text-sm">{voidMultiplier.toString()}</Text>
    ),
  },
  {
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: VoidDateType) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={'Edit Void Date'}
          placement="top"
          color="invert"
        >
          <Button
            onClick={() => onEditToggle(row)}
            size="sm"
            variant="outline"
            aria-label={"Edit Void Date"}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
        </Tooltip>
        <DeletePopover
          id={row.voiddateIdentifier.toString()}
          title={`voiddate`}
          description={`Are you sure you want to delete this #${row.voiddateIdentifier} Void Date?`}
          onDeleteItem={onDeleteItem}
        />
      </div>
    ),
  },
];