export const generateAssetId = () => {
  // Generate a random 6-digit number
  const randomNumber = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;

  // Create the assetId
  const assetId = `asset-${randomNumber}`;

  return assetId;
};

// let counter = 0;

// export const generateAssetId = () => {
//   // Increment the counter
//   counter++;

//   // Format the counter with leading zeros
//   const formattedCounter = counter.toString().padStart(5, '0');

//   // Create the assetId
//   const assetId = `asset-${formattedCounter}`;

//   return assetId;
// };
