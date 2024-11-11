import { HeaderCell } from "@/components/ui/table";
import { Text, Tooltip, Button } from "rizzui";
import PencilIcon from "@/components/icons/pencil";
import DeletePopover from "@/app/shared/delete-popover";
import { SpocType } from "@/data/resort";

type Columns = {
  onEditToggle: (spoc: SpocType) => void;
  onDeleteItem: (id: string) => void;
  data: SpocType[];
  sortConfig: { key: string; direction: string };
  checkedItems: string[];
  onHeaderCellClick: (value: string) => void;
  handleSelectAll: () => void;
  onChecked: (id: string) => void;
};

export const getColumns = ({
  onEditToggle,
  onDeleteItem,
  data,
  sortConfig,
  checkedItems,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
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
  // {
  //   title: <HeaderCell title="SPOC ID" />,
  //   dataIndex: 'spocId',
  //   key: 'spocId',
  //   sorter: true,
  //   sortOrder: sortConfig.key === 'spocId' ? sortConfig.direction : undefined,
  //   render: (spocId: number) => <Text className="text-sm">{spocId}</Text>,
  // },
//   {
//     title: <HeaderCell title="Employee Code" />,
//     dataIndex: 'emp_code',
//     key: 'emp_code',
//     sorter: true,
//     sortOrder: sortConfig.key === 'emp_code' ? sortConfig.direction : undefined,
//     render: (emp_code: string) => <Text className="text-sm">{emp_code}</Text>,
//   },
  {
    title: <HeaderCell title="SPOC Role" />,
    dataIndex: 'spoc_role',
    key: 'spoc_role',
    sorter: true,
    sortOrder: sortConfig.key === 'spoc_role' ? sortConfig.direction : undefined,
    render: (spoc_role: string) => <Text className="text-sm">{spoc_role}</Text>,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    sorter: true,
    sortOrder: sortConfig.key === 'status' ? sortConfig.direction : undefined,
    render: (status: string) => <Text className="text-sm">{status}</Text>,
  },
//   {
//     title: <HeaderCell title="Actions" className="opacity-0" />,
//     dataIndex: "action",
//     key: "action",
//     width: 120,
//     render: (_: string, row: SpocType) => (
//       <div className="flex items-center justify-end gap-3 pe-4">
//         <Tooltip
//           size="sm"
//           content={"Edit SPOC"}
//           placement="top"
//           color="invert"
//         >
//           <Button
//             onClick={() => onEditToggle(row)}
//             size="sm"
//             variant="outline"
//             aria-label={"Edit SPOC"}
//           >
//             <PencilIcon className="h-4 w-4" />
//           </Button>
//         </Tooltip>
//         <DeletePopover
//           id={row.spocId.toString()}
//           title={`spoc`}
//           description={`Are you sure you want to delete this #${row.spocId} SPOC?`}
//           onDeleteItem={onDeleteItem}
//         />
//       </div>
//     ),
//   }
];