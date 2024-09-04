/* eslint-disable @typescript-eslint/no-explicit-any */
import { TrailBalanceType } from '@prisma/client';

export type IGroupFilterRequest = {
  searchTerm?: string | undefined;
  selectedDate?: string | undefined;
};

export type IGroupCreate = {
  groupName: string;
  tbType: TrailBalanceType;
};
