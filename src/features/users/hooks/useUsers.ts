import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from "@tanstack/react-query";
import { GET_USERS_CACHE_KEY } from "../constants";
import { getUsers } from "../services/api";
import { UserFilters } from "../types/user";

export const getUsersQueryOptions = (filters: UserFilters) => {
  return queryOptions({
    queryKey: [GET_USERS_CACHE_KEY, filters],
    queryFn: () => getUsers(filters),
    placeholderData: keepPreviousData,
  });
};

export const useUsers = (filters: UserFilters) => {
  const { data, isLoading, isFetching } = useQuery(
    getUsersQueryOptions(filters)
  );
  if (!data) {
    throw "error";
  }
  return { data, isLoading, isFetching };
};
