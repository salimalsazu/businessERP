/* eslint-disable @typescript-eslint/no-explicit-any */
import { TrailBalanceType, UserRoles } from '@prisma/client';

export type IGroupFilterRequest = {
  searchTerm?: string | undefined;
};

export type IGroupCreate = {
  groupName: string;
  tbType: TrailBalanceType;
};

