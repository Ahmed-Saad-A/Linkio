import React, { useState, useEffect } from "react";
import { getAllPostsApi } from "../Services/PostsServices";
import CreatePost from "../Components/Post/CreatePost";
import { useQuery } from "@tanstack/react-query";
import { ArrowUpIcon } from "@heroicons/react/24/solid";
import PostSkeleton from "./../Components/Post/PostSkeleton";
import Post from "../Components/Post";

const HomePage = () => {
  const [lastPostId, setLastPostId] = useState(null);
  const [newPostsCount, setNewPostsCount] = useState(0);
  const [activeCommentFor, setActiveCommentFor] = useState(null);
  const [showNewPostsButton, setShowNewPostsButton] = useState(false);

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


  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100 && newPostsCount > 0) {
        setShowNewPostsButton(true);
      } else {
        setShowNewPostsButton(false);
      }

      if (window.scrollY === 0 && newPostsCount > 0) {
        setNewPostsCount(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [newPostsCount]);

  const handleShowNewPosts = () => {
    if (data?.data?.posts?.length) {
      setLastPostId(data.data.posts[0].id);
    }
    setNewPostsCount(0);
    setShowNewPostsButton(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
    refetch();
  };

  return (
    <div className="relative">
      <CreatePost getAllPosts={refetch} />

      {/* "new posts" */}
      {showNewPostsButton && (
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
