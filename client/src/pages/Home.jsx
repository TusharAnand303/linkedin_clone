import React, { useContext, useEffect, useState } from "react";
import full_logo from "../assets/full_logo.png";
import articles from "../assets/articles.svg";
import people from "../assets/people.svg";
import learning from "../assets/learning.svg";
import jobs from "../assets/jobs.svg";
import getapp from "../assets/getapp.svg";
import { useNavigate } from "react-router-dom";
import home from "../assets/home.svg";
import google from "../assets/google.png";
import Footer from "../components/Footer";
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../context/userContext";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    document.title = "LinkedIn: Login In or Sign Up";
  });
  const [show, setshow] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const { state, dispatch } = useContext(UserContext);

  const showPass = () => {
    setshow(!show);
  };

  const handleGoogleLogin = async () => {
    setLoad(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        setLoad(false);
        const user = result.user;
        setUser(user);
        dispatch({ type: "SET_MONGO_DATA", payload: user });
        handleGoogleData(user.email, user.photoURL);
        // Store user data in localStorage
        localStorage.setItem('userEmail', user.email);
        localStorage.setItem('userDisplayName', user.displayName);
        localStorage.setItem('userPhotoURL', user.photoURL);
        navigate('/home')
        
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoad(false);
      });
  };

  const handleGoogleData = async (email, photoURL) => {
    try {
      const resp = await axios.post(
        `http://localhost:8000/api/v1/googleregister`,
        {
          email: email,
          photo: photoURL,
        }
      );
      const googleData = resp.data;
      // const postArray = googleData.wholeData.message;
      // localStorage.setItem('myPosts', JSON.stringify(postArray));
      // dispatch({ type: "SET_WHOLE_DATA", payload: googleData });
      toast.success(googleData.message);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleLoginData = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
    } else if (!email.includes("@" || !email.includes(".com"))) {
      toast.error("Email includes @ and .com");
    }

    // checking data to database mongodb for login

    const resp = axios.post(`/api/v1/signin`,{
      email:email,
      password: password,
    }).then((resp)=>{
      setLoading(true)
      const response = resp.data;
     
      setTimeout(() => {
        setLoading(false);
        toast.success(response.message)
        // console.log(response.userData)
        dispatch({ type: "SET_GOOGLE_DATA", payload: response });
        // Store user data in localStorage
        localStorage.setItem('muserEmail', response.userData.email);
        localStorage.setItem('mname', response.userData.name);
        // localStorage.setItem('muserPhotoURL', user.photoURL);
        navigate('/home');
      }, 3000);
    }).catch((err)=>{
      setLoading(true)
      setTimeout(() => {
        toast.error(err.response.data?.message)
        setLoading(false);
        navigate('/')
      }, 3000);
    })

  };

  return (
    <>
      <div className="flex justify-evenly items-center md:p-5 p-3">
        <img
          src={full_logo}
          alt="mainLogo"
          className="w-[120px] md:w-[150px] cursor-pointer md:ml-[-100px] "
          onClick={() => navigate("/")}
        />

        <div className="hidden md:block">
          <div className="flex justify-center items-center gap-10 ml-[60px] ">
            <div className="flex flex-col justify-center items-center cursor-pointer gap-1">
              <img src={articles} alt="articles" className="w-[25px]" />
              <p className="text-[12px] text-gray-600 hover:text-gray-400">
                Articles
              </p>
            </div>
            <div className="flex flex-col justify-center items-center cursor-pointer gap-1">
              <img src={people} alt="articles" className="w-[22px]" />
              <p className="text-[12px] text-gray-600 hover:text-gray-400">
                Peoples
              </p>
            </div>
            <div className="flex flex-col justify-center items-center cursor-pointer gap-1">
              <img src={learning} alt="articles" className="w-[22px]" />
              <p className="text-[12px] text-gray-600 hover:text-gray-400">
                Learnings
              </p>
            </div>
            <div className="flex flex-col justify-center items-center cursor-pointer gap-1">
              <img src={jobs} alt="articles" className="w-[22px]" />
              <p className="text-[12px] text-gray-600 hover:text-gray-400">
                Jobs
              </p>
            </div>
            <div className="flex flex-col justify-center items-center cursor-pointer gap-1">
              <img src={getapp} alt="articles" className="w-[22px]" />
              <p className="text-[12px] text-gray-600 hover:text-gray-400">
                Get the app
              </p>
            </div>
          </div>
        </div>

        <div className="flex justufy-center items-center gap-2">
          <button
            className="hover:bg-gray-100 text-black rounded-full px-6 py-3 font-semibold "
            onClick={() => navigate("/signin")}
          >
            Join Now
          </button>
          <button
            className=" text-[#2867B2] rounded-full px-6 py-2.5 border border-[#2867B2] hover:bg-blue-100 hover:text-gray-500  transition-colors duration-200 font-semibold"
            onClick={() => navigate("/")}
          >
             Sign in
          </button>
        </div>
      </div>
      <h1 className="md:text-[50px] text-[26px] font-normal text-[#966254] p-3 md:pl-[95px] mt-2">
        Find jobs through your
        <br /> community
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center md:pl-[95px] mt-3 ">
        {/* Left Section (Input Divs) */}
        <div className="flex flex-col justify-center gap-7">
          <div className="flex flex-col items-start justify-start gap-2">
            <span className="text-sm">Enter Email</span>
            <input
              type="email"
              className="w-[370px] h-[55px] border border-gray-700 outline-none text-[18px] pl-2 rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start justify-start gap-2">
            <span className="text-sm">Enter Password</span>
            <input
              type={show ? "password" : "text"}
              className="w-[370px] h-[55px] border border-gray-700 outline-none text-[18px] pl-2 rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="relative -mt-[47px] ml-auto mr-5 text-[#2867B2] cursor-pointer font-semibold"
              onClick={showPass}
            >
              {show ? "Show" : "Hide"}
            </span>
          </div>
          <span className="text-[#2867B2] font-semibold cursor-pointer">
            Forgot Password ?
          </span>
          <button
            className="bg-[#2867B2] w-full rounded-3xl text-white h-[50px]"
            onClick={handleLoginData}
          >
            {loading ? (
                <div className="animate-spin">
                  <i className="text-2xl ri-loader-2-fill"></i>
                </div>
              ) : (
                "Sign in"
              )}
          </button>
          <div className="flex justify-center items-center flex-col">
            <span className="or mt-[-10px] flex justify-center items-center">
              or
            </span>
          </div>
          <button
            className="flex justify-center items-center border border-gray-500 py-3 h-[50px] rounded-3xl -mt-2 gap-3 hover:bg-gray-100"
            onClick={handleGoogleLogin}
          >
            <span className="text-sm">
              {load ? (
                <div className="animate-spin">
                  <i className="text-2xl ri-loader-2-fill"></i>
                </div>
              ) : (
                <>
                  <div className="flex gap-2 justify-center items-center">
                    <img src={google} alt="google" className="w-[20px]" />{" "}
                    Continue with google
                  </div>
                </>
              )}
            </span>
          </button>
          <button
            className="flex justify-center items-center border border-gray-500 py-3 h-[50px] rounded-3xl -mt-2 gap-3 hover:bg-gray-100 hover:text-gray-700"
            onClick={() => navigate("/signin")}
          >
            <span className="text-sm font-semibold">
              New to LinkedIn ? Join Now
            </span>
          </button>
        </div>

        {/* Right Section (Image) */}
        <img
          src={home}
          alt="main image"
          className="md:w-[55%] w-[90%] md:mt-[-150px] mt-10"
        />
      </div>
      {/* another div  */}
      <div className="md:mt-10 mt-5 flex md:flex-row flex-col justify-between items-center gap-10">
        <div className="md:pl-[95px] p-5">
          <h1 className="md:text-[45px] text-[35px] md:w-[100px] text-gray-700">
            Explore collaborative articles
          </h1>
          <p className="md:text-[24px] text-[20px] text-gray-500 md:w-[500px] w-[300px] ">
            We’re unlocking community knowledge in a new way. Experts add
            insights directly into each article, started with the help of AI.
          </p>
        </div>
        <div className="space-x-2 space-y-2 p-2 md:p-0">
          <button className="px-8 py-3 border border-gray-500 rounded-3xl hover:bg-gray-100">
            Marketing
          </button>
          <button className="px-6 py-3 border border-gray-500 rounded-3xl hover:bg-gray-100">
            Public Administration
          </button>
          <button className="px-6 py-3 border border-gray-500 rounded-3xl hover:bg-gray-100">
            Healthcare
          </button>
          <button className="px-8 py-3 border border-gray-500 rounded-3xl hover:bg-gray-100">
            Engineering
          </button>
          <button className="px-10 py-3 border border-gray-500 rounded-3xl hover:bg-gray-100">
            IT Services
          </button>
          <button className="px-5 py-3 border border-gray-500 rounded-3xl hover:bg-gray-100">
            Telecom
          </button>
          <button className="px-8 py-3 border border-gray-500 rounded-3xl hover:bg-gray-100">
            HR Management
          </button>
          <button className="px-10 py-3 border border-[#2867B2] text-[#2867B2] rounded-3xl hover:bg-gray-100">
            Show More
          </button>
        </div>
      </div>
      {/* footer div  */}
      <Footer />
      {/* footer div ends  */}
    </>
  );
};

export default Home;
