'use client';

import { HeaderCell } from '@/components/ui/table';
import { Badge, Text, Tooltip, Button } from 'rizzui';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/app/shared/delete-popover';
import { ResortRoomType } from '@/data/resort-room-types';

type Columns = {
  data: ResortRoomType[];
  sortConfig?: any;
  checkedItems: string[]; // Changed to string[] to match table.tsx
  onDeleteItem: (id: string) => void; // Changed to string to match table.tsx
  onHeaderCellClick: (value: string) => void;
  handleSelectAll: () => void;
  onChecked?: (id: string) => void; // Changed to string to match table.tsx
  onEditToggle: (roomType: ResortRoomType) => void;
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
    title: <HeaderCell title="Room Type" />,
    dataIndex: 'roomType',
    key: 'roomType',
    width: 150,
    render: (roomType: string) => <Text className="text-sm">{roomType}</Text>,
  },
  {
    title: <HeaderCell title="Maximum Occupancy" />,
    dataIndex: 'maxOccupancy',
    key: 'maxOccupancy',
    width: 150,
    render: (maxOccupancy: number) => <Text className="text-sm">{maxOccupancy}</Text>,
  },
  {
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: ResortRoomType) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={'Edit Room Type'}
          placement="top"
          color="invert"
        >
          <Button
            onClick={() => onEditToggle(row)} // Pass the entire row object to onEditToggle
            size="sm"
            variant="outline"
            aria-label={"Edit Room Type"}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
        </Tooltip>
        <DeletePopover
          id={row.recIdentifier?.toString() || 'N/A'} 
          title={`room`}
          description={`Are you sure you want to delete this #${row.recIdentifier?.toString() || 'N/A'} Room Type?`}
          onDeleteItem={() => onDeleteItem(row.recIdentifier?.toString() || '')} // Ensure this is a string to match the type
        />
      </div>
    ),
  },
];

