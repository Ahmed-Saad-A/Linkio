import React, { useState, useEffect } from "react";
import { getAllPostsApi } from "../Services/PostsServices";
import Post from "./../Components/Post";
import CreatePost from "../Components/Post/CreatePost";
import PostSkeleton from "../Components/PostSkeleton";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpIcon } from "@heroicons/react/24/solid";

const HomePage = () => {
  const [lastPostId, setLastPostId] = useState(null);
  const [newPostsCount, setNewPostsCount] = useState(0);
  const [activeCommentFor, setActiveCommentFor] = useState(null);
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: getAllPostsApi,
    refetchInterval: 10000,
  });

  useEffect(() => {
    if (data?.data?.posts?.length) {
      const latestId = data.data.posts[0].id;

      if (!lastPostId) {
        setLastPostId(latestId);
      } else if (latestId !== lastPostId) {
        const newPosts = data.data.posts.filter((p) => p.id > lastPostId);
        setNewPostsCount(newPosts.length);
      }
    }
  }, [data, lastPostId]);

  const handleShowNewPosts = () => {
    if (data?.data?.posts?.length) {
      setLastPostId(data.data.posts[0].id);
    }
    setNewPostsCount(0);

    window.scrollTo({ top: 0, behavior: "smooth" });

    refetch();
  };

  return (
    <div className="relative">
      <CreatePost getAllPosts={refetch} />

      {/* "new posts" */}
      {newPostsCount > 0 && (
        <div className="sticky top-16 flex justify-center z-50">
          <button
            onClick={handleShowNewPosts}
            className="flex gap-3 items-center content-center px-4 py-2 bg-pink-600 text-white rounded-full shadow-md animate-bounce"
          >
            <ArrowUpIcon className="w-5 h-5" />
            {newPostsCount} new post{newPostsCount > 1 ? "s" : ""}
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
    </div>
  );
};

export default HomePage;
