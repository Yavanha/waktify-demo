import { UsersTable } from "@/features/users/components/UsersTable";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/users")({
  component: UsersLazy,
});

function UsersLazy() {
  return <UsersTable />;
}
