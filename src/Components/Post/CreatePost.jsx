import React, { useRef, useState, useEffect, useContext } from "react";
import { Button, Spinner } from "@heroui/react";
import { PaperAirplaneIcon, FaceSmileIcon } from "@heroicons/react/24/outline";
import { addPostApi } from "../../Services/PostsServices";
import userPhoto from "/src/assets/user-circles.png";
import EmojiPicker from "emoji-picker-react";
import { AuthContext } from "../../Context/AuthContextProvider";

const CreatePost = ({ getAllPosts }) => {
  const [caption, setCaption] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const { userData } = useContext(AuthContext);

  const fileInputRef = useRef(null);
  const pickerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const togglePicker = () => setShowPicker((prev) => !prev);

  const handleEmojiClick = (emojiData) => {
    setCaption((prev) => prev + (emojiData?.emoji || ""));
  };

  async function handleCreatePostSubmit(e) {
    e.preventDefault();
    if (!caption.trim() && !imageFile) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      if (caption.trim()) formData.append("body", caption.trim());
      if (imageFile) formData.append("image", imageFile);

      await addPostApi(formData);
      setCaption("");
      handleRemoverImage();
      await getAllPosts();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }

  function handleFileInputChange(e) {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  function handleRemoverImage() {
    setImageFile(null);
    setImagePreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  return (
    <div className="w-full flex flex-col">
      <div className="w-full mx-auto">
        <form
          onSubmit={handleCreatePostSubmit}
          className="bg-white dark:bg-gray-900 w-full rounded-md shadow-md transition-colors duration-300"
        >
          {/* Input Row */}
          <div className="w-full h-16 flex items-center px-3 gap-2 overflow-hidden">
            <img
              className="rounded-full w-10 h-10 object-cover border border-gray-300 dark:border-gray-600 shrink-0"
              src={userData?.photo || userPhoto}
              alt="User photo"
            />

            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              type="text"
              className="flex-1 min-w-0 rounded-full h-10 bg-gray-200 dark:bg-gray-700 dark:text-gray-200 px-4 outline-none"
              placeholder="What's on your mind?"
            />

            {/* Emoji Button */}
            <div className="relative shrink-0" ref={pickerRef}>
              <button
                type="button"
                onClick={togglePicker}
                className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                title="Emoji"
              >
                <FaceSmileIcon className="w-6 h-6 text-gray-500 dark:text-gray-300" />
              </button>

              {showPicker && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
                  onClick={() => setShowPicker(false)}
                >
                  <div 
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-72 sm:w-96 max-h-[80vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <EmojiPicker onEmojiClick={handleEmojiClick} />
                  </div>
                </div>
              )}
            </div>

            {/* Send Button */}
            <Button
              isIconOnly
              variant="light"
              type="submit"
              className="shrink-0"
              isDisabled={(!caption.trim() && !imageFile) || isLoading}
            >
              {isLoading ? (
                <Spinner size="sm" color="primary" />
              ) : (
                <PaperAirplaneIcon className="w-5 h-5 text-blue-500" />
              )}
            </Button>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="w-full flex justify-center px-5 py-2 relative">
              <img
                src={imagePreview}
                alt="Preview"
                className="max-h-64 rounded-lg object-cover shadow"
              />
              <button
                type="button"
                onClick={handleRemoverImage}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition"
              >
                ✕
              </button>
            </div>
          )}

          {/* Options Row */}
          <div className="w-full h-16 flex justify-between px-3 md:px-10 lg:px-24 xl:px-5 border-t border-gray-200 dark:border-gray-700">
            {/* Live Option */}
            <div className="flex h-full items-center">
              <svg
                className="h-12 fill-current text-red-500 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                width={27}
                height={27}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#b0b0b0"
                strokeWidth={2}
                strokeLinecap="square"
                strokeLinejoin="round"
              >
                <path d="M15.6 11.6L22 7v10l-6.4-4.5v-1zM4 5h9a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7c0-1.1.9-2 2-2z" />
              </svg>
              <button className="text-xs lg:text-md mx-2 font-semibold text-gray-500 dark:text-gray-300">
                Live
              </button>
            </div>

            {/* Photo/Video Option */}
            <div className="flex h-full items-center">
              <input
                type="file"
                ref={fileInputRef}
                id="photoUpload"
                accept="image/*"
                className="hidden"
                onChange={handleFileInputChange}
              />
              <label
                htmlFor="photoUpload"
                className="flex items-center cursor-pointer"
              >
                <svg
                  className="h-12 text-green-500 stroke-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width={27}
                  height={27}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#b0b0b0"
                  strokeWidth={2}
                  strokeLinecap="square"
                  strokeLinejoin="round"
                >
                  <rect x={3} y={3} width={18} height={18} rx={2} />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M20.4 14.5L16 10 4 20" />
                </svg>
                <span className="text-xs lg:text-md mx-2 font-semibold text-gray-500 dark:text-gray-300">
                  Photo/Video
                </span>
              </label>
            </div>

            {/* Feeling/Activity Option */}
            <div className="hidden xl:flex h-full items-center">
              <svg
                className="h-12 text-yellow-500 stroke-current"
                xmlns="http://www.w3.org/2000/svg"
                width={27}
                height={27}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#b0b0b0"
                strokeWidth={2}
                strokeLinecap="square"
                strokeLinejoin="round"
              >
                <path d="M5.52 19c.64-2.2 1.84-3 3.22-3h6.52c1.38 0 2.58.8 3.22 3" />
                <circle cx={12} cy={10} r={3} />
                <circle cx={12} cy={12} r={10} />
              </svg>
              <button className="text-xs lg:text-md mx-2 font-semibold text-gray-500 dark:text-gray-300">
                Feeling/Activity
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
