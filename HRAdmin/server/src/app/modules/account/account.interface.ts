/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRoles } from '@prisma/client';

export type IAccountFilterRequest = {
  searchTerm?: string | undefined;
};

export type IAccountCreate = {
  accountName: string;
  openingBalance: number;
  closingBalance: number;
};

export type IUpdateUserRequest = {
  firstName: string;
  lastName: string;
  profileImage: string;
  password: string;
  role: UserRoles;
};
