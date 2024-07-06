const JobDetailsSection = () => {
  return (
    <div>
      <div className="my-5">
        <p className="bg-rose-100 text-yellow-600 font-bold  text-lg py-4  rounded-sm pl-5">
          Bank Information:
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <div className="flex text-2xl font-light gap-1">
            <span className="font-semibold text-lg">A/C Name:</span>
            <span>Salim Al Sazu</span>
          </div>
          <div className="flex text-2xl font-light gap-1">
            <span className="font-semibold text-lg">A/C No:</span>
            <span>4008-12100002222</span>
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
            <span>0010</span>
          </div>
          <div className="flex text-2xl font-light gap-1">
            <span className="font-semibold text-lg">Joining Date:</span>
            <span>Jan 01, 2024</span>
          </div>
          <div className="flex text-2xl font-light gap-1">
            <span className="font-semibold text-lg">Salary:</span>
            <span>20,000.00</span>
          </div>
          <div className="flex text-2xl font-light gap-1">
            <span className="font-semibold text-lg">Experience:</span>
            <span>5 Years</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsSection;
