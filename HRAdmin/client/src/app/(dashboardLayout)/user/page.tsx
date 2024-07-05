import AddUserForm from "@/components/user/AddForm/AddForm";
import UserTable from "@/components/user/UserTable/UserTable";

const UserPage = () => {
  return (
    <div>
      <div className="bg-gray-100  rounded-sm m-5 p-5">
        <AddUserForm />
      </div>

      <div className="bg-gray-100  rounded-sm m-5 p-5">
        <UserTable />
      </div>
    </div>
  );
};

export default UserPage;
