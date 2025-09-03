import React, { useContext, useState } from "react";
import ProfileHeader from "../Components/Profile/ProfileHeader.jsx";
import { useQuery } from "@tanstack/react-query";
import CreatePost from "../Components/Post/CreatePost";
import { AuthContext } from "../Context/AuthContextProvider";
import { getUserPostsApi } from "../Services/UserServices";
import PostSkeleton from "../Components/Post/PostSkeleton";
import Post from "../Components/Post";

const ProfilePage = () => {
  const [activeCommentFor, setActiveCommentFor] = useState(null);
  const { userData } = useContext(AuthContext);
  const profileUserId = userData?._id;

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["userPosts", profileUserId],
    queryFn: () => getUserPostsApi(profileUserId),
    enabled: !!profileUserId,
  });
  return (
    <section className="min-h-screen">
      <ProfileHeader />

      <CreatePost getAllPosts={refetch} />

      {isLoading ? (
        <PostSkeleton />
      ) : data?.posts?.length > 0 ? (
        data.posts.map((post) => (
          <Post
            key={post._id}
            posts={post}
            commentsLimit={1}
            callback={refetch}
            getAllPosts={refetch}
            activeCommentFor={activeCommentFor}
            setActiveCommentFor={setActiveCommentFor}
          />
        ))
      ) : (
        <p
          className="mx-auto mt-10 w-fit px-6 py-3 text-center text-cyan-700 dark:text-cyan-300 
            bg-gray-300 dark:bg-gray-800 rounded-xl shadow-md 
            animate-pulse"
        >
          No posts to show yet.
        </p>
      )}
    </section>
  );
};

export default ProfilePage;
