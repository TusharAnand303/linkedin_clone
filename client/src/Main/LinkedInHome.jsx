import React, { useContext, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { UserContext } from "../context/userContext";

const LinkedInHome = () => {
  const navigate = useNavigate();

  const [load, setLoad] = useState(false);
  const [post, setPost] = useState("");
  const [postLoad, setPostLoad] = useState(false);
  const [heart, setHeart] = useState(false);
  const [userPost, setUserPost] = useState(null);
  const [time, setTime] = useState(null);
  const [like, setLike] = useState("");
  const [del, setDel] = useState(false);

  const userEmail = localStorage.getItem("userEmail");
  const userDisplayName = localStorage.getItem("userDisplayName");
  const userPhotoURL = localStorage.getItem("userPhotoURL");

  const mEmail = localStorage.getItem("muserEmail");
  const mName = localStorage.getItem("mname");
  // console.log("post",userPost)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = userEmail || mEmail;
        const response = await axios.get(`/api/v1/getpost?email=${email}`);
        const data = response.data;
        // console.log(data.message._id)
        const time = data.message.updatedAt;
        const utcDate = new Date(time);
        const localDate = new Date(
          utcDate.getTime() - utcDate.getTimezoneOffset() * 60000
        );

        setTime(localDate.toLocaleString());

        setUserPost(data.message.message);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  const fillHeart = () => {
    if (heart === 1) {
      setHeart(0);
      setLike("");
    } else {
      setHeart(1);
      setLike(1);
    }
  };
  const refresh = () => {
    window.location.reload();
  };

  const handleSignOut = () => {
    setLoad(true);

    setTimeout(() => {
      //   dispatch({ type: "CLEAR_USER_DATA" });
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

  const createPost = async () => {
    if (!post) {
      toast.error("Please type someting to post");
    } else {
      setPostLoad(true);
      const userPost = await axios
        .post(`/api/v1/createpost`, {
          email: userEmail || mEmail,
          message: post,
        })
        .then((resp) => {
          const postResp = resp.data;
          setTimeout(() => {
            setPostLoad(false);
            toast.success(postResp.message);
            window.location.reload();
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const deletePost = async (msgId) => {
    setDel(true);
    try {
      const response = await axios.post("/api/v1/deletepost", {
        email: userEmail || mEmail,
        messageId: msgId,
      });
      setTimeout(() => {
        setDel(false);
        toast.success(response.data.message);
        window.location.reload();
      }, 3000);
    } catch (error) {
      toast.error("Error deleting message:", error);
    }
  };

  return (
    <>
      <Layout>
        <div className="h-[1500px] bg-[#F4F2EE] ">
          <div className="flex justify-center gap-10 items-start pt-5 bg-[#F4F2EE] ">
            <div className="bg-white w-[260px] h-[500px] border border-gray-200 rounded-xl flex flex-col justify-start items-start">
              <img
                src="https://media.licdn.com/dms/image/D5616AQHIy2ijS4lMhw/profile-displaybackgroundimage-shrink_350_1400/0/1682743691903?e=1704326400&v=beta&t=5wHX1tr-B7iSsu0-1oYJkh8KDEC1pYg91jr8grBX3cY"
                alt="bg_img"
                className="rounded-t-xl"
              />
              <div className="flex justify-center items-center flex-col">
                {userPhotoURL ? (
                  <img
                    src={userPhotoURL}
                    alt="image"
                    className="rounded-full -mt-10 w-[30%] border border-white"
                  />
                ) : (
                  <div className="border border-gray-900 rounded-full px-4 py-3 -mt-10 bg-white">
                    <i className="ri-user-fill rounded-full font-bold text-gray-900 text-3xl "></i>
                  </div>
                )}

                <h1 className="font-semibold mt-3">
                  {userDisplayName || mName}
                </h1>
                <p className="text-center text-[12px] p-3">
                  Expertise in React JS, Node JS, HTML, and CSS, Delivering
                  High-Quality Projects with Latest Techonology.
                </p>
              </div>
              <div className="h-[1px] w-full bg-gray-300"></div>
              <div className="flex justify-start items-start p-3">
                <div className="flex justify-center gap-20 items-center ">
                  <p className="text-[12px]">Connections</p>
                  <p className="text-[12px] text-[#2867B2] font-semibold">
                    (5)
                  </p>
                </div>
              </div>
              <p className="p-3 text-[12px] font-semibold mt-[-20px]">
                Grow Your network
              </p>
              <div className="h-[1px] w-full bg-gray-300"></div>
              <div className="p-3 flex flex-col justify-start items-start">
                <h1 className="font-semibold">Account</h1>
                <p className="text-gray-900 text-[13px] mt-2 cursor-pointer">
                  Edit Profile
                </p>
                <p className="text-gray-900 text-[13px] mt-1 cursor-pointer">
                  Help
                </p>
                <p className="text-gray-900 text-[13px] mt-1 cursor-pointer">
                  Language
                </p>
              </div>
              <div className="flex flex-col justify-start items-start p-3">
                <h1 className="font-semibold">Manage</h1>
              </div>
              <div className="h-[1px] w-full bg-gray-300"></div>
              <button className="p-2 ml-1" onClick={handleSignOut}>
                {load ? (
                  <div className="animate-spin">
                    <i className="text-2xl ri-loader-2-fill"></i>
                  </div>
                ) : (
                  "Sign out"
                )}
              </button>
            </div>

            <div>
              <div className="bg-white w-[550px] h-[150px] border border-gray-200 rounded-xl flex flex-col justify-center items-center">
                <div className="mt-10 flex justify-between gap-10 items-center">
                  {userPhotoURL ? (
                    <img
                      src={userPhotoURL}
                      alt="image"
                      className="rounded-full -mt-10 w-[70px] border border-white"
                    />
                  ) : (
                    <div className="border border-gray-900 rounded-full px-4 py-3 -mt-10 bg-white">
                      <i className="ri-user-fill rounded-full font-bold text-gray-900 text-3xl"></i>
                    </div>
                  )}
                  <input
                    type="text"
                    className="-mt-10 w-[270px] h-[40px] border-2 border-gray-300 rounded-full outline-none pl-2 mr-[-20px] ml-[-20px] text-sm pr-2"
                    placeholder="Start a post"
                    onChange={(e) => setPost(e.target.value)}
                  />
                  <button
                    className="bg-[white] text-[#2867B2] border border-[#2867B2] px-5 py-1.5 rounded-full hover:bg-gray-100 hover:text-gray-600 -mt-10 text-sm"
                    onClick={createPost}
                  >
                    {postLoad ? (
                      <div className="animate-spin px-8 py-[2px]">
                        <i className="text-md ri-loader-2-fill"></i>
                      </div>
                    ) : (
                      "Create post"
                    )}
                  </button>
                </div>
                <div className="flex justify-center gap-[105px] mt-4 text-3xl items-center text-gray-500">
                  <div className="flex justify-center items-center cursor-pointer gap-2">
                    <i className="ri-image-add-line text-blue-500"></i>
                    <span className="text-sm text-black font-semibold">
                      Media
                    </span>
                  </div>
                  <div className="flex justify-center items-center cursor-pointer gap-2">
                    <i className="ri-film-fill text-yellow-300"></i>
                    <span className="text-sm text-black font-semibold">
                      Event
                    </span>
                  </div>
                  <div className="flex justify-center items-center cursor-pointer gap-2">
                    <i className="ri-calendar-event-line text-green-500"></i>
                    <span className="text-sm text-black font-semibold">
                      Calander
                    </span>
                  </div>
                </div>
              </div>
              <div
                className="ml-2 -mb-3.5 mt-1.5 cursor-pointer flex justify-start items-start gap-2"
                onClick={refresh}
              >
                <div className="flex justify-center items-center">
                  <p className="text-[12px] font-semibold mr-2">Refresh </p>
                  <div className="">
                    <i className="ri-loader-2-fill"></i>
                  </div>
                </div>
              </div>
              {/* posts div */}
              {userPost ? (
                userPost.length > 0 ? (
                  userPost.map((posts) => (
                    <React.Fragment key={posts._id}>
                      <div className="bg-white border border-gray-200 w-[100%] rounded-xl mt-5 flex flex-col justify-start items-start pt-[48px] p-3">
                        <div className="flex justify-center items-center gap-3">
                          {userPhotoURL ? (
                            <img
                              src={userPhotoURL}
                              alt="image"
                              className=" -mt-10 w-[40px] border border-white"
                            />
                          ) : (
                            <div className="border border-gray-900 rounded-full px-4 py-3 -mt-10 bg-white">
                              <i className="ri-user-fill rounded-full font-bold text-gray-900 text-3xl"></i>
                            </div>
                          )}
                          <div>
                            <h1 className="-mt-10 text-sm font-semibold">
                              {userDisplayName || mName}
                            </h1>
                            <p className="text-[12px] text-gray-600">
                              {time} . <i className="ri-earth-fill"></i>
                            </p>
                          </div>
                        </div>
                        <span className="text-[12px] text-gray-600 w-[500px] mt-2">
                          {" "}
                          Expertise in React JS, Node JS, HTML, and CSS,
                          Delivering High-Quality Projects with Latest
                          Techonology.
                        </span>
                        {/* Getting the post */}
                        <h1 className="mt-2">{posts.msg}</h1>
                        {/* Ending getting post */}
                        <div className="flex justify-center gap-20 mt-7 items-center">
                          <div
                            className="flex justify-center items-center cursor-pointer"
                            onClick={fillHeart}
                          >
                            <i
                              className={
                                heart
                                  ? "ri-heart-3-fill text-red-600 text-md"
                                  : "ri-heart-3-line text-md"
                              }
                            ></i>
                            <span className="text-sm ml-2"> {like} Like</span>
                          </div>
                          <div className="flex justify-center items-center cursor-pointer">
                            <i className="ri-message-3-line"></i>
                            <span className="text-sm ml-2 text-md">
                              Comment
                            </span>
                          </div>
                          <div className="flex justify-center items-center cursor-pointer">
                            <i className="ri-stackshare-line"></i>
                            <span className="text-sm ml-2 text-md">Share</span>
                          </div>
                          <div
                            className="flex justify-center items-center cursor-pointer text-red-500"
                            onClick={() => deletePost(posts._id)}
                          >
                            {del ? (
                              <>
                                
                                <div className="-ml-3 animate-spin text-xl">
                                  <i className="ri-loader-2-fill"></i>
                                </div>
                                <span className="ml-2 text-sm text-md ">
                                  Deleting
                                </span>
                              </>
                            ) : (
                              <>
                                <i className="ri-delete-bin-line"></i>
                                <span className="text-sm ml-2 text-md">
                                  Delete
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))
                ) : (
                  <p className="pl-2 mt-5 bg-white p-5 rounded-xl font-semibold text-center">
                    No posts yet. Create a post now!
                  </p>
                )
              ) : (
                <p className="pl-2 mt-5 bg-white p-5 rounded-xl font-semibold text-center">
                  Loading posts...
                </p>
              )}

              {/* post div end */}
            </div>

            <div className="bg-white w-[260px] h-[500px] border border-gray-200 rounded-xl ">
              <div className="p-3 justify-center items-center gap-20">
                <span>LinkedIn news</span>
                <i className="ri-information-fill ml-[110px]"></i>
              </div>
              <div className="p-3">
                <div className="space-y-2">
                  <div className="flex justify-center items-center gap-5">
                    <div className="relative w-[7px] h-[7px] bg-green-600 rounded-full">
                      <div className="absolute w-[9px] h-[9px] bg-green-500 rounded-full top-0 right-0 mt-[-1px] mr-[-1px] ml-2 animate-ping"></div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[13px] font-semibold">
                        Skyroot Aerospace raises $27.5M
                      </span>
                      <p className="text-[12px] text-gray-500">
                        0days ago . 4568 readers
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-5">
                    <div className="relative w-[7px] h-[7px] bg-blue-800 rounded-full">
                      <div className="absolute w-[9px] h-[9px] bg-blue-500 rounded-full top-0 right-0 mt-[-1px] mr-[-1px] ml-2 animate-ping"></div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[13px] font-semibold">
                        Silver economy sparks job boom .
                      </span>
                      <p className="text-[12px] text-gray-500">
                        1days ago . 568 readers
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-5">
                    <div className="relative w-[7px] h-[7px] bg-blue-800 rounded-full">
                      <div className="absolute w-[9px] h-[9px] bg-blue-500 rounded-full top-0 right-0 mt-[-1px] mr-[-1px] ml-2 animate-ping"></div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[13px] font-semibold">
                        The secret to startup success inc .
                      </span>
                      <p className="text-[12px] text-gray-500">
                        10days ago . 1468 readers
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-5">
                    <div className="relative w-[7px] h-[7px] bg-blue-800 rounded-full">
                      <div className="absolute w-[9px] h-[9px] bg-blue-500 rounded-full top-0 right-0 mt-[-1px] mr-[-1px] ml-2 animate-ping"></div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[13px] font-semibold">
                        Closing the gender gap at India IN
                      </span>
                      <p className="text-[12px] text-gray-500">
                        2days ago . 10568 readers
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-5">
                    <div className="relative w-[7px] h-[7px] bg-green-600 rounded-full">
                      <div className="absolute w-[9px] h-[9px] bg-green-500 rounded-full top-0 right-0 mt-[-1px] mr-[-1px] ml-2 animate-ping"></div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[13px] font-semibold">
                        Succession planning of React app
                      </span>
                      <p className="text-[12px] text-gray-500">
                        0days ago . 9968 readers
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-5">
                    <div className="relative w-[7px] h-[7px] bg-blue-800 rounded-full">
                      <div className="absolute w-[9px] h-[9px] bg-blue-500 rounded-full top-0 right-0 mt-[-1px] mr-[-1px] ml-2 animate-ping"></div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[13px] font-semibold">
                        Skyroot Aerospace raises $27.5M
                      </span>
                      <p className="text-[12px] text-gray-500">
                        3days ago . 4568 readers
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-5">
                    <div className="relative w-[7px] h-[7px] bg-blue-800 rounded-full">
                      <div className="absolute w-[9px] h-[9px] bg-blue-500 rounded-full top-0 right-0 mt-[-1px] mr-[-1px] ml-2 animate-ping"></div>
                    </div>
                    <div className="space-y-1">
                      <span className="text-[13px] font-semibold">
                        Skyroot Aerospace raises $27.5M
                      </span>
                      <p className="text-[12px] text-gray-500">
                        3days ago . 4568 readers
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center mt-5 text-gray-500 hover:text-gray-900 cursor-pointer font-semibold">
                  <span className="text-sm">Show more</span>
                  <i className="ri-arrow-down-s-line"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default LinkedInHome;
