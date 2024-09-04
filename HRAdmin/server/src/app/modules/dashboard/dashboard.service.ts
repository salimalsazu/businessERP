import prisma from '../../../shared/prisma';

const getAllSummery = async () => {
  try {
    const [transactionCount, accountCount, requisitionCount] = await Promise.all([
      prisma.transaction.count(),
      prisma.account.count(),
      prisma.requisition.count(),
    ]);

    return { transactionCount, accountCount, requisitionCount };
  } catch (error) {
    console.error(`Failed to count Data: ${error}`);
  }
};

export const DashboardService = {
  getAllSummery,
};
