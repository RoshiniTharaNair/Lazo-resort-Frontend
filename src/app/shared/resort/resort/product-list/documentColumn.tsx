import { HeaderCell } from "@/components/ui/table";
import { Text, Tooltip, Button } from "rizzui";
import PencilIcon from "@/components/icons/pencil";
import DeletePopover from "@/app/shared/delete-popover";
import { CreateResortInput } from '@/utils/validators/create-resort.schema';
import { DocumentType, ResortType } from "@/data/resort";


type Columns = {
  onEditToggle: (document: CreateResortInput) => void;
  onDeleteItem: (id: string) => void;
  data: CreateResortInput[];
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
    title: <HeaderCell title="Document Type" />,
    dataIndex: 'doc_type',
    key: 'doc_type',
    sorter: true,
    sortOrder: sortConfig.key === 'doc_type' ? sortConfig.direction : undefined,
    render: (doc_type: string) => <Text className="text-sm">{doc_type}</Text>,
  },
  {
    title: <HeaderCell title="Document URL" />,
    dataIndex: 'doc_url',
    key: 'doc_url',
    sorter: true,
    sortOrder: sortConfig.key === 'doc_url' ? sortConfig.direction : undefined,
    render: (doc_url: string) => <Text className="text-sm">{doc_url}</Text>,
  },
  {
    title: <HeaderCell title="Effective Date" />,
    dataIndex: 'doc_effdate',
    key: 'doc_effdate',
    sorter: true,
    sortOrder: sortConfig.key === 'doc_effdate' ? sortConfig.direction : undefined,
    render: (doc_effdate: string) => <Text className="text-sm">{doc_effdate}</Text>,
  },
  {
    title: <HeaderCell title="POC Name" />,
    dataIndex: 'poc_name',
    key: 'poc_name',
    sorter: true,
    sortOrder: sortConfig.key === 'poc_name' ? sortConfig.direction : undefined,
    render: (poc_name: string) => <Text className="text-sm">{poc_name}</Text>,
  },
  {
    title: <HeaderCell title="POC Contact" />,
    dataIndex: 'poc_cont',
    key: 'poc_cont',
    sorter: true,
    sortOrder: sortConfig.key === 'poc_cont' ? sortConfig.direction : undefined,
    render: (poc_cont: string) => <Text className="text-sm">{poc_cont}</Text>,
  },
  {
    title: <HeaderCell title="POC Email" />,
    dataIndex: 'poc_email',
    key: 'poc_email',
    sorter: true,
    sortOrder: sortConfig.key === 'poc_email' ? sortConfig.direction : undefined,
    render: (poc_email: string) => <Text className="text-sm">{poc_email}</Text>,
  },
//   {
//     // Need to avoid this issue -> <td> elements in a large <table> do not have table headers.
//     title: <HeaderCell title="Actions" className="opacity-0" />,
//     dataIndex: "action",
//     key: "action",
//     width: 120,
//     render: (_: string, row: DocumentType) => (
//       <div className="flex items-center justify-end gap-3 pe-4">
//         <Tooltip
//           size="sm"
//           content={"Edit Document"}
//           placement="top"
//           color="invert"
//         >
//           <Button
//             onClick={() => onEditToggle(row as unknown as CreateResortInput)} // Cast row to unknown first
//             size="sm"
//             variant="outline"
//             aria-label={"Edit Document"}
//           >
//             <PencilIcon className="h-4 w-4" />
//           </Button>
//         </Tooltip>
//         <DeletePopover
//           id={row.doc_id.toString()}
//           title={`document`}
//           description={`Are you sure you want to delete this #${row.doc_id} Document?`}
//           onDeleteItem={onDeleteItem}
//         />
//       </div>
//     ),
//   }
];