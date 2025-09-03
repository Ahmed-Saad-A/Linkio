import React, { useRef, useState, useEffect, useContext } from "react";
import { addToast } from "@heroui/react";
import { CameraIcon, XMarkIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import userPhoto from "/src/assets/user-circles.png";
import { AuthContext } from "../../Context/AuthContextProvider";
import { uploadUserPhoto } from "../../Services/UserServices";

const ProfilePhotoUploader = () => {
  const { userData } = useContext(AuthContext);
  const [avatar, setAvatar] = useState(userPhoto);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);

  const fileInputRef = useRef();

  useEffect(() => {
    if (userData?.photo) {
      setAvatar(userData.photo || userPhoto);
    }
  }, [userData]);

  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size >= 2 * 1024 * 1024) {
      addToast({
        title: "Error",
        description: "File size exceeds 2MB limit",
        color: "danger",
      });
      return;
    }

    setSelectedFile(file);
    setIsPhotoModalOpen(true);
  };

  const handleUploadPhoto = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("photo", selectedFile);

      const response = await uploadUserPhoto(formData);

      if (response === "string") {
        setAvatar(response);
      }
      else if (response?.photoUrl) {
        setAvatar(response.photoUrl);
      }
      else {
        addToast({
          title: "Success",
          description: "Profile photo uploaded successfully",
          color: "success",
        });
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

  return (
    <div className="relative">
      <div className="relative">
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
                      src={URL.createObjectURL(selectedFile)}
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
    </div>
  );
};

export default ProfilePhotoUploader;
