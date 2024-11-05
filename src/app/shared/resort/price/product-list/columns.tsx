'use client';

import Link from 'next/link';
import { HeaderCell } from '@/components/ui/table';
import {
  Badge,
  Text,
  Checkbox,
  Progressbar,
  Tooltip,
  ActionIcon,
  Button,
} from 'rizzui';
import { routes } from '@/config/routes';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import { ProductType } from '@/data/products-data';
import { PiStarFill } from 'react-icons/pi';
import DeletePopover from '@/app/shared/delete-popover';
import { RoomCategoryType } from '@/data/room-categories';
import { PriceType } from '@/data/price';

// get status badge
function getStatusBadge(status: string) {
  switch (status.toLowerCase()) {
    case 'pending':
      return (
        <div className="flex items-center">
          <Badge color="warning" renderAsDot />
          <Text className="ms-2 font-medium text-orange-dark">{status}</Text>
        </div>
      );
    case 'publish':
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
          label={'out of stock'}
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
          label={'low stock'}
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
          label={'stock available'}
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
      })}{' '}
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
  onEditToggle: (roomcategory: any) => void;
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
  // {
  //   title: <HeaderCell title="ID" />,
  //   dataIndex: 'id',
  //   key: 'id',
  //   width: 150,
  //   render: (ID: string | number) => <Text className="text-sm">{typeof ID === 'number' ? ID.toString() : ID}</Text>,
  // },
  // {
  //   title: <HeaderCell title="Pricing Identifier" />,
  //   dataIndex: 'pricingIdentifier',
  //   key: 'pricingIdentifier',
  //   width: 150,
  //   render: (pricingIdentifier: string | number) => <Text className="text-sm">{typeof pricingIdentifier === 'number' ? pricingIdentifier.toString() : pricingIdentifier}</Text>,
  // },
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
    title: <HeaderCell title="Price" />,
    dataIndex: 'price',
    key: 'price',
    width: 150,
    render: (price: string | number) => <Text className="text-sm">{typeof price === 'number' ? price.toString() : price}</Text>,
  },
  {
    title: <HeaderCell title="Resort Label" />,
    dataIndex: 'resortName',
    key: 'resortName',
    width: 150,
    render: (resortName: string | number) => <Text className="text-sm">{typeof resortName === 'number' ? resortName.toString() : resortName}</Text>,
  },
  // {
  //   title: <HeaderCell title="Created At" />,
  //   dataIndex: 'createdAt',
  //   key: 'createdAt',
  //   width: 150,
  //   render: (createdAt: string) => <Text className="text-sm">{new Date(createdAt).toLocaleDateString()}</Text>,
  // },
  // {
  //   title: <HeaderCell title="Updated At" />,
  //   dataIndex: 'updatedAt',
  //   key: 'updatedAt',
  //   width: 150,
  //   render: (updatedAt: string) => <Text className="text-sm">{new Date(updatedAt).toLocaleDateString()}</Text>,
  // },
  {
    // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
    title: <HeaderCell title="Actions" className="opacity-0" />,
    dataIndex: 'action',
    key: 'action',
    width: 120,
    render: (_: string, row: PriceType) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={'Edit Price'}
          placement="top"
          color="invert"
        >
          <Button
            onClick={() => onEditToggle(row)} // Pass the row data to the toggle function
            size="sm"
            variant="outline"
            aria-label={"Edit Price"}
          >
            <PencilIcon className="h-4 w-4" />
          </Button>
        </Tooltip>
        <DeletePopover
          id={row.pricingIdentifier.toString()}
          title={`price`}
          description={`Are you sure you want to delete this #${row.pricingIdentifier} Price?`}
          onDeleteItem={onDeleteItem}
        />
      </div>
    ),
  },
];
