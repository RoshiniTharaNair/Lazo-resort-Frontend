'use client';

import { useState } from 'react';
import { Title, Text, ActionIcon, Button, Popover } from 'rizzui';
import TrashIcon from '@/components/icons/trash';
import { PiTrashFill } from 'react-icons/pi';
import toast from 'react-hot-toast';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type DeletePopoverProps = {
  title: string;
  description: string;
  onDeleteItem: (id: string) => void;
  id: string;
};

export default function DeletePopover({
  title,
  description,
  onDeleteItem,
  id,
}: DeletePopoverProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const apiUrlMap: { [key: string]: string } = {
    price: `${apiUrl}/pricings/delete/${id}`,
    room: `${apiUrl}/ResortRoomType/delete/${id}`,
    inventories: `${apiUrl}/inventories/delete/${id}`,
    vendor: `${apiUrl}/vendors/delete/${id}`,
    bookings: `${apiUrl}/bookings/delete/${id}`,
    geo: `${apiUrl}/geos/delete/${id}`,
    resort: `${apiUrl}/resorts/delete/${id}`,
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      console.log("Handle Delete");
      console.log(apiUrlMap[title]);
      
      
      // Make the API call to delete the item
      const response = await fetch(apiUrlMap[title], {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        // If deletion is successful, call onDeleteItem to update the UI
        onDeleteItem(id);
        toast.success(`${title} ${id} deleted successfully`);
      } else {
        // Handle error response
        console.error('Failed to delete item');
        toast.error(`Failed to delete ${title} ${id}`);
      }
    } catch (error) {
      console.error('Failed to delete item', error);
      toast.error(`Failed to delete ${title} ${id}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Popover placement="left">
      <Popover.Trigger>
        <ActionIcon
          size="sm"
          variant="outline"
          aria-label={'Delete Item'}
          className="cursor-pointer hover:!border-gray-900 hover:text-gray-700"
        >
          <TrashIcon className="h-4 w-4" />
        </ActionIcon>
      </Popover.Trigger>
      <Popover.Content className="z-0">
        {({ setOpen }) => (
          <div className="w-56 pb-2 pt-1 text-left rtl:text-right">
            <Title
              as="h6"
              className="mb-0.5 flex items-start text-sm text-gray-700 sm:items-center"
            >
              <PiTrashFill className="me-1 h-[17px] w-[17px]" /> {title}
            </Title>
            <Text className="mb-2 leading-relaxed text-gray-500">
              {description}
            </Text>
            <div className="flex items-center justify-end">
              <Button
                size="sm"
                className="me-1.5 h-7"
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting...' : 'Yes'}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="h-7"
                onClick={() => setOpen(false)}
              >
                No
              </Button>
            </div>
          </div>
        )}
      </Popover.Content>
    </Popover>
  );
}
