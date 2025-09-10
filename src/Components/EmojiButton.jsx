import React, { useState, useRef, useEffect } from "react";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import EmojiPicker from "emoji-picker-react";

const EmojiButton = ({ onEmojiSelect }) => {
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef(null);

  const togglePicker = () => setShowPicker((prev) => !prev);

  const handleEmojiClick = (emojiData) => {
    if (onEmojiSelect) {
      onEmojiSelect(emojiData.emoji);
    }
  };

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
  );
};

export default EmojiButton;
