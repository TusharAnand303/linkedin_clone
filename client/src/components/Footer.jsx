import React from 'react'
import full_logo from "../assets/full_logo.png";

const Footer = () => {

    const handleUpper = () =>{
        window.scrollTo(0,0)
      }
  return (
   <>
    <footer className="bg-gray-200 flex md:flex-row flex-col justify-evenly p-10 md:items-center md:pt-10 md:pb-10">
          <div className="">
            <img src={full_logo} alt="footer_logo" className="w-[100px] mb-5" />
          </div>
          <div>
            <span className="font-semibold">General</span>
            <div className="flex flex-col justify-start items-start text-sm gap-1 mt-5 ">
              <span className="hover:text-[#2867B2] cursor-pointer">Sign Up</span>
              <span className="hover:text-[#2867B2] cursor-pointer">About</span>
              <span className="hover:text-[#2867B2] cursor-pointer">Engineers</span>
              <span className="hover:text-[#2867B2] cursor-pointer">Career</span>
              <span className="hover:text-[#2867B2] cursor-pointer">press</span>
              <span className="hover:text-[#2867B2] cursor-pointer mb-5 md:mb-0">Blog</span>
            </div>
          </div>
          <div>
            <span className="font-semibold">Browse linkedIn</span>
            <div className="flex flex-col justify-start items-start text-sm gap-1 mt-5 ">
              <span className="hover:text-[#2867B2] cursor-pointer">Learning</span>
              <span className="hover:text-[#2867B2] cursor-pointer">Jobs</span>
              <span className="hover:text-[#2867B2] cursor-pointer">Salary</span>
              <span className="hover:text-[#2867B2] cursor-pointer">Mobile</span>
              <span className="hover:text-[#2867B2] cursor-pointer">Services</span>
              <span className="hover:text-[#2867B2] cursor-pointer mb-5 md:mb-0">Products</span>
            </div>
          </div>
          <div>
            <span className="font-semibold">Business Solution</span>
            <div className="flex flex-col justify-start items-start text-sm gap-1 mt-5 ">
              <span className="hover:text-[#2867B2] cursor-pointer">Talent</span>
              <span className="hover:text-[#2867B2] cursor-pointer">Marketing</span>
              <span className="hover:text-[#2867B2] cursor-pointer">Sales</span>
              <span className="hover:text-[#2867B2] cursor-pointer">Learning</span>
              <span className="hover:text-[#2867B2] cursor-pointer">Services</span>
              <span className="hover:text-[#2867B2] cursor-pointer mb-5 md:mb-0">Products</span>
            </div>
          </div>
          <div>
            <span className="font-semibold">Directories</span>
            <div className="flex flex-col justify-start items-start text-sm gap-1 mt-5 ">
              <span className="hover:text-[#2867B2] cursor-pointer">Schools</span>
              <span className="hover:text-[#2867B2] cursor-pointer">News</span>
              <span className="hover:text-[#2867B2] cursor-pointer">Services</span>
              <span className="hover:text-[#2867B2] cursor-pointer">News Letters</span>
              <span className="hover:text-[#2867B2] cursor-pointer">Products</span>
              <span className="hover:text-[#2867B2] cursor-pointer">People Search</span>
            </div>
          </div>
        </footer>
        <div className="p-3 md:pl-[95px] flex md:justify-between justify-center gap-5 md:gap-0 items-center">
        <img src={full_logo} alt="last linkedin" className="w-[80px]" />
        <span className="md:text-sm text-[10px] font-semibold">All Rights Reserved &copy; LinkedIn Clone <span onClick={handleUpper}><i className="ri-arrow-up-s-line p-2 border border-gray-600 rounded-full ml-2 cursor-pointer hover:bg-gray-200"></i></span></span>
        </div>
   </>
  )
}

export default Footer
