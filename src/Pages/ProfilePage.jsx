import React, { useContext, useState } from "react";
import ProfileHeader from "../Components/Profile/ProfileHeader.jsx";
import { useQuery } from "@tanstack/react-query";
import CreatePost from "../Components/Post/CreatePost";
import { AuthContext } from "../Context/AuthContextProvider";
import { getUserPostsApi } from "../Services/UserServices";
import PostSkeleton from "../Components/Post/PostSkeleton";
import Index from '../Components/Post/Index.jsx';


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
          <Index
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
        <p className="text-center mt-5 text-gray-500">
          There are no posts for this user.
        </p>
      )}
    </section>
  );
};

export default ProfilePage;
