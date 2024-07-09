/* eslint-disable @typescript-eslint/no-explicit-any */
import { Profile, UserRoles, UserStatus, isMeal } from '@prisma/client';

export type IAccountCreate = {
  accountName: string;
};

export type IUpdateUserRequest = {
  firstName: string;
  lastName: string;
  profileImage: string;
  password: string;
  role: UserRoles;
};

export type UserProfile = {
  profileId: string;
  firstName: string;
  lastName: string;
  role: UserRoles;
  profileImage: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export type IUsersResponse = {
  userId: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  profile: Profile | null;
  userStatus: UserStatus;
};
export type IUpdateProfileReqAndResponse = {
  firstName?: string;
  lastName?: string;
  profileImage?: string;
  isMeal?: isMeal;
  nationalId?: string;
  jobId?: string;
  jobTitle?: string;
  joiningDate?: Date;
  experience?: string;
  salary?: number;
  address?: string;
  birthCertificateNo?: string;
  dateOfBirth?: Date;
  bankAccountNo?: string;
  mobileNo?: string;
  email?: string;
  password?: string;
  userStatus?: UserStatus;
};
export type IUserUpdateReqAndResponse = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  userStatus?: UserStatus;
  role?: UserRoles;
  profileId?: string;
  isMeal?: isMeal;
};
