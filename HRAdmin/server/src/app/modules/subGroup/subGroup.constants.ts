export const subGroupFilterableFields: string[] = ['searchTerm', 'startDate', 'endDate'];

export const subGroupSearchableFields: string[] = ['accountName', 'trId', 'startDate', 'endDate'];

export const subGroupRelationalFields: string[] = ['academicFacultyId', 'academicDepartmentId', 'academicSemesterId'];

export const subGroupRelationalFieldsMapper: { [key: string]: string } = {
  academicFacultyId: 'academicFaculty',
  academicDepartmentId: 'academicDepartment',
  academicSemesterId: 'academicSemester',
};

export const ZodUserRoles = ['SUPERADMIN', 'ADMIN', 'USER'];
