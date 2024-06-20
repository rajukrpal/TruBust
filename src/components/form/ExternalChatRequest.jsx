import React, { useEffect, useRef, useState } from "react";
import { Box, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

import {
  GetExternalReplayApi,
  PostExternalChatReplayApi,
} from "../../dataApi/Data";
import ExternalRequestView from "../pages/ExternalRequestView";

const ExternalChatRequest = ({ rowData }) => {

  useEffect(() => {}, [rowData]);

  const [showForm, setShowForm] = useState(true);
  const endRef = useRef(null);

  const [chatData, setChatData] = useState({
    userID: rowData.userID,
    companyID: rowData.companyID,
    message: "",
    image: null,
  });

  const [chatDataList, setChatDataList] = useState([]);

  const handalCloseButton = () => {
    setShowForm(false);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  });

  const sendMessage = async () => {
    // Post the message
    await PostExternalChatReplayApi(chatData);
    

    // Update the chatDataList state with the sent message
    const sentMessage = {
      type: "Admin",
      companyID: chatData.companyID,
      userID: chatData.userID,
      message: chatData.message,
      image: chatData.image, 
      created_at: new Date().toISOString(), 
    };
    setChatDataList([...chatDataList, sentMessage]);

    // Clear the input fields after sending the message
    setChatData({
      ...chatData,
      externalrequestID: "",
      userID: "",
      companyID: "",
      message: "",
      image: null,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setChatData({
          ...chatData,
          image: event.target.result,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const companyID = rowData.companyID;
    const requestID = rowData.requestID;
    const userID = rowData.userID;


    const chatsData = async () => {
      const chatresult = await GetExternalReplayApi(
        companyID,
        requestID,
        userID
      );
      setChatDataList(chatresult.data.data);
    };
    chatsData();
  }, []);

  useEffect(() => {
    
  }, [chatDataList]);

  return (
    <div>
      {showForm ? (
        <>
         <Box
          sx={{
            width: "100%",
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
          }}
          className=""
        >
          <div className="px-5 rounded-lg">
            <div>
              <div className="flex justify-end py-3">
                <Button
                  onClick={handalCloseButton}
                  sx={{
                    background: "gray",
                    borderRadius: "50%",
                    height: "30px",
                    width: "30px",
                    padding: 0,
                    minWidth: 0,
                  }}
                >
                  <CloseIcon sx={{ fontSize: "20px", color: "black" }} />
                </Button>
              </div>
            </div>

            <div className=" h-[65vh] overflow-y-auto custom-scrollbar">
              {/* user */}
              {chatDataList.map((chat, index) => (
                <div key={index} className="pt-5">
                  <div
                    className={
                      chat.type === "User"
                        ? "justify-start flex gap-4 "
                        : "justify-end flex gap-4 "
                    }
                  >
                    {chat.type === "User" ? (
                      <>
                        <div>
                          <img
                            className="h-10 w-10 rounded-full object-contain"
                            src="../../../public/navbar/user.png"
                            alt="A"
                          />
                        </div>
                        <div className="">
                          <h1
                            className={
                              chat.type === "User"
                                ? "w-fit  px-4 py-2 shadow-md rounded-r-md rounded-b-md bg-[#6f88db9d] mb-1"
                                : "w-fit  px-4 py-2 shadow-md rounded-r-md rounded-b-md bg-[#78db6f9d] mb-1"
                            }
                          >
                            {chat.message}
                            <img src={chat.image} alt="" />
                          </h1>
                          <span className="text-sm flex justify-start">
                            {new Date(chat.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="">
                          <h1 className="w-fit text-end  px-4 py-2 shadow-md rounded-l-md rounded-b-md bg-[#75e299b9] mb-1">
                            {chat.message}
                            <img
                              className=" w-44  object-contain"
                              src={chat.image}
                              alt=""
                            />
                          </h1>
                          <span className="text-sm flex justify-end">
                            {new Date(chat.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                              }
                            )}
                          </span>
                        </div>
                        <div>
                          <img
                            className="h-10 w-10 rounded-full object-contain"
                            src="../../../public/navbar/user.png"
                            alt=""
                          />
                        </div>
                      </>
                    )}
                  </div>
                  <div ref={endRef}></div>
                </div>
              ))}
            </div>
            {/* button */}
            <div className="flex items-center justify-between pt-5 px-4 pb-6">
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  value={chatData.message}
                  onChange={(e) =>
                    setChatData({ ...chatData, message: e.target.value })
                  }
                  placeholder="Type your message..."
                  className="border border-gray-400 p-2 rounded-lg w-full"
                />
                <IconButton>
                  <label htmlFor="image-upload" style={{ cursor: "pointer" }}>
                    <PhotoCameraIcon />
                  </label>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: "none" }}
                  />
                </IconButton>
              </div>
              <Button
                onClick={sendMessage}
                variant="contained"
                color="primary"
                className="w-20"
              >
                Send
              </Button>
            </div>
          </div>
          </Box>
        </>
      ) : (
        <>
          <ExternalRequestView />
        </>
      )}
    </div>
  );
};

export default ExternalChatRequest;
