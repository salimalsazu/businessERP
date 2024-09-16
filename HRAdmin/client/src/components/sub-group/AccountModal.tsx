import { Modal, Table, IconButton, Whisper, Tooltip } from "rsuite";
const { Column, HeaderCell, Cell } = Table;
import TrashIcon from "@rsuite/icons/Trash";
import { useDeleteAccountMutation } from "@/redux/api/features/accountApi";
import { toast } from "sonner";
import { useEffect } from "react";

const AccountModal = ({ size, open, handleClose, data }: any) => {
  const [
    deleteAccount,
    { data: messageData, error, isLoading, isSuccess, isError },
  ] = useDeleteAccountMutation();

  const handleDeleteAccount = async (accountId: string) => {
    await deleteAccount(accountId);
  };

  useEffect(() => {
    if (isSuccess && !isError) {
      toast.success(messageData?.message);
    } else if (isError && !isSuccess) {
      toast.error("Failed to delete account");
    }
  }, [messageData, error, isError, isSuccess]);

  return (
    <div>
      <Modal size={size} open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Account List</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table height={400} data={data}>
            {/* SL Column */}
            <Column width={50} align="center" fixed>
              <HeaderCell>SL</HeaderCell>
              <Cell>
                {(rowData, rowIndex: any) => <span>{rowIndex + 1}</span>}
              </Cell>
            </Column>

            {/* Account Name Column */}
            <Column flexGrow={1} align="left" fixed>
              <HeaderCell>Account Name</HeaderCell>
              <Cell dataKey="accountName" />
            </Column>

            {/* Delete Icon with Hover */}
            <Column width={100} align="center">
              <HeaderCell>Action</HeaderCell>
              <Cell>
                {(rowData) => (
                  <Whisper
                    placement="top"
                    trigger="hover"
                    speaker={<Tooltip>Delete</Tooltip>}
                  >
                    <TrashIcon
                      style={{ cursor: "pointer", color: "red" }}
                      onClick={() => handleDeleteAccount(rowData.accountId)}
                    />
                  </Whisper>
                )}
              </Cell>
            </Column>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AccountModal;
