// let lastTransactionNumber = 0;

// export function generateTransactionId(accountName: string): string {
//   // Increment the last used number by 1
//   lastTransactionNumber += 1;

//   // Format the number to always be two digits (e.g., 01, 02, 03)
//   const formattedNumber = String(lastTransactionNumber).padStart(2, '0');

//   // Combine account name with the formatted number
//   return accountName + formattedNumber;
// }

//Next Call
export const generateTransactionId = () => {
  // Generate a random 6-digit number (between 100000 and 999999)
  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  // Combine the prefix 'tr' with the generated 6-digit number
  return `tr${randomNumber}`;
};
