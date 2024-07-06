import Image from "next/image";
import profile from "../../../../public/image/profile.jpg";
import LocationIcon from "@rsuite/icons/Location";

const PersonalInfoSection = () => {
  return (
    <div>
      <div className="flex items-start gap-5">
        <div>
          <Image
            src={profile}
            width={200}
            height={200}
            alt="Profile Image"
            className="rounded-sm"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold">Salim Al Sazu</h1>
          <p className="text-lg font-light">Accounts Manager</p>
          <div className="flex gap-1 items-center">
            <span className="text-lg font-light text-yellow-600">
              <LocationIcon />
            </span>
            <span className="text-lg font-light text-yellow-600">
              Dhaka, Bangladesh
            </span>
          </div>
        </div>
      </div>
      <div className="my-5">
        <p className="bg-rose-100 text-yellow-600 font-bold  text-lg py-4  rounded-sm pl-5">
          Identity Information
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <div className="flex text-2xl font-light gap-1">
            <span className="font-semibold">NID:</span>
            <span>1234567891011</span>
          </div>
          <div className="flex text-2xl font-light gap-1">
            <span className="font-semibold">Birth Certificate:</span>
            <span>9192842953684</span>
          </div>
          <div className="flex text-2xl font-light gap-1">
            <span className="font-semibold">Driving license :</span>
            <span>XYZ45621587</span>
          </div>
        </div>
      </div>
      <div className="my-5">
        <p className="bg-rose-100 text-yellow-600 font-bold  text-lg py-4  rounded-sm pl-5">
          Address
        </p>
        <div className="mt-5 flex flex-col gap-2"></div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
