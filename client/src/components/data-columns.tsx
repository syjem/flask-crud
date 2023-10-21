import { ColumnDef } from '@tanstack/react-table';
import { Button } from './ui/button';
import { ArrowUpDown, MoreHorizontal, Copy, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { personType } from '@/hooks/useData';
import clipboard from '@/utils/copy';

export const columns: ColumnDef<personType>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => (
      <div className="capitalize pl-1">{row.getValue('id')}</div>
    ),
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase pl-4">{row.getValue('date')}</div>
    ),
  },
  {
    id: 'actions',
    enableHiding: false,
    header: 'Actions',
    cell: ({ row }) => {
      const person = row.original;
      const nameAndDate = `id: ${person.id}, name: ${person.name}, birthday: ${person.date}`;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              className="text-slate-700 focus:text-slate-600 dark:focus:text-slate-600 font-semibold gap-[6px] cursor-pointer"
              onClick={() => clipboard(nameAndDate)}>
              <Copy className="h-4 w-4" /> Copy
            </DropdownMenuItem>
            <DropdownMenuItem className="text-emerald-700 focus:text-emerald-600 dark:focus:text-emerald-600 font-semibold gap-[6px] cursor-pointer">
              <Edit className="h-4 w-4" /> Update
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-700 focus:text-red-600 dark:focus:text-red-600 font-semibold gap-[6px] cursor-pointer">
              <Trash2 className="h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
