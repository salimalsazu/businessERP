import prisma from '../../../shared/prisma';

const getAllSummery = async () => {
  try {
    const [transactionCount, accountCount, requisitionCount] = await Promise.all([
      prisma.transaction.count(),
      prisma.account.count(),
      prisma.requisition.count(),
    ]);

    const pettyCashBalance = await prisma.account.findFirst({
      where: {
        accountName: 'Petty Cash',
      },
      select: {
        closingBalance: true,
      },
    });

    const bankBalance = await prisma.account.findFirst({
      where: {
        accountName: 'SJIBL-10144',
      },
      select: {
        closingBalance: true,
      },
    });

    return { transactionCount, accountCount, requisitionCount, pettyCashBalance, bankBalance };
  } catch (error) {
    console.error(`Failed to count Data: ${error}`);
  }
};

export const DashboardService = {
  getAllSummery,
};
