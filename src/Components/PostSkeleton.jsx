const PostSkeleton = () => {
return (
  <div className="bg-white dark:bg-gray-900 w-full rounded-md shadow-md h-auto py-3 px-3 my-5 animate-pulse transition-colors duration-300">
    <div className="w-full h-16 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div className="rounded-full bg-gray-300 dark:bg-gray-700 w-10 h-10" />
        <div className="flex flex-col space-y-1">
          <div className="bg-gray-300 dark:bg-gray-700 rounded w-24 h-4" />
          <div className="bg-gray-300 dark:bg-gray-700 rounded w-12 h-3" />
        </div>
      </div>
      <div className="bg-gray-300 dark:bg-gray-700 rounded-full w-8 h-8" />
    </div>

    <div className="mt-3 space-y-2">
      <div className="bg-gray-300 dark:bg-gray-700 rounded w-full h-4" />
      <div className="bg-gray-300 dark:bg-gray-700 rounded w-5/6 h-4" />
    </div>

    <div className="w-full h-8 flex items-center px-3 my-3 space-x-2">
      <div className="bg-blue-400 dark:bg-blue-500 rounded-full w-5 h-5" />
      <div className="bg-red-400 dark:bg-red-500 rounded-full w-5 h-5 -ml-1" />
      <div className="flex-grow flex justify-between px-3">
        <div className="bg-gray-300 dark:bg-gray-700 rounded w-6 h-3" />
        <div className="bg-gray-300 dark:bg-gray-700 rounded w-16 h-3" />
      </div>
    </div>

    <hr className="border-gray-300 dark:border-gray-700" />

    <div className="grid grid-cols-3 w-full px-5 my-3 gap-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex flex-row justify-center items-center w-full space-x-3"
        >
          <div className="bg-gray-300 dark:bg-gray-700 rounded w-6 h-6" />
          <div className="bg-gray-300 dark:bg-gray-700 rounded w-20 h-5" />
        </div>
      ))}
    </div>

    <hr className="border-gray-300 dark:border-gray-700" />
  </div>
);

};

export default PostSkeleton;
