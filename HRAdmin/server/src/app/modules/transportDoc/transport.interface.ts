import { docStatus } from '@prisma/client';

export type ITransportDocFilterRequest = {
  searchTerm?: string | undefined;
  startDate?: string | null; // Date range start
  endDate?: string | null; // Date range end
  vehicleName?: string | undefined;
  docExpiryDate?: string | null;
};

export type ITransportDocRequest = {
  vehicleId: string;
  docName: string;
  docNumber: string;
  docStatus: docStatus;
  docExpiryDate: Date;
  docFile: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ITransportDocCreateRequest = {
  vehicleId: string;
  docName: string;
  docNumber: string;
  docStatus: docStatus;
  docExpiryDate: Date;
  docFile: string;
  note: string;
  createdAt: Date;
  updatedAt: Date;
};

export type ITransportDocUpdateRequest = {
  docName?: string;
  docNumber?: string;
  docStatus?: docStatus;
  docExpiryDate?: Date;
  docFile?: string;
  note?: string;
  vehicleId?: string;
  oldFilePath?: string;
};
