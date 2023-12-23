/* eslint-disable @typescript-eslint/no-explicit-any */
export const decreaseDateByDays = (dateString: Date, days: number): any => {
  const originalDate = new Date(dateString);
  const decreaseDate = new Date(originalDate.getTime() - days * 24 * 60 * 60 * 1000);
  return decreaseDate.toISOString();
};
