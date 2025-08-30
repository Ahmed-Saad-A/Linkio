import React, { useContext, useState } from "react";
import userPhoto from "/src/assets/user-circles.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { addToast, useDisclosure, Button, Spinner } from "@heroui/react";
import { AuthContext } from "../../Context/AuthContextProvider";
import {
  deleteCommentApi,
  updateCommentApi,
} from "../../Services/CommentsServices";
import CardDroupdown from "../CardDroupdown";
import ModelComponent from "../ModelComponent";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import {
  PhotoIcon,
  FaceSmileIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

dayjs.extend(relativeTime);

const PostComment = ({ comment, getAllPosts }) => {
  const { userData } = useContext(AuthContext);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isDeleting, setIsDeleting] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(comment.content);
  const [isLoading, setIsLoading] = useState(false);

  async function handleDeleteComment() {
    try {
      setIsDeleting(true);
      const response = await deleteCommentApi(comment._id);

      if (response.message === "success") {
        addToast({
          title: "Success",
          description: "Comment deleted successfully",
          color: "success",
          variant: "flat",
        });
        onClose();
        await getAllPosts();
      } else {
        throw new Error(response.error?.message || "Failed to delete comment");
      }
    } catch (error) {
      addToast({
        title: "Error",
        description: error.message,
        color: "danger",
        variant: "flat",
      });
    } finally {
      setIsDeleting(false);
    }
  }

  async function handleUpdateComment() {
    if (!editedContent.trim()) return;

    setIsLoading(true);
    try {
      const response = await updateCommentApi(comment._id, editedContent);

      if (response.message === "success") {
        await getAllPosts();
        setIsEditing(false);
        addToast({
          title: "Success",
          description: "Comment updated successfully",
          color: "success",
          variant: "flat",
        });
      } else {
        throw new Error(response.error?.message || "Failed to update comment");
      }
    } catch (error) {
      addToast({
        title: "Error",
        description: error.message,
        color: "danger",
        variant: "flat",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex w-fit items-start space-x-2 pb-5 group">

      <div className="flex-shrink-0 cursor-pointer">
        <img
          className="w-10 h-10 rounded-full object-cover"
          onError={(e) => (e.target.src = userPhoto)}
          // src={comment.commentCreator.photo}
          src={userData?.photo || userPhoto}
          alt="user"
        />
      </div>

      {/* محتوى التعليق */}
      <div className="flex flex-col">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-xl px-3 py-2 max-w-lg">
          {/* اسم المستخدم */}
          <div className="font-medium text-sm">
            <a href="#" className="hover:underline">
              {comment.commentCreator.name}
            </a>
          </div>

          {/* نص التعليق أو خانة التعديل */}
          <div className="text-xs mt-1">
            {isEditing ? (
              <div className="flex items-center space-x-2 flex-wrap">
                <input
                  type="text"
                  className="rounded px-2 py-1 text-sm border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                />

                {/* أيقونات */}
                <div className="flex space-x-2">
                  <button className="hover:text-gray-700 dark:hover:text-gray-300 transition">
                    <PhotoIcon className="w-5 h-5" />
                  </button>
                  <button className="hover:text-gray-700 dark:hover:text-gray-300 transition">
                    GIF
                  </button>
                  <button className="hover:text-gray-700 dark:hover:text-gray-300 transition">
                    <FaceSmileIcon className="w-5 h-5" />
                  </button>
                  <button className="hover:text-gray-700 dark:hover:text-gray-300 transition">
                    <SparklesIcon className="w-5 h-5" />
                  </button>
                </div>

                <Button
                  isIconOnly
                  variant="light"
                  onPress={handleUpdateComment}
                  isDisabled={!editedContent.trim() || isLoading}
                >
                  {isLoading ? (
                    <Spinner size="sm" color="primary" />
                  ) : (
                    <PaperAirplaneIcon className="w-5 h-5 text-blue-500" />
                  )}
                </Button>
                <Button
                  variant="light"
                  onPress={() => {
                    setIsEditing(false);
                    setEditedContent(comment.content);
                  }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <span>{comment.content}</span>
            )}
          </div>
        </div>

        {/* روابط Like - Reply - Time */}
        <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 space-x-1 mt-1 px-2">
          <a href="#" className="hover:underline">
            Like
          </a>
          <span>•</span>
          <a href="#" className="hover:underline">
            Reply
          </a>
          <span>•</span>
          <span>{dayjs(comment.createdAt).fromNow()}</span>
        </div>
      </div>

      {/* زر تعديل/حذف يظهر عند Hover */}
      <div className="self-center opacity-0 group-hover:opacity-100 transition-opacity">
        {comment.commentCreator._id === userData?._id && (
          <CardDroupdown onOpen={onOpen} onEdit={() => setIsEditing(true)} />
        )}
      </div>

      {/* المودال */}
      <ModelComponent
        deleteFunction={handleDeleteComment}
        isOpen={isOpen}
        isDeleting={isDeleting}
        onOpenChange={onOpenChange}
        title="comment"
      />
    </div>
  );
};

export default PostComment;
