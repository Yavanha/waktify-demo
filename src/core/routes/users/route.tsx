import { DataTableSkeleton } from "@/core/components/data-table/DataTableSkeleton";
import { getUsersQueryOptions } from "@/features/users/hooks/useUsers";
import { UserFilters } from "@/features/users/types/user";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/users")({
  loaderDeps: (search) => search,
  loader: ({ deps: { search }, context: { queryClient } }) => {
    queryClient.ensureQueryData(getUsersQueryOptions(search));
  },
  validateSearch: (search: UserFilters) => search as UserFilters,
  pendingComponent: () => (
    <>
      <span>loading...</span>
      <DataTableSkeleton
        columnCount={6}
        filterCount={2}
        cellWidths={[
          "10rem",
          "30rem",
          "10rem",
          "10rem",
          "6rem",
          "6rem",
          "6rem",
        ]}
      />
    </>
  ),
});
