/* eslint-disable @typescript-eslint/no-explicit-any */
import { TrailBalanceType, UserRoles } from '@prisma/client';

export type ISubGroupFilterRequest = {
  searchTerm?: string | undefined;
};

export type ISubGroupCreate = {
  subGroupName: string;
  subGroupDescription: string;
  groupId: string;
};
