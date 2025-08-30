import React, { createContext, useContext, useState } from "react";

const PostActionContext = createContext();

export const usePostAction = () => useContext(PostActionContext);

export const PostActionProvider = ({ children }) => {
  const [likes, setLikes] = useState(8);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState(5);

  const toggleLike = () => {
    if (liked) {
      setLikes((prev) => prev - 1);
    } else {
      setLikes((prev) => prev + 1);
    }
    setLiked(!liked);
  };

  const value = {
    likes,
    liked,
    comments,
    toggleLike,
    setComments,
  };

  return (
    <PostActionContext.Provider value={value}>
      {children}
    </PostActionContext.Provider>
  );
};
