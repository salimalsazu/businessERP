import { Notification } from "rsuite";

export const LoginSuccess = (message: any) => {
  return (
    <Notification type="success" header="success" closable>
      <div>
        <p className="text-lg font-semibold mb-2">
          {message ?? "Login Successfully"}
        </p>
      </div>
    </Notification>
  );
};

export const LoginError = (message: any) => {
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
