import React, { useContext } from "react";
import ProfileHeader from "../Components/Porofile/ProfileHeader";
import Post from "../Components/Post";
import { useQuery } from "@tanstack/react-query";
import PostSkeleton from "../Components/PostSkeleton";
import CreatePost from "../Components/Post/CreatePost";
import { AuthContext } from "../Context/AuthContextProvider";
import { getUserPostsApi } from "../Services/UserServices";

const ProfilePage = () => {
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
            // activeCommentFor={activeCommentFor}
            // setActiveCommentFor={setActiveCommentFor}
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
