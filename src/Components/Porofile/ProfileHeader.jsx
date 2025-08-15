import React, { useRef, useState } from "react";
import { CameraIcon } from "@heroicons/react/24/solid";
import userPhoto from "/src/assets/user-circles.png";
import profile from "/src/assets/profile.png";
import { uploadUserPhoto } from "../../Services/UserServices";

const ProfileHeader = () => {
  const [avatar, setAvatar] = useState(userPhoto);
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    const localUrl = URL.createObjectURL(file);
    setAvatar(localUrl);
  };

  const handleUploadPhoto = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
      const response = await uploadUserPhoto(formData);
      console.log("Upload response:", response);

      if (response.data && response.data.url) {
        setAvatar(response.data.url);
      }
      setSelectedFile(null);
    } catch (error) {
      console.error("Error uploading photo:", error);
      alert("Failed to upload photo");
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setAvatar(userPhoto);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="relative w-full">
      {/* Background */}
      <div className="w-full h-48 bg-gray-300 relative">
        <img
          src={profile}
          alt="profile background"
          className="w-full h-full object-cover"
        />
        <div className="absolute right-5  transform -translate-x-1/2 -bottom-12">
          <div className="relative">
            <img
              src={avatar}
              alt="Profile"
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
            <button
              onClick={handleCameraClick}
              className="absolute bottom-0 left-0 bg-gray-800 p-2 rounded-full border border-white hover:bg-gray-700"
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
        </div>
        <h2 className="text-xl font-semibold left-2/3">{"Username"}</h2>
      </div>

      <div className="mt-16 text-center">
        {/* أزرار حفظ أو إلغاء الصورة الجديدة */}
        {selectedFile && (
          <div className="mt-2 flex justify-center gap-2">
            <button
              onClick={handleUploadPhoto}
              className="px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Photo
            </button>
            <button
              onClick={handleRemoveImage}
              className="px-4 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Cancel
            </button>
          </div>
        )}
        <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
          Change Password
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
