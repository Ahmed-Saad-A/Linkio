import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContextProvider";
import profile from "/src/assets/Profile.png";
import ProfilePhotoUploader from "./ProfilePhotoUploader";

const ProfileHeader = () => {
  const { userData } = useContext(AuthContext);

  return (
    <div className="relative w-full mb-10">
      <div className="w-full">
        <div className="relative w-full h-48 md:h-60 bg-gray-300">
          <img
            src={profile}
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Photo + Name */}
        <div className="relative flex flex-col md:flex-row items-center md:items-end justify-between px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="relative -mt-16 md:-mt-20">
              <ProfilePhotoUploader />
            </div>
            <div className="mt-3 md:mt-0 md:ml-6 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold">
                {userData?.name || "Loading..."}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
