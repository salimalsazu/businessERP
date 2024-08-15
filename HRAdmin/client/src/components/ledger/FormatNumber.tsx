export const formatNumber = (number: any) => {
  if (isNaN(number) || number === null || number === undefined) {
    return "-"; // or any placeholder like "N/A"
  }
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(number);
};
