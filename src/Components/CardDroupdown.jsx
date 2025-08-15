import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import React from "react";

const CardDroupdown = ({ onOpen, onEdit }) => {
  return (
    <Dropdown>
      <DropdownTrigger>
        <svg
          className="w-fit outline-none cursor-pointer text-gray-400 dark:text-gray-300 hover:text-gray-600 dark:hover:text-gray-100 transition-colors"
          xmlns="http://www.w3.org/2000/svg"
          width={27}
          height={27}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="square"
          strokeLinejoin="round"
        >
          <circle cx={12} cy={12} r={1} />
          <circle cx={19} cy={12} r={1} />
          <circle cx={5} cy={12} r={1} />
        </svg>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        className="dark:bg-gray-800 dark:text-gray-200"
      >
        <DropdownItem
          key="edit"
          onPress={onEdit}
          className="dark:hover:bg-gray-700"
        >
          Edit
        </DropdownItem>
        <DropdownItem
          key="delete"
          className="text-danger dark:text-red-400 dark:hover:bg-gray-700"
          color="danger"
          onPress={onOpen}
        >
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default CardDroupdown;
