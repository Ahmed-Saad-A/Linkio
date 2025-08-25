import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContextProvider";
import dayjs from "dayjs";

const ProfileSettings = () => {
  const { userData } = useContext(AuthContext);
  const user = userData?.user;

  // calculate age
  // const dob = dayjs(user?.dateOfBirth);
  const dob = user?.dateOfBirth ? dayjs(user.dateOfBirth) : null;


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#101828] text-gray-900 dark:text-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white dark:bg-[#020405] rounded-2xl shadow-lg p-8 space-y-8">
        {/* Header */}
        <div className="border-b border-gray-300 dark:border-pink-600 pb-4 mb-6 flex items-center gap-4">
          <img
            src={userData?.photo}
            alt={userData?.name}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-300 dark:border-gray-500"
          />
          <div>
            <h1 className="text-2xl font-bold">{userData?.name}</h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Profile Information
            </p>
          </div>
        </div>

        {/* Grid Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={userData?.name}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-[#0b253a] text-gray-900 dark:text-gray-100 border dark:border-pink-600"
              readOnly
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue={userData?.email}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-[#0b253a] text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-pink-600"
              readOnly
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Gender */}
            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-2">
                Gender
              </label>
              <input
                type="text"
                defaultValue={userData?.gender}
                className="w-full px-4 py-2 rounded-lg bg-gray-200 dark:bg-[#0b253a] text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-pink-600"
                readOnly
              />
            </div>

            {/* Age */}
            <div>
              <label className="block text-gray-600 dark:text-gray-300 mb-2">
                Age
              </label>
              <input
                type="text"
                defaultValue={dob.$D}
                className="w-full px-4 py-2 rounded-lg bg-gray-200 dark:bg-[#0b253a] text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-pink-600"
                readOnly
              />
            </div>
          </div>
        </div>

        {/* Date of Birth */}
            <p className="mb-2">Birth Day</p>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className=" text-gray-600 dark:text-gray-300 mb-2">
              Year
            </label>
            <input
              type="text"
              defaultValue={dob? dob.year() : ''}
              className="w-full px-4 py-2 rounded-lg bg-gray-200 dark:bg-[#0b253a] text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-pink-600"
              readOnly
            />
          </div>
          <div>
            <label className=" text-gray-600 dark:text-gray-300 mb-2">
              Month
            </label>
            <input
              type="text"
              defaultValue={dob? dob.month() + 1 : ''} 
              className="w-full px-4 py-2 rounded-lg bg-gray-200 dark:bg-[#0b253a] text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-pink-600"
              readOnly
            />
          </div>
          <div>
            <label className=" text-gray-600 dark:text-gray-300 mb-2">
              Day
            </label>
            <input
              type="text"
              defaultValue={dob? dob.date() : ''}
              className="w-full px-4 py-2 rounded-lg bg-gray-200 dark:bg-[#0b253a] text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-pink-600"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
