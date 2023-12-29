import Image from "next/image";
import { Button } from "rsuite";

const MyDetailsPage = () => {
  return (
    <div className=" rounded-2xl shadow-lg  bg-white m-5 ">
      <div className="h-[120px] rounded-t-2xl bg-sidebar w-full"></div>
      <div className="flex justify-between p-5 ">
        <div className="flex  gap-10">
          <div className="-mt-20 ">
            <Image
              width={200}
              height={200}
              src=""
              className="w-[200px]  h-[200px] object-cover object-center  rounded-full border shadow-xl"
              alt=""
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold">Salim Al Sazu</h2>
            <p className="font-medium font-mono text-[#9f9fa3]">
              salim@gmail.com
            </p>
          </div>
        </div>

        <div className="flex gap-3 ">
          <div>
            <Button
              className="flex items-center gap-2 hover:text-white/80 px-4 py-2 rounded-[4px] !text-white !bg-primary !hover:bg-secondary"
              type="button"
              //   onClick={handleOpen}
            >
              <span></span>
              <span className="text-sm font-semibold">Edit Profile</span>
            </Button>
          </div>
        </div>
          </div>
          
          
    </div>
  );
};

export default MyDetailsPage;
