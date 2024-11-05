'use client';

import { HeaderCell } from '@/components/ui/table';
import { Badge, Text, Tooltip, ActionIcon } from 'rizzui';

function getStatusBadge(status: string) {
  if (typeof status !== 'string') {
    // Handle undefined or non-string status appropriately
    return <div>Unknown</div>; // Example fallback content
  }
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'completed':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    case 'cancelled':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />
          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
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

type Columns = {
  sortConfig?: any;
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (event: React.ChangeEvent<HTMLInputElement>, id: string) => void;
};

export const getAminitiesColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [
  {
    title: <HeaderCell title="Ameneties ID" />,
    dataIndex: 'amenityIdentifier',
    key: 'amenityIdentifier',
    width: 120,
    render: (value: string) => <Text>#{value}</Text>,
  },
  {
    title: <HeaderCell title="Category" />,
    dataIndex: 'category',
    key: 'category',
    width: 150,
    render: (value: string) => (
      <Text className="font-medium text-gray-700">{value}</Text>
    ),
  },
  {
    title: <HeaderCell title="Label" />,
    dataIndex: 'label',
    key: 'label',
    width: 140,
    render: (value: string) => getStatusBadge(value),
  },
  {
    title: <HeaderCell title="Short Description" />,
    dataIndex: 'shortDescription',
    key: 'shortDescription',
    width: 140,
    render: (value: string) => getStatusBadge(value),
  },
];
