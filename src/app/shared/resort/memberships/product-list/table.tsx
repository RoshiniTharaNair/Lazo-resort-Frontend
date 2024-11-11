"use client";

import { useCallback, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { useTable } from "@/hooks/use-table";
import { useColumn } from "@/hooks/use-column";
import { Button } from "rizzui";
import ControlledTable from "@/components/controlled-table";
import { getColumns } from "@/app/shared/resort/memberships/product-list/columns";

const FilterElement = dynamic(
  () => import("@/app/shared/resort/memberships/product-list/filter-element"),
  { ssr: false }
);
const TableFooter = dynamic(() => import("@/app/shared/table-footer"), {
  ssr: false,
});

const filterState = {
  purchasePoints: ["", ""],
  validityStart: [null, null],
  status: "",
};

export default function MembershipsTable({
  data = [],
  onEditToggle,
  customerMap,
  resortMap,
}: {
  data: any[];
  onEditToggle: (membership: any) => void;
  customerMap: Record<number, string>;
  resortMap: Record<number, string>;
}) {
  const [pageSize, setPageSize] = useState(10);

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
        customerMap,
        resortMap,
      }),
    [
      selectedRowKeys,
      onHeaderCellClick,
      sortConfig.key,
      sortConfig.direction,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
      onEditToggle,
      customerMap,
      resortMap,
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
            handleSearch("");
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
              Download {selectedRowKeys.length}{" "}
              {selectedRowKeys.length > 1 ? "Memberships" : "Membership"}
            </Button>
          </TableFooter>
        }
        className="overflow-hidden rounded-md border border-muted text-sm shadow-sm"
      />
    </>
  );
}
