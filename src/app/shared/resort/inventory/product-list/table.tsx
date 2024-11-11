'use client';

import React, { useCallback, useMemo, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import { Button } from 'rizzui';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from '@/app/shared/resort/inventory/product-list/columns';
import { CreateInventoryInput } from '@/utils/validators/create-inventory.schema';
const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const FilterElement = dynamic(
  () => import('@/app/shared/resort/inventory/product-list/filter-element'),
  { ssr: false }
);
const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});

const filterState = {
  price: ['', ''],
  createdAt: [null, null],
  status: '',
};

interface InventoriesTableProps {
  data: any[];
  onEditToggle: (inventory?: CreateInventoryInput) => void;
}

type ResortData = {
  resortIdentifier: number;
  label: string;
};

type RoomTypeData = {
  recIdentifier: number;
  roomType: string;
  maxOccupancy: number;
};

export const InventoriesTable: React.FC<InventoriesTableProps> = ({
  data,
  onEditToggle,
}) => {
  const [pageSize, setPageSize] = useState(10);
  const [resorts, setResorts] = useState<ResortData[]>([]);
  const [roomTypes, setRoomTypes] = useState<RoomTypeData[]>([]);

  useEffect(() => {
    // Fetch resort data from API
    const fetchResortData = async () => {
      try {
        const response = await fetch(`${apiUrl}/resorts/view`);
        const resortData = await response.json();
        setResorts(resortData);
      } catch (error) {
        console.error('Error fetching resort data:', error);
      }
    };

    // Fetch room type data from API
    const fetchRoomTypeData = async () => {
      try {
        const response = await fetch(`${apiUrl}/ResortRoomType/getCount`);
        const roomTypeData = await response.json();
        setRoomTypes(roomTypeData);
      } catch (error) {
        console.error('Error fetching room type data:', error);
      }
    };

    fetchResortData();
    fetchRoomTypeData();
  }, []);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
    handleReset,
  } = useTable(data, pageSize, filterState);

  const columns = useMemo(
    () =>
      getColumns({
        data,
        sortConfig,
        checkedItems: selectedRowKeys,
        onHeaderCellClick,
        onDeleteItem,
        onChecked: handleRowSelect,
        handleSelectAll,
        onEditToggle,
        resorts, // Pass the fetched resort data to the columns
        roomTypes, // Pass the fetched room type data to the columns
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
      onEditToggle,
      resorts, // Include resorts in the dependency array
      roomTypes, // Include roomTypes in the dependency array
    ]
  );

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <>
      <ControlledTable
        variant="modern"
        isLoading={isLoading}
        showLoadingText={true}
        data={tableData}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        filterOptions={{
          searchTerm,
          onSearchClear: () => {
            handleSearch('');
          },
          onSearchChange: (event) => {
            handleSearch(event.target.value);
          },
          hasSearched: isFiltered,
          hideIndex: 1,
          columns,
          checkedColumns,
          setCheckedColumns,
          enableDrawerFilter: true,
        }}
        // filterElement={
        //   <FilterElement
        //     filters={filters}
        //     isFiltered={isFiltered}
        //     updateFilter={updateFilter}
        //     handleReset={handleReset}
        //   />
        // }
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              handleDelete(ids);
            }}
          >
            <Button size="sm" className="dark:bg-gray-300 dark:text-gray-800">
              Download {selectedRowKeys.length}{' '}
              {selectedRowKeys.length > 1 ? 'Room Types' : 'Room Type'}
            </Button>
          </TableFooter>
        }
        className="overflow-hidden rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </>
  );
};
