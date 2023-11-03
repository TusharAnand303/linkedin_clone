import React from "react";
import error from "../assets/error_bg.png";
import logo from "../assets/full_logo.png";
import { useNavigate } from "react-router-dom";
const Error = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="relative">
        <img src={error} alt="bg image" />
        <img src={logo} alt="logo" className="w-[110px] absolute top-0 m-10" />
        <span className="px-6 py-2 border border-gray-300 text-[#2867B2] text-sm absolute top-0 right-0 m-10 select-none rounded-sm">
          LinkedIn Clone by ( Tushar ){" "}
        </span>

        <div className="absolute gap-7 -mt-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
        <h1 className="text-[35px] text-gray-500">Page not found</h1>
        <p className="text-center w-[500px] text-sm">
          Uh oh, we can’t seem to find the page you’re looking for. Try going
          back to the previous page or see our Help Center for more
          information
        </p>
        <button className="px-5 py-1.5 border border-[#2867B2] text-[#2867B2] hover:bg-gray-100 hover:text-gray-700" onClick={()=>navigate('/home')}>
          Go to your feed
        </button>
      </div>
      </div>
    </>
  );
};

export default Error;
