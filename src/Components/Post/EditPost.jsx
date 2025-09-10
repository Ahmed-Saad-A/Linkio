import React, { useState, useEffect } from "react";
import { addToast, Button } from "@heroui/react";
import EmojiButton from "../EmojiButton";

const EditPost = ({ post, onSave, onCancel }) => {
  const [editedCaption, setEditedCaption] = useState(post.body);
  const [editedImage, setEditedImage] = useState(post.image);
  const [imageFile, setImageFile] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setEditedCaption(post.body);
    setEditedImage(post.image);
    setImageFile(null);
  }, [post]);

function handleImageChange(e) {
  const file = e.target.files?.[0];
  if (!file) return;

  if (file.size >= 2 * 1024 * 1024) {
    addToast({
      title: "Error",
      description: "File size exceeds 2MB limit",
      color: "danger",
    });
    return;
  }

  setImageFile(file);
  setEditedImage(URL.createObjectURL(file));
}


  async function handleSaveClick() {
    setIsSaving(true);
    try {
      await onSave({ body: editedCaption, imageFile });
    } finally {
      setIsSaving(false);
    }
  }

  const handleEmojiSelect = (emoji) => {
    setEditedCaption((prev) => prev + emoji);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onCancel}
      ></div>

      <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-lg w-full max-w-md p-5 z-10 animate-fadeIn">
        <h2 className="text-lg font-semibold mb-4 dark:text-gray-100">
          Edit Post
        </h2>

        <div className="flex items-center gap-2 mb-3">
          <input
            type="text"
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-gray-200"
            value={editedCaption}
            onChange={(e) => setEditedCaption(e.target.value)}
            placeholder="Edit your caption..."
          />
          <EmojiButton onEmojiSelect={handleEmojiSelect} />
        </div>

        {editedImage && (
          <div className="mb-3">
            <img
              src={editedImage}
              alt="preview"
              className="w-full max-h-64 object-cover rounded shadow"
            />
          </div>
        )}

        <input
          type="file"
          onChange={handleImageChange}
          className="mb-4 block text-sm text-gray-500 dark:text-gray-300"
        />

        <div className="flex justify-end gap-3">
          <Button
            color="default"
            variant="light"
            onPress={onCancel}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onPress={handleSaveClick}
            isLoading={isSaving}
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
