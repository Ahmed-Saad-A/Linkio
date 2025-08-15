import React from 'react'

const PostFooter = ({numOfComments}) => {
return (
  <div className="w-full flex items-center px-3 my-3 space-x-2">
    {/* أيقونة اللايك */}
    <div className="bg-blue-500 w-6 h-6 rounded-full flex items-center justify-center shadow">
      <svg
        className="w-3.5 h-3.5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
      </svg>
    </div>

    {/* أيقونة القلب */}
    <div className="bg-red-500 w-6 h-6 rounded-full flex items-center justify-center shadow -ml-2">
      <svg
        className="w-3.5 h-3.5 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </div>

    {/* النصوص */}
    <div className="flex justify-between items-center w-full text-sm text-gray-500 dark:text-gray-400">
      <p className="ml-2">8</p>
      <p className="ml-3">{numOfComments} comment</p>
    </div>
  </div>
);

}

export default PostFooter