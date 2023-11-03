import React, { useContext, useEffect, useState } from "react";
import full_logo from "../assets/full_logo.png";
import google from "../assets/google.png";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "../firebase/firebase";
import { signInWithPopup } from "firebase/auth";
import toast from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../context/userContext";

const Signin = () => {
  const navigate = useNavigate();
  const [show, setshow] = useState(true);
  const [user, setUser] = useState("");
  const [load, setLoad] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('');
  const { state, dispatch } = useContext(UserContext);

  useEffect(() => {
    document.title = "Sign Up | LinkedIn";
  });
  const handleUpper = () => {
    window.scrollTo(0, 0);
  };
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
        dispatch({ type: "SET_USER_DATA", payload: user });
        // console.log(user);
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
      const resp = await axios.post(`/api/v1/googleregister`, {
        email: email,
        photo: photoURL,
      });
      const googleData = resp.data;
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

    //send data for register in mongodb
    setLoading(true);
    const response = await axios
      .post(`/api/v1/register`, {
        name: name,
        email: email,
        password: password,
      })
      .then((response) => {
        const responseData = response.data;
        toast.success(responseData.message);
        setTimeout(() => {
          setLoading(false);
          navigate("/");
        }, 3000);
        // console.log(responseData);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setTimeout(() => {
          setLoading(false);
          // navigate('/')
        }, 3000);
      });
  };

  return (
    <>
      <div className="bg-gray-100 h-screen ">
        <div className="flex justify-center items-center pt-10">
          <img
            src={full_logo}
            alt="linkedin"
            className="md:w-[140px] w-[140px] cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>
        <h1 className="text-3xl text-center mt-5">
          Make the most of your professional life
        </h1>
        <div className="flex flex-col justify-center items-center gap-5 mt-5 ">
          <div className="bg-white w-[400px] flex flex-col justify-center items-center gap-5 mt-2 p-5 rounded-xl">
          <div className="flex items-start justify-start flex-col">
              <span className="text-sm">Enter Name</span>
              <input
                type="text"
                className="w-[350px] h-[40px] outline-none border border-gray-500 rounded-md pl-2"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex items-start justify-start flex-col">
              <span className="text-sm">Enter Email</span>
              <input
                type="text"
                className="w-[350px] h-[40px] outline-none border border-gray-500 rounded-md pl-2"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-start justify-start flex-col relative">
              <span className="text-sm">Enter Password</span>
              <input
                type={show ? "password" : "text"}
                className="w-[350px] h-[40px] outline-none border border-gray-500 rounded-md pl-2"
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="absolute right-0 mt-[30px] mr-[15px] text-[#2867B2] font-semibold cursor-pointer text-sm"
                onClick={showPass}
              >
                {show ? "Show" : "Hide"}
              </span>
            </div>
            <p className="text-center text-[12px]">
              By clicking Agree & Join, you agree to the LinkedIn{" "}
              <span className="text-[#2867B2] font-semibold">
                User Agreement
              </span>
              ,{" "}
              <span className="text-[#2867B2] font-semibold">
                Privacy Policy
              </span>
              , and{" "}
              <span className="text-[#2867B2] font-semibold">
                Cookie Policy
              </span>
              .
            </p>
            <button
              className="w-full bg-[#2867B2] text-white h-[45px] rounded-full"
              onClick={handleLoginData}
            >
              {loading ? (
                <div className="animate-spin">
                  <i className="text-2xl ri-loader-2-fill"></i>
                </div>
              ) : (
                "Agree & join"
              )}
            </button>
            <p className="-mt-2 flex justify-center items-center or">or</p>
            <button
              className="flex justify-center items-center border border-gray-500 w-full h-[45px] rounded-3xl -mt-2 gap-3 hover:bg-gray-100"
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
            <p>
              Already on LinkedIn ?{" "}
              <span
                className="text-[#2867B2] font-semibold cursor-pointer"
                onClick={() => navigate("/")}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="p-3 md:pl-[95px] flex md:justify-between justify-center gap-5 md:gap-0 items-center bg-gray-100">
        <img src={full_logo} alt="last linkedin" className="w-[80px]" />
        <span className="md:text-sm text-[10px] font-semibold">
          All Rights Reserved &copy; LinkedIn Clone{" "}
          <span onClick={handleUpper}>
            <i className="ri-arrow-up-s-line p-2 border border-gray-600 rounded-full ml-2 cursor-pointer hover:bg-gray-200"></i>
          </span>
        </span>
      </div>
    </>
  );
};

export default Signin;
