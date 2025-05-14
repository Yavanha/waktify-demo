import { PaginationState } from "@tanstack/react-table";

export type PaginatedData<T> = {
  data: T[];
  first: number;
  prev: number;
  next: number;
  last: number;
  pages: number;
  items: number;
};

export type PaginationParams = PaginationState;
export type SortParams = { sortBy: `${string}.${"asc" | "desc"}`[] };
export type Filters<T> = Partial<T & PaginationParams & SortParams>;

export * from "./data-table";
