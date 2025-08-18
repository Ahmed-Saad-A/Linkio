import { addToast } from "@heroui/react";
import React, { useRef, useState, useEffect, useContext } from "react";
import {
  CameraIcon,
  Cog6ToothIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Input, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, } from "@heroui/react";
import userPhoto from "/src/assets/user-circles.png";
import profile from "/src/assets/profile.png";
import { changePassword, uploadUserPhoto } from "../../Services/UserServices";
import { authContext } from "../../Context/AuthContext";


const ProfileHeader = () => {
  const { userData } = useContext(authContext);
  const [avatar, setAvatar] = useState(userPhoto);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const fileInputRef = useRef();

  useEffect(() => {
    if (userData?.photo) {
      setAvatar(userData.photo);
    }
  }, [userData]);

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

const handleFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    setSelectedFile(URL.createObjectURL(file));
    setIsPhotoModalOpen(true);
  }
};

  const handleUploadPhoto = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("photo", selectedFile);

      const response = await uploadUserPhoto(formData);

      if (response?.photoUrl) {
        setAvatar(response.photoUrl);
        addToast({
          title: "Success",
          description: "Profile photo updated successfully",
          color: "success",
        });
      } else {
        throw new Error("Upload failed");
      }

      setSelectedFile(null);
      setIsPhotoModalOpen(false);
    } catch (error) {
      addToast({
        title: "Error",
        description: error.message || "Failed to upload photo",
        color: "danger",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setIsPhotoModalOpen(false);
  };

  const handleChangePassword = async () => {
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
        description: error || "Something went wrong",
        color: "danger",
      });
    } finally {
      setIsUploading(false);
    }
  };

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

      {/* Profile Photo + settings */}
      <div className="relative flex flex-col md:flex-row items-center md:items-end justify-between px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center">
          <div className="relative -mt-16 md:-mt-20">
            <img
              src={avatar}
              alt="Profile"
              className="w-28 h-28 md:w-40 md:h-40 rounded-full border-4 border-white object-cover"
            />
            <button
              onClick={handleCameraClick}
              className="absolute bottom-2 right-2 bg-gray-800 p-2 rounded-full border border-white hover:bg-gray-700"
            >
              <CameraIcon className="w-5 h-5 text-white" />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div className="mt-3 md:mt-0 md:ml-6 text-center md:text-left">
            <h2 className="text-xl md:text-2xl font-bold">Ahmed Saad</h2>
          </div>
        </div>

        {/* Settings Dropdown */}
        <div className="mt-4 md:mt-0">
          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="light"
                className="flex items-center gap-2 border px-3 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-pink-500"
              >
                <Cog6ToothIcon className="w-5 h-5 text-gray-700 dark:text-white" />
                <span className="font-medium text-gray-700 dark:text-white">Settings</span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions">
              <DropdownItem
                key="password"
                onPress={() => setIsPasswordModalOpen(true)}
              >
                Change Password
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>
    </div>

    {/* Photo Modal */}
    <Modal
      isOpen={isPhotoModalOpen}
      onOpenChange={setIsPhotoModalOpen}
      placement="center"
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="text-lg font-bold">
              Confirm New Photo
            </ModalHeader>
            <ModalBody className="flex flex-col items-center">
              {selectedFile && (
                <div className="relative">
                  <img
                    src={selectedFile}
                    alt="Preview"
                    className="rounded-lg max-h-72"
                  />
                  <button
                    onClick={handleRemoveImage}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <XMarkIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={handleRemoveImage}>
                Cancel
              </Button>
              <Button
                color="success"
                onPress={handleUploadPhoto}
                isLoading={isUploading}
              >
                Save Photo
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>

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
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <Input
                label="New Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
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
}
export default ProfileHeader;
