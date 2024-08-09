let lastTransactionNumber = 0;

export function generateTransactionId(accountName: string): string {
  // Increment the last used number by 1
  lastTransactionNumber += 1;

  // Format the number to always be two digits (e.g., 01, 02, 03)
  const formattedNumber = String(lastTransactionNumber).padStart(2, '0');

  // Combine account name with the formatted number
  return accountName + formattedNumber;
}
