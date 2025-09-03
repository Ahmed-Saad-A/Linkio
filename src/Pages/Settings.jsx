import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContextProvider";
import dayjs from "dayjs";
import {
  addToast,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  Button,
} from "@heroui/react";
import { changePassword } from "../Services/UserServices";
import { EyeSlashIcon } from "@heroicons/react/24/solid";
import { EyeIcon } from "lucide-react";
import ProfilePhotoUploader from "../Components/Profile/ProfilePhotoUploader";

const ProfileSettings = () => {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { userData } = useContext(AuthContext);
  const user = userData;

  // const dob = user?.dateOfBirth ? dayjs(user.dateOfBirth) : null;
  const dob = user?.dateOfBirth
    ? dayjs(user.dateOfBirth, ["YYYY-MM-DD", "YYYY/MM/DD", "DD/MM/YYYY"])
    : null;
  console.log("🚀 ~ ProfileSettings ~ dob:", dob);
  console.log("🚀 ~ ProfileSettings ~ user:", user);
  console.log("🚀 ~ ProfileSettings ~ user.dateOfBirth:", user?.dateOfBirth);

  const createdAt = user?.createdAt
    ? dayjs(user.createdAt, ["YYYY-MM-DD", "YYYY/MM/DD", "DD/MM/YYYY"])
    : null;
  console.log("🚀 ~ ProfileSettings ~ createdAt:", createdAt);

  const handleChangePassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      addToast({
        title: "Error",
        description: "Please fill in all password fields",
        color: "danger",
      });
      return;
    }

    if (newPassword.length < 6) {
      addToast({
        title: "Error",
        description: "Password must be at least 6 characters",
        color: "danger",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      addToast({
        title: "Error",
        description: "New password and confirm password do not match",
        color: "danger",
      });
      return;
    }

    setIsUploading(true);
    try {
      await changePassword(currentPassword, newPassword);
      addToast({
        title: "Success",
        description: "Password updated successfully",
        color: "success",
      });
      setIsPasswordModalOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      addToast({
        title: "Error",
        description: error?.message || "Something went wrong",
        color: "danger",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#101828] text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white dark:bg-[#020405] rounded-2xl shadow-lg p-8 space-y-8">
        {/* Header */}
        <div className="border-b border-gray-300 dark:border-pink-600 pb-4 mb-6 flex items-center gap-4">
          <ProfilePhotoUploader />

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
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
              defaultValue={dob ? dayjs().diff(dob, "year") : ""}
              className="w-full px-4 py-2 rounded-lg bg-gray-200 dark:bg-[#0b253a] text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-pink-600"
              readOnly
            />
          </div>

          {/* Created At */}
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-2">
              Account Created
            </label>
            <input
              type="text"
              defaultValue={
                userData?.createdAt
                  ? dayjs(userData.createdAt).format("DD/MM/YYYY")
                  : ""
              }
              className="w-full px-4 py-2 rounded-lg bg-gray-200 dark:bg-[#0b253a] text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-pink-600"
              readOnly
            />
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
              defaultValue={dob ? dob.year() : ""}
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
              defaultValue={dob ? dob.month() + 1 : ""}
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
              defaultValue={dob ? dob.date() : ""}
              className="w-full px-4 py-2 rounded-lg bg-gray-200 dark:bg-[#0b253a] text-gray-900 dark:text-gray-100 border border-gray-300 dark:border-pink-600"
              readOnly
            />
          </div>
        </div>

        {/* Button to open modal */}
        <div className="flex justify-end">
          <Button color="primary" onPress={() => setIsPasswordModalOpen(true)}>
            Change Password
          </Button>
        </div>
      </div>

      {/* Password Modal */}
      <Modal
        isOpen={isPasswordModalOpen}
        onOpenChange={setIsPasswordModalOpen}
        placement="center"
      >
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="text-lg font-bold">
                Change Password
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  label="Current Password"
                  type={showCurrent ? "text" : "password"}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  endContent={
                    <button
                      type="button"
                      onClick={() => setShowCurrent((prev) => !prev)}
                      className="absolute inset-y-0 right-2 top-5 flex items-center text-green-500 focus:outline-none"
                    >
                      {showCurrent ? (
                        <EyeSlashIcon className="h-5 w-5" />
                      ) : (
                        <EyeIcon className="h-5 w-5" />
                      )}
                    </button>
                  }
                />

                <Input
                  isRequired
                  label="New Password"
                  type={showNew ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  endContent={
                    <button
                      type="button"
                      onClick={() => setShowNew((prev) => !prev)}
                      className="focus:outline-none"
                    >
                      {showNew ? (
                        <EyeSlashIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-green-500" />
                      )}
                    </button>
                  }
                />

                <Input
                  isRequired
                  label="Confirm New Password"
                  type={showConfirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  endContent={
                    <button
                      type="button"
                      onClick={() => setShowConfirm((prev) => !prev)}
                      className="focus:outline-none"
                    >
                      {showConfirm ? (
                        <EyeSlashIcon className="h-5 w-5 text-green-500" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-green-500" />
                      )}
                    </button>
                  }
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  variant="light"
                  onPress={() => setIsPasswordModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  color="primary"
                  onPress={handleChangePassword}
                  isLoading={isUploading}
                >
                  Save
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileSettings;
