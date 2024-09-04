import prisma from '../../../shared/prisma';

const getAllSummery = async () => {
  try {
    const [transactionCount, accountCount] = await Promise.all([prisma.transaction.count(), prisma.account.count()]);

    return { transactionCount, accountCount };
  } catch (error) {
    console.error(`Failed to count Data: ${error}`);
  }
};

export const DashboardService = {
  getAllSummery,
};
