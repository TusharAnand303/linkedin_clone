import React, { useContext, useState } from "react";
import logo from "../assets/logo.svg";
import search from "../assets/searchsvg.svg";
import home from "../assets/homesvg.svg";
import people from "../assets/people.svg";
import jobs from "../assets/jobs.svg";
import message from "../assets/messagesvg.svg";
import notification from "../assets/notification.svg";
import demo from "../assets/demo.png";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import hash from "../assets/Hash.svg";

const Navbar = () => {
  const [show, setShow] = useState(false);
  const [load, setLoad] = useState(false);
  const { state, dispatch } = useContext(UserContext);
  const navigate = useNavigate();

  const handleProfile = () => {
    setShow(!show);
  };

  const userData = useContext(UserContext);
  const googleData = userData.state.userData;


  const data = useContext(UserContext);
  const mongoData = data.state.userData.userData;

  const userEmail = localStorage.getItem("userEmail");
  const userDisplayName = localStorage.getItem("userDisplayName");
  const userPhotoURL = localStorage.getItem("userPhotoURL");

  const mEmail = localStorage.getItem("muserEmail");
  const mName = localStorage.getItem("mname");

  const handleSignOut = () => {
    setLoad(true);

    setTimeout(() => {
      dispatch({ type: "CLEAR_USER_DATA" });

      localStorage.removeItem("userEmail");
      localStorage.removeItem("userDisplayName");
      localStorage.removeItem("userPhotoURL");
      localStorage.removeItem("muserEmail");
      localStorage.removeItem("mname");
      // localStorage.removeItem("myPosts");

      setLoad(false);
      navigate("/");
    }, 3000);
  };

  return (
    <>
      <div className="sticky top-0 bg-white p-1 flex md:justify-around items-center border-b border-gray-100 justify-between z-50 ">
        {/* search div  */}
        <div className="flex justify-center items-center">
          <img src={logo} alt="main logo" className="w-[45px] mr-2" />
          <img
            src={search}
            alt="search"
            className="md:bg-blue-100/70 md:p-[5.5px]  md:w-[35px] w-[25px]"
          />
          <input
            type="text"
            className="bg-blue-100/70 w-[230px] h-[35px] outline-none pl-2 md:block hidden"
            placeholder="Search"
          />
        </div>

        {/* logo div  */}
        <div className="flex justify-center items-center md:gap-10 gap-8 md:mr-[130px] mt-1">
          <div className="flex flex-col justify-center items-center cursor-pointer hover:text-gray-900 text-gray-500">
            <img src={home} alt="home" className="md:w-[26px] w-[20px]" />
            <p className="text-[12px] hidden md:block">Home</p>
          </div>
          <div className="flex flex-col justify-center items-center cursor-pointer hover:text-gray-900 text-gray-500">
            <img src={people} alt="home" className="md:w-[24px] w-[18px]" />
            <p className="text-[12px] hidden md:block">My Network</p>
          </div>
          <div className="flex flex-col justify-center items-center cursor-pointer hover:text-gray-900 text-gray-500">
            <img src={jobs} alt="home" className="md:w-[28px] w-[22px]" />
            <p className="text-[12px] hidden md:block">Jobs</p>
          </div>
          <div className="flex flex-col justify-center items-center cursor-pointer hover:text-gray-900 text-gray-500">
            <img src={message} alt="home" className="md:w-[26px] w-[20px]" />
            <p className="text-[12px] hidden md:block">Messaging</p>
          </div>
          <div className="relative flex flex-col justify-center items-center cursor-pointer hover:text-gray-900 text-gray-500">
            <img
              src={notification}
              alt="home"
              className="md:w-[26px] w-[20px]"
            />
            <p className="text-[12px] hidden md:block mt-1">Notification</p>
            <span className="absolute bg-red-600 text-white px-1.5 top-0 right-0 mr-2 rounded-full text-sm">
              7
            </span>
          </div>
          <div className="flex flex-col justify-center items-center hover:text-gray-900 text-gray-500 relative">
            {googleData && (
              <img
                src={googleData.photoURL || userPhotoURL}
                alt="home"
                className={
                  mongoData
                    ? "hidden"
                    : "md:w-[30px] w-[24px] rounded-full cursor-pointer"
                }
                onClick={handleProfile}
              />
            )}
            {mongoData && (
              <i className="ri-user-fill rounded-full font-bold text-gray-900 text-xl"></i>
            )}

            <div
              className="flex justify-center items-center -mb-1 cursor-pointer"
              onClick={handleProfile}
            >
              <p className="text-[12px] hidden md:block">Me</p>
              <i className="ri-arrow-down-s-fill hidden md:block"></i>
            </div>
            <div
              className={
                show
                  ? `right-0 md:right-none shadow-xl absolute z-50 w-[280px] h-[470px] bg-white border border-gray-200 top-0 mt-[65px] rounded-md`
                  : `hidden`
              }
            >
              <div className="p-3">
                <div className="flex justify-around items-center">
                  {/* <div className="border border-gray-900 rounded-full px-4 py-3">
                    <i className="ri-user-fill rounded-full font-bold text-gray-900 text-3xl "></i>
                    </div> */}
                  {googleData && (
                    <img
                      src={googleData.photoURL || userPhotoURL}
                      alt="image"
                      className={mongoData ? "hidden" : "rounded-full w-[80px]"}
                    />
                  )}
                  {mongoData && (
                    <div className="border border-gray-900 rounded-full px-4 py-3">
                      <i className="ri-user-fill rounded-full font-bold text-gray-900 text-3xl "></i>
                    </div>
                  )}
                  <div className="flex flex-col gap-2 ml-3">
                    <h1 className="text-gray-800 font-semibold">
                      {googleData.displayName || userDisplayName || mName}
                    </h1>
                    <p className="text-sm">
                      Expertise in React JS, Node JS, HTML, and CSS, Delivering
                      High-Quality Projects with Latest Techonology.
                    </p>
                  </div>
                </div>
                <div className="text-center mt-5">
                  <button className="w-full border rounded-full py-1 hover:bg-blue-100/50 hover:text-gray-700 border-[#2867B2] text-[#2867B2]">
                    View Profile
                  </button>
                </div>
                <hr className="mt-3 mb-3" />
                <p className="font-semibold">Account</p>
                <p className="text-gray-900 text-[13px] mt-2 cursor-pointer">
                  Settings & privacy
                </p>
                <p className="text-gray-900 text-[13px] mt-1 cursor-pointer">
                  Help
                </p>
                <p className="text-gray-900 text-[13px] mt-1 cursor-pointer">
                  Language
                </p>
                <p className="font-semibold mt-2">Manage</p>
                <hr className="mt-3 mb-3" />
                <p className="text-gray-900 text-[13px] cursor-pointer">
                  Posts and Activity
                </p>
                <hr className="mt-3 mb-3" />
                <button className="" onClick={handleSignOut}>
                  {load ? (
                    <div className="animate-spin">
                      <i className="text-2xl ri-loader-2-fill"></i>
                    </div>
                  ) : (
                    "Sign out"
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* preminium div  */}
        <div className="hidden md:block ">
          <div className=" md:mr-5 flex justify-center items-center gap-5 ">
            <img src={hash} alt="" className="cursor-pointer" />
            <p className="text-[#977231] text-[12px] text-center cursor-pointer">
              <span className="border-b border-[#977231]">
                Try our premium{" "}
              </span>
              <br /> <span className="border-b border-[#977231]">for free</span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
