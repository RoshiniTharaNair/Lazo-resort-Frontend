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
import { useState } from "react";
import { Modal, ActionIcon } from "rizzui";
import { XMarkIcon } from "@heroicons/react/20/solid";
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
  onEditToggle: (guest: any) => void;
};

type BookingDetailsType = {
  bookingIdentifier: number;
  resortIdentifier: string;
  recDate: string;
  empCode: string;
  customerIdentifier: string;
  vendorIdentifier: string;
  transactionReference: string;
  paymentMode: string;
  base: number;
  gst: number;
  comments: string;
  checkInDate: string;
  checkOutDate: string;
  primaryContact: string;
  primaryEmail: string;
  specialRequest: string;
  status: string;
  membershipIdentifier: string;
  membershipPoints: number;
  discountMode: string;
  discountVal: number;
  createdAt: string;
  updatedAt: string;
};

const BookingDetails = ({ bookingIdentifier }: { bookingIdentifier: number }) => {
  const [modalState, setModalState] = useState(false);
  const [bookingDetails, setBookingDetails] = useState<BookingDetailsType | null>(null);

  const fetchBookingDetails = async () => {
    try {
      const response = await fetch(`${apiUrl}/bookings/view/${bookingIdentifier}`);
      const data = await response.json();
      setBookingDetails(data);
      setModalState(true);
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  return (
    <>
      <Button onClick={fetchBookingDetails}>View Booking Details</Button>
      <Modal isOpen={modalState} size="lg" onClose={() => setModalState(false)}>
        <div className="m-auto px-7 pt-6 pb-8 bg-white shadow-lg rounded-lg">
          {/* Modal Header */}
          <div className="mb-7 flex items-center justify-between border-b pb-4">
            <Text as="strong" className="text-2xl font-semibold">Booking Details</Text>
            <ActionIcon size="sm" variant="text" onClick={() => setModalState(false)}>
              <XMarkIcon className="h-auto w-6 text-gray-600" strokeWidth={1.8} />
            </ActionIcon>
          </div>

          {/* Modal Content */}
          {bookingDetails ? (
            <div className="space-y-6">

              {/* General Information Section */}
              <div>
                <Text as="strong" className="text-lg font-bold mb-4">General Information</Text>
                <hr className="border-gray-300 mb-4" />
                <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                  <Text><strong>Booking Identifier:</strong> {bookingDetails.bookingIdentifier}</Text>
                  <Text><strong>Resort Identifier:</strong> {bookingDetails.resortIdentifier}</Text>
                  <Text><strong>Rec Date:</strong> {new Date(bookingDetails.recDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</Text>
                  <Text><strong>Employee Code:</strong> {bookingDetails.empCode}</Text>
                  <Text><strong>Customer Identifier:</strong> {bookingDetails.customerIdentifier}</Text>
                  <Text><strong>Vendor Identifier:</strong> {bookingDetails.vendorIdentifier}</Text>
                </div>
              </div>

              {/* Payment and Pricing Section */}
              <div>
                <Text as="strong" className="text-lg font-bold mb-4">Payment and Pricing</Text>
                <hr className="border-gray-300 mb-4" />
                <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                  <Text><strong>Transaction Reference:</strong> {bookingDetails.transactionReference}</Text>
                  <Text><strong>Payment Mode:</strong> {bookingDetails.paymentMode}</Text>
                  <Text><strong>Base Price:</strong> ₹{bookingDetails.base}</Text>
                  <Text><strong>GST:</strong> ₹{bookingDetails.gst}</Text>
                  <Text><strong>Discount Mode:</strong> {bookingDetails.discountMode}</Text>
                  <Text><strong>Discount Value:</strong> ₹{bookingDetails.discountVal}</Text>
                </div>
              </div>

              {/* Booking Dates Section */}
              <div>
                <Text as="strong" className="text-lg font-bold mb-4">Booking Dates</Text>
                <hr className="border-gray-300 mb-4" />
                <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                  <Text><strong>Check-In Date:</strong> {new Date(bookingDetails.checkInDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</Text>
                  <Text><strong>Check-Out Date:</strong> {new Date(bookingDetails.checkOutDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</Text>
                </div>
              </div>

              {/* Contact Information Section */}
              <div>
                <Text as="strong" className="text-lg font-bold mb-4">Contact Information</Text>
                <hr className="border-gray-300 mb-4" />
                <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                  <Text><strong>Primary Contact:</strong> {bookingDetails.primaryContact}</Text>
                  <Text><strong>Primary Email:</strong> {bookingDetails.primaryEmail}</Text>
                  <Text><strong>Special Request:</strong> {bookingDetails.specialRequest}</Text>
                </div>
              </div>

              {/* Membership and Status Section */}
              <div>
                <Text as="strong" className="text-lg font-bold mb-4">Membership and Status</Text>
                <hr className="border-gray-300 mb-4" />
                <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                  <Text>
                    <strong>Status:</strong>
                    <span className={`ml-2 font-semibold ${bookingDetails.status === 'Confirmed' ? 'text-green-600' : 'text-red-600'}`}>
                      {bookingDetails.status}
                    </span>
                  </Text>
                  <Text><strong>Membership Identifier:</strong> {bookingDetails.membershipIdentifier}</Text>
                  <Text><strong>Membership Points:</strong> {bookingDetails.membershipPoints}</Text>
                </div>
              </div>

              {/* Additional Information Section */}
              <div>
                <Text as="strong" className="text-lg font-bold mb-4">Additional Information</Text>
                <hr className="border-gray-300 mb-4" />
                <div className="grid grid-cols-2 gap-x-5 gap-y-4">
                  <Text><strong>Comments:</strong> {bookingDetails.comments}</Text>
                  <Text><strong>Created At:</strong> {new Date(bookingDetails.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</Text>
                  <Text><strong>Updated At:</strong> {new Date(bookingDetails.updatedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</Text>
                </div>
              </div>

            </div>
          ) : (
            <Text>Loading...</Text>
          )}
        </div>
      </Modal>


    </>
  );
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
      dataIndex: "firstName",
      key: "firstName",
      render: (firstName: string) => <Text className="text-sm">{firstName}</Text>,
    },
    {
      title: <HeaderCell title="Last Name" />,
      dataIndex: "lastName",
      key: "lastName",
      render: (lastName: string) => <Text className="text-sm">{lastName}</Text>,
    },
    {
      title: <HeaderCell title="Primary Guest" />,
      dataIndex: "primaryGuest",
      key: "primaryGuest",
      render: (primaryGuest: boolean) => (
        <Text className="text-sm">{primaryGuest ? "Yes" : "No"}</Text>
      ),
    },
    {
      title: <HeaderCell title="Age" />,
      dataIndex: "age",
      key: "age",
      render: (age: number) => <Text className="text-sm">{age}</Text>,
    },
    {
      title: <HeaderCell title="Age Group" />,
      dataIndex: "ageGroup",
      key: "ageGroup",
      render: (ageGroup: number) => <Text className="text-sm">{ageGroup}</Text>,
    },
    {
      title: <HeaderCell title="ID Type" />,
      dataIndex: "idType",
      key: "idType",
      render: (idType: string) => <Text className="text-sm">{idType}</Text>,
    },
    {
      title: <HeaderCell title="ID Value" />,
      dataIndex: "idValue",
      key: "idValue",
      render: (idValue: string) => <Text className="text-sm">{idValue}</Text>,
    },
    {
      title: <HeaderCell title="Comments" />,
      dataIndex: "comments",
      key: "comments",
      render: (comments: string) => <Text className="text-sm">{comments}</Text>,
    },
    {
      title: <HeaderCell title="Booking Identifier" />,
      dataIndex: "bookingIdentifier",
      key: "bookingIdentifier",
      render: (bookingIdentifier: number) => (
        <BookingDetails bookingIdentifier={bookingIdentifier} />
      ),
    },
    // {
    //   title: <HeaderCell title="Actions" className="opacity-0" />,
    //   dataIndex: "action",
    //   key: "action",
    //   width: 120,
    //   render: (_: string, row: any) => (
    //     <div className="flex items-center justify-end gap-3 pe-4">
    //       <Tooltip
    //         size="sm"
    //         content={"Edit Guest"}
    //         placement="top"
    //         color="invert"
    //       >
    //         <Button
    //           onClick={() => onEditToggle(row)}
    //           size="sm"
    //           variant="outline"
    //           aria-label={"Edit Guest"}
    //         >
    //           <PencilIcon className="h-4 w-4" />
    //         </Button>
    //       </Tooltip>
    //       <DeletePopover
    //         id={row.recordIdentifier.toString()}
    //         title={`guests`}
    //         description={`Are you sure you want to delete Guest #${row.recordIdentifier}?`}
    //         onDeleteItem={onDeleteItem}
    //       />
    //     </div>
    //   ),
    // },
  ];
  