import { ColumnDef } from "@tanstack/react-table";
import { User } from "../types/user";
import { DataTableColumnHeader } from "@/core/components/data-table/DataTableColumnHeader";
import { Badge } from "@/core/components/ui/badge";
import { CircleDashed, Eye, Text } from "lucide-react";
import { RelationshipStatus } from "@/core/schema/user.schema";

export function getUsersTableColumns(): ColumnDef<User>[] {
  return [
    {
      id: "firstName",
      accessorKey: "firstName",
      enableResizing: true,
      header: ({ column, table }) => (
        <DataTableColumnHeader
          column={column}
          title="First Name"
          isFetching={table.options.meta?.isFetching}
        />
      ),
      cell: (info) => info.getValue<string>(),
      meta: {
        label: "First Name",
        placeholder: "Search first name...",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
    },
    {
      id: "lastName",
      accessorKey: "lastName",
      header: ({ column, table }) => (
        <DataTableColumnHeader
          column={column}
          title="Last Name"
          isFetching={table.options.meta?.isFetching}
        />
      ),
      cell: (info) => info.getValue<string>(),
      meta: {
        label: "Last Name",
        placeholder: "Search last name...",
        variant: "text",
        icon: Text,
      },
      enableColumnFilter: true,
    },
    {
      id: "age",
      accessorKey: "age",
      header: ({ column, table }) => (
        <DataTableColumnHeader
          column={column}
          title="Age"
          isFetching={table.options.meta?.isFetching}
        />
      ),
      cell: (info) => info.getValue<string>(),
      meta: { label: "Age", variant: "number", range: [18, 50] },
      enableColumnFilter: true,
    },
    {
      id: "visits",
      accessorKey: "visits",
      header: ({ column, table }) => (
        <DataTableColumnHeader
          column={column}
          title="Visits"
          isFetching={table.options.meta?.isFetching}
        />
      ),
      cell: (info) => info.getValue<string>(),
      meta: { label: "Visits", range: [0, 1000], icon: Eye },
    },
    {
      id: "progress",
      accessorKey: "progress",
      header: ({ column, table }) => (
        <DataTableColumnHeader
          column={column}
          title="Progresse"
          isFetching={table.options.meta?.isFetching}
        />
      ),
      cell: (info) => info.getValue<string>(),
      meta: { label: "Progress", range: [0, 100], icon: CircleDashed },
    },
    {
      id: "status",
      accessorKey: "status",
      header: ({ column, table }) => (
        <DataTableColumnHeader
          column={column}
          title="Status"
          isFetching={table.options.meta?.isFetching}
        />
      ),
      cell: (info) => (
        <Badge variant="outline" className="py-1 [&>svg]:size-3.5">
          <span className="capitalize">{info.getValue<string>()}</span>
        </Badge>
      ),
      meta: {
        label: "Status",
        variant: "multiSelect",
        options: RelationshipStatus.options.map((status) => ({
          label: status.charAt(0).toUpperCase() + status.slice(1),
          value: status,
        })),
      },
    },
  ];
}
