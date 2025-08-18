import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
} from "@heroui/react";

const PostBody = ({ caption, image }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (img) => {
    setSelectedImage(img);
    onOpen();
  };

  return (
    <div>
      <p>{caption}</p>

      {image && (
        <img
          src={image}
          className="w-full h-100 object-cover mt-5 cursor-pointer rounded-lg"
          alt=""
          onClick={() => handleImageClick(image)}
        />
      )}

      <Modal isOpen={isOpen} onClose={onClose} size="4xl" placement="center">
        <ModalContent>
          <ModalBody className="p-0 relative">
            <button
              onClick={onClose}
              className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <img
              src={selectedImage}
              alt="full view"
              className="w-full h-auto object-contain"
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default PostBody;
