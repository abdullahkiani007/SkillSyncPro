import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const JobDetails = () => {
  const params = useParams();
  const id = params.id;
  const [detail, setDetail] = useState([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem("empJobs"));
    setDetail(jobs.filter((item) => item._id == id)[0]);
    console.log(detail);
  }, []);

  console.log("params received", params.id);
  return (
    <div className="flex flex-col px-10 ">
      <div>
        <p>Back to jobs</p>
      </div>
      <div>
        <h1 className="font-bold mt-4 text-secondary-dark text-3xl">
          {detail.title}
        </h1>
        <h2 className="text-sm mt-2 text-gray-500">{detail.location}</h2>
      </div>
    </div>
  );
};

export default JobDetails;
