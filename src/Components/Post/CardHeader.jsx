import dayjs from "dayjs";
import React from "react";
import  userPhoto  from '/src/assets/user-circles.png';


const CardHeader = ({avatar, header, subHeader}) => {
return (
  <div className="flex items-center">
    <img
      onError={(e) => (e.target.src = userPhoto)}
      className="rounded-full w-10 h-10 mr-3 object-cover border border-gray-300 dark:border-gray-600"
      src={avatar}
      alt="User Avatar"
    />
    <div className="flex flex-col">
      <h3 className="text-sm sm:text-md font-semibold text-gray-900 dark:text-gray-100 truncate max-w-[150px]">
        {header}
      </h3>
      <p className="text-xs text-gray-500 dark:text-gray-400">
        {dayjs(subHeader).fromNow()}
      </p>
    </div>
  </div>
);

};

export default CardHeader;
