import { useFilters } from "@/core/hooks/userFilters";
import { useUsers } from "../hooks/useUsers";
import { DataTable } from "@/core/components/data-table/DataTable";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/core/constants";
import {
  columnFiltersToDataFilter,
  dataFilterToColumnFilters,
  sortByToState,
  stateToSortBy,
} from "@/core/utils/table-sort-mapper.utils";
import {
  type ColumnFiltersState,
  getCoreRowModel,
  PaginationState,
  Updater,
  useReactTable,
} from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";
import { getUsersTableColumns } from "./UsersTableColumns";
import { DataTableSortList } from "@/core/components/data-table/DataTableSortList";
import { DataTableToolbar } from "@/core/components/data-table/DataTableToolbar";
import { Shell } from "@/core/components/shell";
import { User, UserStatus } from "../types/user";
import { useDebouncedCallback } from "@/core/hooks/useDebouncedCallback";
import { DEBOUNCE_MS } from "../constants";
export const UsersTable = () => {
  const { filters, setFilters, resetFilters } = useFilters("/users");
  const { data, isFetching } = useUsers(filters);
  const paginationState: PaginationState = {
    pageIndex: filters.pageIndex ? filters.pageIndex - 1 : DEFAULT_PAGE_INDEX,
    pageSize: filters.pageSize ?? DEFAULT_PAGE_SIZE,
  };
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    dataFilterToColumnFilters(filters)
  );
  const sortingState = sortByToState(filters.sortBy);
  const columns = useMemo(() => getUsersTableColumns(), []);
  const [columnOrder, setColumnOrder] = useState<string[]>(
    columns.map((c) => c.id!)
  );
  const debouncedSetFilterValues = useDebouncedCallback(
    (values: typeof filters) => {
      resetFilters();
      void setFilters(values);
    },
    DEBOUNCE_MS
  );

  const table = useReactTable({
    data: data.data,
    columns,
    state: {
      pagination: paginationState,
      sorting: sortingState,
      columnFilters: columnFilters,
      columnOrder,
    },
    onColumnOrderChange: setColumnOrder,
    onColumnFiltersChange: useCallback(
      (updaterOrValue: Updater<ColumnFiltersState>) => {
        setColumnFilters(() => {
          const newFilters =
            typeof updaterOrValue == "function"
              ? updaterOrValue(columnFilters)
              : updaterOrValue;

          debouncedSetFilterValues(
            columnFiltersToDataFilter<
              Omit<User, "status"> & { status: UserStatus[] }
            >(newFilters)
          );
          console.log(newFilters);
          return newFilters;
        });
      },
      [columnFilters, debouncedSetFilterValues]
    ),
    onSortingChange: (updaterOrValue) => {
      const newSortingState =
        typeof updaterOrValue === "function"
          ? updaterOrValue(sortingState)
          : updaterOrValue;
      return setFilters({ sortBy: stateToSortBy(newSortingState) });
    },
    onPaginationChange: (pagination) => {
      if (typeof pagination === "function") {
        const newPagination = pagination(paginationState);
        newPagination.pageIndex += 1;
        setFilters(newPagination);
      } else {
        setFilters(pagination);
      }
    },
    rowCount: data.items,
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      isFetching,
    },
  });

  return (
    <div className="flex  justify-center ">
      <Shell className="gap-2">
        <DataTable table={table}>
          <DataTableToolbar table={table}>
            <DataTableSortList table={table} align="end" />
          </DataTableToolbar>
        </DataTable>
      </Shell>
    </div>
  );
};
