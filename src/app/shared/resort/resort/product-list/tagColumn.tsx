import { HeaderCell } from "@/components/ui/table";
import { Text, Tooltip, Button } from "rizzui";
import PencilIcon from "@/components/icons/pencil";
import DeletePopover from "@/app/shared/delete-popover";
import { TagType } from "@/data/resort";

type Columns = {
  onEditToggle: (tag: TagType) => void;
  onDeleteItem: (id: string) => void;
  data: TagType[];
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
  {
    title: <HeaderCell title="Tag Label" />,
    dataIndex: 'tagLabel',
    key: 'tagLabel',
    sorter: true,
    sortOrder: sortConfig.key === 'tagLabel' ? sortConfig.direction : undefined,
    render: (tagLabel: string) => <Text className="text-sm">{tagLabel}</Text>,
  },
  {
    title: <HeaderCell title="Tag Class" />,
    dataIndex: 'tagClass',
    key: 'tagClass',
    sorter: true,
    sortOrder: sortConfig.key === 'tagClass' ? sortConfig.direction : undefined,
    render: (tagClass: string) => <Text className="text-sm">{tagClass}</Text>,
  },
  {
    title: <HeaderCell title="Tag Description" />,
    dataIndex: 'tagDesc',
    key: 'tagDesc',
    sorter: true,
    sortOrder: sortConfig.key === 'tagDesc' ? sortConfig.direction : undefined,
    render: (tagDesc: string) => <Text className="text-sm">{tagDesc}</Text>,
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
//     render: (_: string, row: TagType) => (
//       <div className="flex items-center justify-end gap-3 pe-4">
//         <Tooltip
//           size="sm"
//           content={"Edit Tag"}
//           placement="top"
//           color="invert"
//         >
//           <Button
//             onClick={() => onEditToggle(row)}
//             size="sm"
//             variant="outline"
//             aria-label={"Edit Tag"}
//           >
//             <PencilIcon className="h-4 w-4" />
//           </Button>
//         </Tooltip>
//         <DeletePopover
//           id={row.tagId.toString()}
//           title={`tag`}
//           description={`Are you sure you want to delete this #${row.tagId} Tag?`}
//           onDeleteItem={onDeleteItem}
//         />
//       </div>
//     ),
//   }
];