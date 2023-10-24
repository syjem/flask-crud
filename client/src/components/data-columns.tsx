import clipboard from '@/utils/copy';
import { Button } from './ui/button';
import { ColumnDef } from '@tanstack/react-table';
import type { dataType } from '@/utils/constants';
import { ArrowUpDown, MoreHorizontal, Copy, Edit, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { deleteData } from '@/https/delete';
import { useNavigate } from 'react-router-dom';

export const Columns = () => {
  const navigate = useNavigate();

  const columns: ColumnDef<dataType>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ row }) => (
        <div
          className="pl-1 dark:text-slate-2
        00">
          {row.getValue('id')}
        </div>
      ),
    },
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div
          className="capitalize dark:text-slate-2
        00">
          {row.getValue('name')}
        </div>
      ),
    },
    {
      accessorKey: 'date',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() =>
              column.toggleSorting(column.getIsSorted() === 'asc')
            }>
            Date
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div
          className="pl-4 dark:text-slate-2
        00">
          {row.getValue('date')}
        </div>
      ),
    },
    {
      id: 'actions',
      enableHiding: false,
      header: 'Actions',
      cell: ({ row }) => {
        const person = row.original;
        const nameAndDate = `id: ${person.id}, name: ${person.name}, birthday: ${person.date}`;
        const formatName = person.name.replace(/ /g, '-').toLowerCase();

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 dark:text-slate-200">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="text-slate-700 dark:text-slate-300 focus:text-slate-600 dark:focus:text-slate-400 gap-[6px] cursor-pointer"
                onClick={() => clipboard(nameAndDate)}>
                <Copy className="h-4 w-4" /> Copy
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-emerald-700 dark:text-emerald-500 focus:text-emerald-600 dark:focus:text-emerald-600 gap-[6px] cursor-pointer"
                onClick={() =>
                  navigate(`/${person.id}/${formatName}/${person.date}/update`)
                }>
                <Edit className="h-4 w-4" /> Update
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-700 dark:text-red-500 focus:text-red-600 dark:focus:text-red-600 gap-[6px] cursor-pointer"
                onClick={() => deleteData(person.id)}>
                <Trash2 className="h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
