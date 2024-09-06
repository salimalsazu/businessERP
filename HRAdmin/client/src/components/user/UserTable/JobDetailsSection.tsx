import moment from "moment";

const JobDetailsSection = (userDetails: any) => {
  return (
    <div>
      <div className="my-5">
        <p className="bg-rose-100 text-yellow-600 font-bold  text-lg py-4  rounded-sm pl-5">
          Bank Information:
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <div className="flex text-2xl font-light gap-1">
            <span className="font-semibold text-lg">A/C Name:</span>
            <span>
              {userDetails?.userDetails?.profile?.firstName}{" "}
              {userDetails?.userDetails?.profile?.lastName}
            </span>
          </div>
          <div className="flex text-2xl font-light gap-1">
            <span className="font-semibold text-lg">A/C No:</span>
            <span>{userDetails?.userDetails?.profile?.bankAccountNo}</span>
          </div>
        </div>
      </div>
      <div className="my-5">
        <p className="bg-rose-100 text-yellow-600 font-bold  text-lg py-4  rounded-sm pl-5">
          Details:
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <div className="flex text-2xl font-light gap-1">
            <span className="font-semibold text-lg">Job Id:</span>
            <span>{userDetails?.userDetails?.profile?.jobId}</span>
          </div>
          <div className="flex text-2xl font-light gap-1">
            <span className="font-semibold text-lg">Joining Date:</span>
            <span>
              {moment(userDetails?.userDetails?.profile?.joiningDate).format(
                "DD-MM-YYYY"
              )}
            </span>
          </div>
          <div className="flex text-2xl font-light gap-1">
            <span className="font-semibold text-lg">Salary:</span>
            <span>
              {Number(
                userDetails?.userDetails?.profile?.totalSalary
              ).toLocaleString()}
              .00
            </span>
          </div>
          <div className="flex text-2xl font-light gap-1">
            <span className="font-semibold text-lg">TDS:</span>
            <span>
              {Number(
                userDetails?.userDetails?.profile?.tdsOnSalary
              ).toLocaleString()}
              .00
            </span>
          </div>
          <div className="flex text-2xl font-light gap-1">
            <span className="font-semibold text-lg">Experience:</span>
            <span>{userDetails?.userDetails?.profile?.experience} years</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSection;
