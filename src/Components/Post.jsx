import React, { useState, useRef, useEffect, useContext } from "react";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import CardHeader from "./Post/CardHeader";
import PostBody from "./Post/PostBody";
import PostComment from "./Post/PostComment";
import PostFooter from "./Post/PostFooter";
import PostAction from "./Post/PostAction";
import CommentInput from "./CommentInput";
import { Spinner, useDisclosure, addToast } from "@heroui/react";
import { AuthContext } from "../Context/authContext";
import { deletePostApi, updatePostApi } from "../Services/PostsServices";
import CardDroupdown from "./CardDroupdown";
import ModelComponent from "./ModelComponent";
import EditPost from "./Post/EditPost";

dayjs.extend(relativeTime);

const Post = ({
  posts,
  commentsLimit,
  callback,
  getAllPosts,
  activeCommentFor,
  setActiveCommentFor,
}) => {
  const [visibleComments, setVisibleComments] = useState(commentsLimit || 5);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const loadMoreRef = useRef(null);
  const { userData } = useContext(AuthContext);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (commentsLimit) return;
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        visibleComments < posts.comments.length
      ) {
        setLoading(true);
        setTimeout(() => {
          setVisibleComments((prev) => prev + 5);
          setLoading(false);
        }, 800);
      }
    });

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [visibleComments, posts.comments.length, commentsLimit]);

  async function handleDeletePost(onClose) {
    try {
      setIsDeleting(true);
      const response = await deletePostApi(posts._id);

      if (response.message === "success") {
        await getAllPosts();
        addToast({
          title: "Success",
          description: "Post deleted successfully",
          color: "success",
          variant: "flat",
        });
        onClose();
      } else {
        addToast({
          title: "Error",
          description: "Failed to delete the post",
          color: "danger",
          variant: "flat",
        });
      }
    } catch (error) {
      addToast({
        title: "Error",
        description:
          error.message || "An error occurred while deleting the post",
        color: "danger",
        variant: "flat",
      });
    } finally {
      setIsDeleting(false);
    }
  }

  function onEditPost() {
    setIsEditing(true);
  }

return (
  <>
    <div className="bg-white dark:bg-gray-900 w-full sm:w-[90%] md:w-[60%] lg:w-full mx-auto rounded-md shadow-md h-auto px-3 my-5 transition-colors duration-300">

      {/* Header */}
      <div className="w-full h-16 flex items-center justify-between">
        <CardHeader
          avatar={posts.user.photo}
          header={posts.user.name}
          subHeader={posts.createdAt}
        />

        {posts.user._id === userData?._id && (
          <CardDroupdown
            onOpen={onOpen}
            onEdit={onEditPost}
            onDelete={() => handleDeletePost(onClose)}
          />
        )}

        <ModelComponent
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          deleteFunction={handleDeletePost}
          isDeleting={isDeleting}
          title="post"
        />
      </div>

      {/* Post Content */}
      <PostBody
        caption={posts.body}
        image={posts.image}
        className="text-gray-800 dark:text-gray-200"
      />

      {/* Footer & Actions */}
      <PostFooter numOfComments={posts.comments.length} />
      <PostAction postId={posts._id} />

      {/* Comments */}
      {posts.comments.slice(0, visibleComments).map((comment) => (
        <PostComment
          key={comment._id}
          avatar={posts.user.photo}
          comment={comment}
          getAllPosts={getAllPosts}
        />
      ))}

      {/* Input */}
      <CommentInput
        avatar={posts.user.photo}
        postId={posts._id}
        callback={callback}
        isActive={activeCommentFor === posts._id}
        setActiveCommentFor={setActiveCommentFor}
      />

      {/* Loading Spinner */}
      {!commentsLimit && loading && (
        <div className="flex justify-center py-3">
          <Spinner size="sm" />
        </div>
      )}

      {/* Load More Trigger */}
      {!commentsLimit && visibleComments < posts.comments.length && (
        <div ref={loadMoreRef} className="h-5"></div>
      )}

      {/* Edit Post Modal */}
      {isEditing && (
        <EditPost
          post={posts}
          onSave={async ({ body, imageFile }) => {
            if (!body.trim() && !imageFile) return;
            setLoading(true);
            try {
              const formData = new FormData();
              if (body.trim()) formData.append("body", body.trim());
              if (imageFile) formData.append("image", imageFile);

              const response = await updatePostApi(formData, posts._id);

              if (response.message === "success") {
                addToast({
                  title: "Success",
                  description: "Post updated successfully",
                  color: "success",
                  variant: "flat",
                });
                await getAllPosts();
                setIsEditing(false);
              } else {
                addToast({
                  title: "Error",
                  description: "Failed to update post",
                  color: "danger",
                  variant: "flat",
                });
              }
            } catch (error) {
              addToast({
                title: "Error",
                description:
                  error.message ||
                  "An error occurred while updating the post",
                color: "danger",
                variant: "flat",
              });
            } finally {
              setLoading(false);
            }
          }}
          onCancel={() => setIsEditing(false)}
        />
      )}
    </div>
  </>
);

};

export default Post;
