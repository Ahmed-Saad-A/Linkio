

import React, { useState, useContext } from "react";
import ProfileHeader from "../Components/Porofile/ProfileHeader";
import Post from "../Components/Post";
import { getAllPostsApi } from "../Services/PostsServices";
import { useQuery } from "@tanstack/react-query";
import PostSkeleton from "../Components/PostSkeleton";
import CreatePost from "../Components/Post/CreatePost";
import { authContext } from "../Context/AuthContext";

const ProfilePage = () => {
  const { userData } = useContext(authContext);
  const profileUserId = userData?._id;

  const [activeCommentFor, setActiveCommentFor] = useState(null);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPostsApi,
  });

  const filteredPosts =
    data?.data?.posts?.filter((post) => post.user._id?.toString() === profileUserId?.toString()) || [];

  return (
    <section className="min-h-screen">
      <ProfileHeader />

      <CreatePost getAllPosts={refetch} />

      {isLoading ? (
        <PostSkeleton />
      ) : filteredPosts.length > 0 ? (
        filteredPosts.map((post) => (
          <Post
            key={post.id}
            posts={post}
            commentsLimit={1}
            callback={refetch}
            getAllPosts={refetch}
            activeCommentFor={activeCommentFor}
            setActiveCommentFor={setActiveCommentFor}
          />
        ))
      ) : (
        <p className="text-center mt-5 text-gray-500">
          There are no posts for this user.
        </p>
      )}
    </section>
  );
};

export default ProfilePage;
