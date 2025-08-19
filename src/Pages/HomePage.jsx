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
    staleTime: 1000 * 60 * 2,
  }
);

  return (
    <>
      <CreatePost getAllPosts={refetch} />

      {isFetching && !isLoading && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50">
          <button className="relative flex top-16 items-center justify-center w-12 h-12 bg-white rounded-full shadow-lg border border-gray-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 9.75L12 3l9 6.75V21a1.5 1.5 0 01-1.5 1.5h-15A1.5 1.5 0 013 21V9.75z"
              />
            </svg>

            <span className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></span>
          </button>
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
