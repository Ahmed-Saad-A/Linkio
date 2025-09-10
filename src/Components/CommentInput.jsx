import React, { useState, useContext } from "react";
import userPhoto from "/src/assets/user-circles.png";
import { addComment } from "../Services/CommentsServices";
import {
  PhotoIcon,
  SparklesIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { Button, Spinner } from "@heroui/react";
import { AuthContext } from "../Context/AuthContextProvider";
import EmojiButton from "./EmojiButton";

const CommentInput = ({ postId, isActive, setActiveCommentFor, callback }) => {
  const [commentContent, setComment] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useContext(AuthContext);

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

  const handleEmoji = (emoji) => {
    setComment((prev) => prev + emoji);
  };

  return (
    <div className="w-full flex items-center gap-2 pb-5 relative">
      <img
        className="w-10 h-10 rounded-full object-cover"
        onError={(e) => (e.target.src = userPhoto)}
        src={userData?.photo || userPhoto}
        alt="user photo"
      />

      <div className="bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded-xl flex flex-col gap-2 flex-1 transition-colors md:flex-row">
        <input
          type="text"
          value={commentContent}
          onChange={(e) => setComment(e.target.value)}
          placeholder={isActive ? "Comment as ..." : "Write a comment..."}
          className="w-full outline-none text-sm bg-transparent text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500"
          onFocus={() => setActiveCommentFor(postId)}
        />

        {isActive && (
          <div className="flex items-center gap-3 text-gray-500 dark:text-gray-400 md:ml-auto">
            <button className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              <PhotoIcon className="w-5 h-5" />
            </button>

            <button className="hover:text-gray-700 dark:hover:text-gray-200 transition-colors">
              GIF
            </button>

            {/* 👇 استخدم الكمبوننت بتاع الإيموجي */}
            <EmojiButton onEmojiSelect={handleEmoji} />

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
