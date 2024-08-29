"use client";

const TrialBalanceTable = ({ data }: any) => {
  console.log("TBdata", data);

  // Extract debit and credit data from props
  const { debit, credit, totalDebit, totalCredit } = data;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            {/* Debit Side Header */}
            <th className="border border-gray-200 px-4 py-2 text-left">
              Particular
            </th>
            <th className="border border-gray-200 px-4 py-2 text-right">
              Taka
            </th>
            {/* Credit Side Header */}
            <th className="border border-gray-200 px-4 py-2 text-left">
              Particular
            </th>
            <th className="border border-gray-200 px-4 py-2 text-right">
              Taka
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Rows for Debit and Credit */}
          {debit.map((debitGroup, index) => {
            const creditGroup = credit[index] || {}; // Handle cases where debit and credit have different lengths
            return (
              <tr key={index}>
                {/* Debit Group and Subgroup Rows */}
                <td className="border border-gray-200 px-4 py-2 align-top">
                  <strong>Group Name:</strong> {debitGroup.groupName}
                  <ul className="ml-4 list-disc">
                    {debitGroup.subGroup.map((subGroup, subIndex) => (
                      <li key={subIndex}>
                        <strong>Subgroup Name:</strong> {subGroup.subGroupName}
                        <ul className="ml-4 list-disc">
                          {subGroup.account.map((account, accIndex) => (
                            <li key={accIndex}>{account.accountName}</li>
                          ))}
                        </ul>
                      </li>
                    ))}
                  </ul>
                </td>
                {/* Debit Taka Column */}
                <td className="border border-gray-200 px-4 py-2 align-top text-right">
                  {debitGroup.subGroup.map((subGroup) => (
                    <ul key={subGroup.subGroupName} className="ml-4 list-none">
                      {subGroup.account.map((account) => (
                        <li key={account.accountName}>
                          {account.closingBalance.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  ))}
                </td>

                {/* Credit Group and Subgroup Rows */}
                <td className="border border-gray-200 px-4 py-2 align-top">
                  {creditGroup.groupName && (
                    <>
                      <strong>Group Name:</strong> {creditGroup.groupName}
                      <ul className="ml-4 list-disc">
                        {creditGroup.subGroup.map((subGroup, subIndex) => (
                          <li key={subIndex}>
                            <strong>Subgroup Name:</strong>{" "}
                            {subGroup.subGroupName}
                            <ul className="ml-4 list-disc">
                              {subGroup.account.map((account, accIndex) => (
                                <li key={accIndex}>{account.accountName}</li>
                              ))}
                            </ul>
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </td>
                {/* Credit Taka Column */}
                <td className="border border-gray-200 px-4 py-2 align-top text-right">
                  {creditGroup.subGroup &&
                    creditGroup.subGroup.map((subGroup) => (
                      <ul
                        key={subGroup.subGroupName}
                        className="ml-4 list-none"
                      >
                        {subGroup.account.map((account) => (
                          <li key={account.accountName}>
                            {account.closingBalance.toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    ))}
                </td>
              </tr>
            );
          })}
          {/* Total Row */}
          <tr>
            <td className="border border-gray-200 px-4 py-2 font-bold">
              Total Debit
            </td>
            <td className="border border-gray-200 px-4 py-2 font-bold text-right">
              {totalDebit.toFixed(2)}
            </td>
            <td className="border border-gray-200 px-4 py-2 font-bold">
              Total Credit
            </td>
            <td className="border border-gray-200 px-4 py-2 font-bold text-right">
              {totalCredit.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TrialBalanceTable;
