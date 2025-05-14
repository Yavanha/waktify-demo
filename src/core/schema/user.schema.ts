import { z } from "zod";

export const RelationshipStatus = z.enum([
  "relationship",
  "complicated",
  "single",
]);

export const UserSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().nonempty(),
  age: z.number().min(18).max(50),
  visitis: z.number().min(0).max(1000),
  progress: z.number(),
  status: RelationshipStatus,
});

export type UserType = z.infer<typeof UserSchema>;
