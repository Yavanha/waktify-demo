import type { Column } from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  EyeOff,
  GripVertical,
  Loader2,
  X,
} from "lucide-react";

import { cn } from "@/core/lib/utils";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CSSProperties } from "react";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.ComponentProps<typeof DropdownMenuTrigger> {
  column: Column<TData, TValue>;
  title: string;
  isFetching?: boolean;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
  isFetching = false,
  ...props
}: DataTableColumnHeaderProps<TData, TValue>) {
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: column.id,
    });

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform), // translate instead of transform to avoid squishing
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    width: column.getSize(),
    zIndex: isDragging ? 1 : 0,
  };
  if (!column.getCanSort() && !column.getCanHide()) {
    return <div className={cn(className)}>{title}</div>;
  }

  if (isFetching && column.getIsSorted()) {
    return (
      <div className="flex items-center gap-1.5">
        <div className={cn(className)}>{title}</div>
        <Loader2 className="h-3 w-3 animate-spin" />
      </div>
    );
  }

  return (
    <DropdownMenu>
      <div
        className="flex items-center"
        ref={setNodeRef}
        style={{
          ...style,
        }}
      >
        <DropdownMenuTrigger
          className={cn(
            "-ml-1.5 flex h-8 items-center gap-1.5 rounded-md px-2 py-1.5 hover:bg-accent focus:outline-none focus:ring-1 focus:ring-ring data-[state=open]:bg-accent [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-muted-foreground",
            className
          )}
          {...props}
        >
          {title}
          {column.getCanSort() &&
            (column.getIsSorted() === "desc" ? (
              <ChevronDown />
            ) : column.getIsSorted() === "asc" ? (
              <ChevronUp />
            ) : (
              <ChevronsUpDown />
            ))}
        </DropdownMenuTrigger>
        <GripVertical {...attributes} {...listeners} className="w-4" />
      </div>
      <DropdownMenuContent align="start" className="w-28">
        {column.getCanSort() && (
          <>
            <DropdownMenuCheckboxItem
              className="relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground"
              checked={column.getIsSorted() === "asc"}
              onClick={() => column.toggleSorting(false)}
            >
              <ChevronUp />
              Asc
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              className="relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground"
              checked={column.getIsSorted() === "desc"}
              onClick={() => column.toggleSorting(true)}
            >
              <ChevronDown />
              Desc
            </DropdownMenuCheckboxItem>
            {column.getIsSorted() && (
              <DropdownMenuItem
                className="pl-2 [&_svg]:text-muted-foreground"
                onClick={() => column.clearSorting()}
              >
                <X />
                Reset
              </DropdownMenuItem>
            )}
          </>
        )}
        {column.getCanHide() && (
          <DropdownMenuCheckboxItem
            className="relative pr-8 pl-2 [&>span:first-child]:right-2 [&>span:first-child]:left-auto [&_svg]:text-muted-foreground"
            checked={!column.getIsVisible()}
            onClick={() => column.toggleVisibility(false)}
          >
            <EyeOff />
            Hide
          </DropdownMenuCheckboxItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
