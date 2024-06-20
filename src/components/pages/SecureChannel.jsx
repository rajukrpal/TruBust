




import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { GetGroupChat, GetGroupChatList, sendGroupChat } from "../../dataApi/Data";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import DuoIcon from "@mui/icons-material/Duo";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Button, IconButton } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";

const SecureChannel = () => {
  const [chatOneChatRow, setChatOneChatRow] = useState('');
  const [groupList, setGroupList] = useState([]);
  const [open, setOpen] = useState(true);
  const [chatData, setChatData] = useState({
    message: "",
    image: null,
    companyID: "",
  });
  const [chatLogo, setChatLogo] = useState("");
  const [companyName,setCompanyName] = useState("")
  const [chatDataList, setChatDataList] = useState([]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatDataList]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchData = await GetGroupChatList();
      setGroupList(fetchData.data.data);
    };
    fetchData();
  }, []);

  const handleOpenChat = async (chat) => {
    setChatOneChatRow(chat);
    setCompanyName(chat.company_name)
    setChatLogo(chat.company_logo);
    const companyID = chat.companyID;
    const Data = await GetGroupChat(companyID);
    setChatDataList(Data.data.data);
    setOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setChatData((prevChatData) => ({
          ...prevChatData,
          image: event.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const sendMessage = async () => {
    const newMessage = {
      ...chatData,
      companyID: chatOneChatRow.companyID,
    };
    await sendGroupChat(newMessage);

    const sentMessage = {
      type: "Admin",
      message: newMessage.message,
      image: newMessage.image,
      created_at: new Date().toISOString(),
    };
    setChatDataList((prevChatDataList) => [...prevChatDataList, sentMessage]);

    setChatData({
      message: "",
      image: null,
      companyID: chatOneChatRow.companyID,
    });
  };

  return (
    <div className="w-full">
 <Box
          sx={{
            width: "100%",
            boxShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
            borderRadius: "10px",
          }}
          className=""
        >
      <div className="lg:grid grid-cols-12 lg:h-[84vh] ">
        <div className="col-span-3 border border-r-gray-300 ">
          <div className="p-3 ">
            <div className="flex items-center rounded-lg">
              <SearchIcon />
              <input
                className="w-full p-2 rounded-md border border-none outline outline-none"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>
          <hr />
          <div className="p-3">
            <h4 className="font-semibold text-[#4197DE]">Chats</h4>
            {groupList.map((chat) => (
              <div
                onClick={() => handleOpenChat(chat)}
                key={chat.id}
                className="flex items-center gap-4 py-2 mb-3 cursor-pointer rounded-lg"
              >
                <div>
                  <img
                    className="w-10 h-10 rounded-full"
                    src={chat.company_logo}
                    alt=""
                  />
                </div>
                <div>{chat.company_name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-9 ">
          {open ? (
            <div className="p-3">
              <div className="flex justify-center items-center">
                <h2 className="lg:font-medium text-white lg:px-5 px-2 lg:py-3 py-1 lg:text-xl cursor-pointer bg-[#7CB9EC] rounded-3xl lg:mt-10 mt-3">
                  Start Conversation
                </h2>
              </div>
            </div>
          ) : (
            <div className="">
              <div className="flex justify-between items-center border border-b-gray-300 py-3 px-2">
                <div className="flex items-center gap-3">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={chatLogo}
                    alt=""
                  />
                  <h2>{companyName}</h2>
                </div>

                <div className="space-x-4">
                  <LocalPhoneIcon />
                  <DuoIcon />
                  <SearchIcon />
                  <MoreVertIcon />
                </div>
              </div>

              <div className="py-2 h-[65vh] overflow-y-auto custom-scrollbar">
                <div className="p-2 ">
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
                                src="/navbar/user.png"
                                alt="A"
                              />
                            </div>
                            <div className="lg:w-[50%]">
                              <h6 className="text-sm text-start">{chat.username}</h6>
                              <h1
                                className={
                                  chat.type === "User"
                                    ? "w-fit px-4 py-2 shadow-md rounded-r-md rounded-b-md bg-[#6f88db9d] mb-1"
                                    : "w-fit px-4 py-2 shadow-md rounded-r-md rounded-b-md bg-[#78db6f9d] mb-1"
                                }
                              >
                                {chat.message}
                                {chat.image && <img className="w-44" src={chat.image} alt="" />}
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
                              <h6 className="text-sm text-end">{chat.username}</h6>
                              <h1 className=" text-end px-4 py-2 shadow-md rounded-l-md rounded-b-md bg-[#75e299b9] mb-1">
                                {chat.message}
                                {chat.image && <img className="w-44 object-contain" src={chat.image} alt="" />}
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
                                src="/navbar/user.png"
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
                <div ref={endRef}></div>
              </div>

              <div className="flex items-center justify-between pt-5 px-4 pb-6">
                <div className="flex items-center gap-2 flex-1">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="p-2 rounded-lg w-full"
                    value={chatData.message}
                    onChange={(e) => setChatData({ ...chatData, message: e.target.value })}
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
                  variant="contained"
                  color="primary"
                  className="w-20"
                  onClick={sendMessage}
                >
                  Send
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      </Box>
    </div>
  );
};

export default SecureChannel;

