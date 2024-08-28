export const groupFilterableFields: string[] = ['searchTerm', 'startDate', 'endDate'];

export const groupSearchableFields: string[] = ['accountName'];

export const groupRelationalFields: string[] = ['academicFacultyId', 'academicDepartmentId', 'academicSemesterId'];

export const groupRelationalFieldsMapper: { [key: string]: string } = {
  academicFacultyId: 'academicFaculty',
  academicDepartmentId: 'academicDepartment',
  academicSemesterId: 'academicSemester',
};

export const ZodUserRoles = ['SUPERADMIN', 'ADMIN', 'USER'];
