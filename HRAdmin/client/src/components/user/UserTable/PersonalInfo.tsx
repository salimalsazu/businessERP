import Image from "next/image";
import profile from "../../../../public/image/profile.jpg";
import LocationIcon from "@rsuite/icons/Location";

const PersonalInfoSection = (userDetails: any) => {
  console.log("userDetails", userDetails);

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
          <h1 className="text-2xl font-bold">
            {userDetails?.userDetails?.profile?.firstName}
            {userDetails?.userDetails?.profile?.lastName}
          </h1>
          <p className="text-lg font-light">
            {userDetails?.userDetails?.profile?.jobTitle}
          </p>
          <div className="flex gap-1 items-center">
            <span className="text-lg font-light text-yellow-600">
              <LocationIcon />
            </span>
            <span className="text-lg font-light text-yellow-600">
              {userDetails?.userDetails?.profile?.address}
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
            <span>{userDetails?.userDetails?.profile?.nationalId}</span>
          </div>
          <div className="flex text-2xl font-light gap-1">
            <span className="font-semibold">Birth Certificate:</span>
            <span>{userDetails?.userDetails?.profile?.birthCertificateNo}</span>
          </div>
          <div className="flex text-2xl font-light gap-1">
            <span className="font-semibold">Driving license :</span>
            <span>
              {userDetails.length > 0
                ? userDetails?.userDetails?.profile?.dlNo
                : "Not Found"}
            </span>
          </div>
        </div>
      </div>
      <div className="my-5">
        <p className="bg-rose-100 text-yellow-600 font-bold  text-lg py-4  rounded-sm pl-5">
          Address
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <div className="flex text-2xl font-light gap-1">
            <span>{userDetails?.userDetails?.profile?.address}</span>
          </div>
        </div>
      </div>
      <div className="my-5">
        <p className="bg-rose-100 text-yellow-600 font-bold  text-lg py-4  rounded-sm pl-5">
          Email & Phone
        </p>
        <div className="mt-5 flex flex-col gap-2">
          <div className="flex text-2xl font-light gap-1">
            <span className="font-semibold">Email:</span>
            <span>{userDetails?.userDetails?.email}</span>
          </div>
          <div className="flex text-2xl font-light gap-1">
            <span className="font-semibold">Phone:</span>
            <span>{userDetails?.userDetails?.profile?.mobileNo}</span>
          </div>
          <div className="flex text-2xl font-light gap-1">
            <span className="font-semibold">Phone:</span>
            <span>
              {userDetails?.userDetails?.profile?.mobileBillingLimit}.00
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoSection;
