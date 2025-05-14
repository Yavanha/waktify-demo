import { Filters } from "@/core/types";

export type UserStatus = "relationship" | "complicated" | "single";
export interface User {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  progress: number;
  status: UserStatus;
}

export type UserFilters = Filters<Omit<User, "status">> & {
  status: UserStatus[];
};
