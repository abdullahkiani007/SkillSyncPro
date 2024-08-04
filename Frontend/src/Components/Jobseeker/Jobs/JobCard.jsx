import React from "react";

function JobCard({
  title,
  companyName,
  salary,
  location,
  createdAt,
  type,
  level,
  work,
  details,
  icon,
}) {
  const colors = [
    "bg-green-200",
    "bg-red-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-indigo-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-gray-200",
  ];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const date = new Date(createdAt).toDateString();
  console.log(color);
  return (
    <div
      className={`my-4 p-5 rounded-lg shadow-md w-full md:w-72 mx-2 ${color} `}
    >
      <div className="flex flex-col justify-between  mb-3">
        <h3 className="text-sm rounded-3xl px-4 py-2 bg-secondary-dark text-white w-fit h-fit">
          {date}
        </h3>
        <h2 className="text-lg font-medium text-gray-500">{companyName}</h2>
        <h1 className="text-xl font-bold ">{title}</h1>
      </div>
      <div className="mb-3">
        <div className="flex flex-col space-y-2">
          <div className="flex space-x-2">
            <span className="font-semibold text-gray-600">Type:</span>
            <span className="text-gray-500">{type}</span>
          </div>
          <div className="flex space-x-2">
            <span className="font-semibold text-gray-600">Level:</span>
            <span className="text-gray-500">{level}</span>
          </div>
          <div className="flex space-x-2">
            <span className="font-semibold text-gray-600">Work:</span>
            <span className="text-gray-500">{work}</span>
          </div>
        </div>
        <div className="flex space-x-2 mt-3 items-center">
          <span className="text-xl text-gray-600">{icon}</span>
          <span className="text-gray-500">{location || "location"}</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{salary}</h1>
        <button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={details}
        >
          Details
        </button>
      </div>
    </div>
  );
}

export default JobCard;
