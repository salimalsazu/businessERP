export const accountFilterableFields: string[] = ['searchTerm'];

export const accountSearchableFields: string[] = ['accountName'];

export const accountRelationalFields: string[] = ['academicFacultyId', 'academicDepartmentId', 'academicSemesterId'];

export const accountRelationalFieldsMapper: { [key: string]: string } = {
  academicFacultyId: 'academicFaculty',
  academicDepartmentId: 'academicDepartment',
  academicSemesterId: 'academicSemester',
};

export const ZodUserRoles = ['SUPERADMIN', 'ADMIN', 'USER'];
