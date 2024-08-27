/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserRoles } from '@prisma/client';

export type IAccountFilterRequest = {
  searchTerm?: string | undefined;
  trId?: string | undefined;
  startDate?: string | undefined;
  endDate?: string | undefined;
};

export type IAccountCreate = {
  accountName: string;
  closingBalance: number;
  subGroupId: string;
};

export type IUpdateUserRequest = {
  firstName: string;
  lastName: string;
  profileImage: string;
  password: string;
  role: UserRoles;
};
