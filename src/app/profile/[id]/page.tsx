import React from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const page = ({ params} : any) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <h2>{params.id}</h2>
    </div>
  );
};

export default page;
