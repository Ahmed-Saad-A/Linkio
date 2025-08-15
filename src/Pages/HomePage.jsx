import React, { useState } from "react";
import { getAllPostsApi } from "../Services/PostsServices";
import Post from "./../Components/Post";
import CreatePost from "../Components/Post/CreatePost";
import PostSkeleton from "../Components/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { Spinner } from "@heroui/react";

const HomePage = () => {
  const [activeCommentFor, setActiveCommentFor] = useState(null);

  const { data, refetch, isLoading, isFetching } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPostsApi,
  });

  return (
    <>
      <CreatePost getAllPosts={refetch} />

      {isFetching && !isLoading && (
        <div className="fixed start-0 end-0 w-fit mx-auto flex items-center space-x-2 bg-gray-100-500 bg-opacity-80 backdrop-blur-md px-3 py-1 rounded shadow sm:m-5">
          <Spinner size="sm" label="Post updates in progress..." />
        </div>
      )}

      {isLoading ? (
        <PostSkeleton />
      ) : data?.data?.posts?.length > 0 ? (
        data.data.posts.map((post) => (
          <Post
            callback={refetch}
            posts={post}
            key={post.id}
            commentsLimit={1}
            getAllPosts={refetch}
            activeCommentFor={activeCommentFor}
            setActiveCommentFor={setActiveCommentFor}
          />
        ))
      ) : (
        <PostSkeleton />
      )}
    </>
  );
};

export default HomePage;
