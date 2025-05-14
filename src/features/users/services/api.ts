import { sortByToApiSort } from "@/core/utils/table-sort-mapper.utils";
import { User, UserFilters } from "../types/user";
import { get } from "@/core/services/api";
import { PaginatedData } from "@/core/types";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/core/constants";

export const getUsers = (
  filtersAndPagination: UserFilters
): Promise<PaginatedData<User>> => {
  const {
    sortBy,
    pageIndex = DEFAULT_PAGE_INDEX,
    pageSize = DEFAULT_PAGE_SIZE,
    status,
    ...filters
  } = filtersAndPagination;
  console.log({ status });

  const sortParamValues = sortByToApiSort(sortBy);

  return get<PaginatedData<User>>(`/users`, {
    params: {
      _page: String(pageIndex + 1),
      _per_page: String(pageSize),
      ...(sortParamValues ? { _sort: sortParamValues } : {}),
      ...filters,
      ...(status ? { status: status.join() } : {}),
    },
  });
};
