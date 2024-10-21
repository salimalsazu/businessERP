import { useGetTransactionByIdQuery } from "@/redux/api/features/transactionApi";
import { Modal } from "rsuite";

const TransactionModal = ({ open, handleClose, singleTransaction }: any) => {
  const { data: getTransaction } = useGetTransactionByIdQuery(
    singleTransaction?.transactionId
  );

  const transaction = getTransaction?.data; // Access the nested data from your API response

  return (
    <Modal backdrop={true} keyboard={false} open={open} onClose={handleClose}>
      <Modal.Header>
        <Modal.Title>Transaction Details : {transaction?.trId}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {transaction ? (
          <div className="overflow-x-auto">
            <p className="text-sm mb-2">
              <span className="font-bold"> Transaction Date: </span>{" "}
              {new Date(transaction?.transactionDate).toLocaleString()}
            </p>
            <p className="text-sm mb-4">
              <span className="font-bold">Transaction Description:</span>{" "}
              {transaction?.transactionDescription}
            </p>

            <table className="min-w-full bg-white border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b font-bold">SL</th>
                  <th className="py-2 px-4 border-b font-bold">Particular</th>
                  <th className="py-2 px-4 border-b font-bold">Debit Tk</th>
                  <th className="py-2 px-4 border-b font-bold">Credit Tk</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b">01</td>
                  <td className="py-2 px-4 border-b">
                    {transaction?.debitAccount?.accountName}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {transaction?.transactionAmount}
                  </td>
                  <td className="py-2 px-4 border-b">-</td>
                </tr>

                <tr>
                  <td className="py-2 px-4 border-b">02</td>
                  <td className="py-2 px-4 border-b">
                    {transaction?.creditAccount?.accountName}
                  </td>
                  <td className="py-2 px-4 border-b">-</td>
                  <td className="py-2 px-4 border-b">
                    {transaction?.transactionAmount}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <p>Loading transaction details...</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default TransactionModal;
