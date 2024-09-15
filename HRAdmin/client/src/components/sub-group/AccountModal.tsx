import { Modal, Table, Whisper, Tooltip } from "rsuite";
import TrashIcon from "@rsuite/icons/Trash";
import { useDeleteAccountMutation } from "@/redux/api/features/accountApi";
import { toast } from "sonner";
import { useEffect, useCallback } from "react";

const { Column, HeaderCell, Cell } = Table;

const AccountModal = ({ size, open, handleClose, data }: any) => {
  const [
    deleteAccount,
    { data: messageData, error, isLoading, isSuccess, isError },
  ] = useDeleteAccountMutation();

  // Ensure handleClose is stable by wrapping it in useCallback
  const closeModal = useCallback(() => {
    handleClose();
  }, [handleClose]);

  const handleDeleteAccount = async (accountId: string) => {
    await deleteAccount(accountId);
  };

  // UseEffect with proper dependencies
  useEffect(() => {
    if (isSuccess && !isError) {
      toast.success(messageData?.message);
      closeModal(); // Use the memoized closeModal function
    } else if (isError && !isSuccess) {
      toast.error("Failed to delete account");
    }
  }, [isSuccess, isError, messageData, closeModal]); // Ensure all necessary dependencies are included

  return (
    <div>
      <Modal size={size} open={open} onClose={closeModal}>
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
                {(rowData, rowIndex) => (
                  <Whisper
                    placement="top"
                    trigger="hover"
                    speaker={<Tooltip>Delete</Tooltip>}
                  >
                    {isLoading &&
                    rowData.accountId === messageData?.accountId ? (
                      <span>Deleting...</span>
                    ) : (
                      <TrashIcon
                        key={rowIndex} // Added key for uniqueness
                        style={{ cursor: "pointer", color: "red" }}
                        onClick={() => handleDeleteAccount(rowData.accountId)}
                      />
                    )}
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
