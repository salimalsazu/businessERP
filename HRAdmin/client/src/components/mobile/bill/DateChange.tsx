export const DataChange = (data: any) => {
  console.log("bill-data", data);

  const newObj = data?.map((item: any) => {
    // Check if billDate is in MM/DD/YYYY format
    const dateParts = item?.billDate.split("/");

    if (dateParts.length === 3) {
      const [month, day, year] = dateParts?.map((part: any) =>
        part.padStart(2, "0")
      ); // Ensure 2-digit month/day
      const parsedDate = new Date(`${year}-${month}-${day}T00:00:00.000Z`); // Construct ISO format

      if (isNaN(parsedDate.getTime())) {
        console.error("Invalid date:", item.billDate);
        return { ...item, billDate: null }; // Handle invalid date
      }

      return {
        ...item,
        billAmount: parseFloat(item.billAmount),
        billDate: parsedDate.toISOString(),
      };
    }

    // If the format is unexpected, return null
    console.error("Unexpected date format:", item.billDate);
    return { ...item, billDate: null };
  });

  return newObj;
};
