import { User } from "@/features/users/types/user";
import { faker } from "@faker-js/faker";

const createUser = (): User => {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int(40),
    visits: faker.number.int(1000),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle<User["status"]>([
      "relationship",
      "complicated",
      "single",
    ])[0]!,
  };
};

export const makeData = (len: number) => {
  const users = [];
  while (len) {
    users.push(createUser());
    len--;
  }
  return users;
};
