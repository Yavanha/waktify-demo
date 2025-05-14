import { ColumnFiltersState, SortingState } from "@tanstack/react-table";
import { SortParams } from "../types";

export const stateToSortBy = (sorting: SortingState | undefined) => {
  if (!sorting || sorting.length == 0) return undefined;

  const sorts = sorting.map(
    (sort) => `${sort.id}.${sort.desc ? "desc" : "asc"}` as const
  );

  return sorts;
};

export const sortByToState = (sortBy: SortParams["sortBy"] | undefined) => {
  if (!sortBy) return [];

  return sortBy.map((sort) => {
    const [id, desc] = sort.split(".");
    return { id, desc: desc === "desc" };
  });
};

export const sortByToApiSort = (sortBy: SortParams["sortBy"] | undefined) => {
  if (!sortBy) return undefined;
  const sortApiParsed = sortBy.reduce((acc, sort) => {
    const [id, order] = sort.split(".");
    return acc + `${order == "desc" ? "-" : ""}${id},`;
  }, "");
  return sortApiParsed;
};

export const columnFiltersToDataFilter = <TData>(
  columnFilters: ColumnFiltersState
): TData => {
  return columnFilters.reduce((acc, filter) => {
    return { ...acc, [filter.id]: filter.value };
  }, {} as TData);
};

export const dataFilterToColumnFilters = (
  data: Omit<Record<string, unknown>, "PageIndex" | "PageSize" | "sortby">
): ColumnFiltersState => {
  return Object.entries(data).map(([key, value]) => ({
    id: key,
    value,
  }));
};
