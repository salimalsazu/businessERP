import { Notification } from "rsuite";

export const TransactionSuccessful = (messageData: any) => {
  console.log(messageData);

  return (
    <Notification type="success" header="success" closable>
      <div>
        <p className="text-lg font-semibold">
          {messageData?.message ?? "Transaction added Successfully"}
        </p>
      </div>
      <hr className="border-t border-gray-500 w-full" />
      <div>
        <p className="flex gap-2">
          <span>Transaction Id:</span>
          <span>{messageData?.data?.data?.trId}</span>
        </p>
      </div>{" "}
    </Notification>
  );
};

export const TransactionErrorMessage = (message: any) => {
  return (
    <Notification type="error" header="Error" closable>
      <div>
        <p className="text-lg font-semibold mb-2">
          {message ?? "Error! Something went wrong !"}
        </p>
      </div>
    </Notification>
  );
};
