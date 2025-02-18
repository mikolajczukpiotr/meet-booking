export const AddIcon = () => {
  return (
    <button
      className="w-5 h-5 transition-colors text-purple-600 hover:text-purple-800"
      aria-label="Add"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 0C15.523 0 20 4.477 20 10C20 15.523 15.523 20 10 20C4.477 20 0 15.523 0 10C0 4.477 4.477 0 10 0ZM10 2C5.582 2 2 5.582 2 10C2 14.418 5.582 18 10 18C14.418 18 18 14.418 18 10C18 5.582 14.418 2 10 2ZM11 5V9H15V11H11V15H9V11H5V9H9V5H11Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};
