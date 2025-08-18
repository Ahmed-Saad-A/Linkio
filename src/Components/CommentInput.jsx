import React, { useState, useContext, useEffect, useRef } from "react";
import userPhoto from "/src/assets/user-circles.png";
import { addComment } from "../Services/CommentsServices";
import {
  PhotoIcon,
  FaceSmileIcon,
  SparklesIcon,
  PaperAirplaneIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Button, Spinner } from "@heroui/react";
import { AuthContext } from "./../Context/authContext";
import EmojiPicker from "emoji-picker-react";

const CommentInput = ({
  postId,
  isActive,
  setActiveCommentFor,
  callback,
  avatar,
}) => {
  const [commentContent, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);

  const { userData } = useContext(AuthContext);
  const pickerRef = useRef(null);

  async function handleCommentSubmit() {
    if (!commentContent.trim()) return;
    setIsLoading(true);
    try {
      await addComment(commentContent, postId);
      setComment("");
      setActiveCommentFor(null);
      callback();
    } finally {
      setIsLoading(false);
    }
  }

  const togglePicker = () => setShowPicker((prev) => !prev);

  const handleEmojiClick = (emojiData) => {
    setComment((prev) => prev + (emojiData?.emoji || ""));
  };

  // إغلاق البايكر عند الضغط خارج العنصر
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setShowPicker(false);
      }
    };
    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <div className="w-full flex items-center gap-2 pb-5 relative">
      <img
        className="w-10 h-10 rounded-full object-cover"
        onError={(e) => (e.target.src = userPhoto)}
        src={avatar || userPhoto || userData?.avatar}
        alt="user photo"
      />

      <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-xl flex flex-col gap-2 flex-1 transition-colors">
        <input
          type="text"
          value={commentContent}
          onChange={(e) => setComment(e.target.value)}
          placeholder={isActive ? "Comment as ..." : "Write a comment..."}
          className="w-full outline-none text-sm bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
          onFocus={() => {
            setActiveCommentFor(postId);
            setShowPicker(false); 
          }}
        />

        {isActive && (
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
            <button className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              <PhotoIcon className="w-5 h-5" />
            </button>
            <button className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              GIF
            </button>

            <div className="relative" ref={pickerRef}>
              <button
                type="button"
                onClick={togglePicker}
                className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                title="Emoji"
              >
                <FaceSmileIcon className="w-5 h-5" />
              </button>

              {showPicker && (
                <div className="absolute bottom-10 left-0 z-50 bg-white rounded-lg shadow-lg">
                  <div className="flex justify-end p-1">
                    <button
                      onClick={() => setShowPicker(false)}
                      className="text-gray-500 hover:text-red-500"
                    >
                    </button>
                  </div>
                  <EmojiPicker onEmojiClick={handleEmojiClick} />
                </div>
              )}
            </div>

            <button className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              <SparklesIcon className="w-5 h-5" />
            </button>

            <Button
              isIconOnly
              variant="light"
              onPress={handleCommentSubmit}
              isDisabled={!commentContent.trim() || isLoading}
              className="dark:hover:bg-gray-700"
            >
              {isLoading ? (
                <Spinner size="sm" color="primary" />
              ) : (
                <PaperAirplaneIcon className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentInput;
