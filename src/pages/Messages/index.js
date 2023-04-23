import "./Messages.css";
import Conversation from "../../components/conversation/conversation";
import Message from "../../components/message/message";
import { useContext, useEffect, useRef, useState } from "react";
import {UserContext} from "../../UserContext";
import axios from "../../axiosInstance";
import { io } from "socket.io-client";
import Sidebar from "../../Sidebar";
import React from "react";
import {createTheme} from "@mui/material/styles";
import {ThemeProvider} from "@mui/material";
import Container from "@mui/material/Container";
const theme = createTheme()

export default function Index() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  // const [user, setUser] = useContext(UserContext);
  const user = JSON.parse(localStorage.getItem("userData"));
  const scrollRef = useRef();

  // console.log("user = ", user);

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
    currentChat?.members.includes(arrivalMessage.sender) &&
    setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user.id);
    socket.current.on("getUsers", (users) => {
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("/api/conversations/" + user.id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user.id]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("/api/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user.id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user.id
    );

    socket.current.emit("sendMessage", {
      senderId: user.id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ThemeProvider theme={theme}>
      <Sidebar sx={{float: "left"}}/>
      <Container sx={{float: "right"}}>
        <div className="messenger">
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              {/*<input placeholder="Search for friends" className="chatMenuInput" />*/}
              {conversations.map((c, index) => (
                <div key={index} onClick={() => setCurrentChat(c)}>
                  <Conversation conversation={c} currentUser={user} />
                </div>
              ))}
            </div>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="chatBoxTop">
                    {messages.map((m, index) => (
                      <div key={index} ref={scrollRef}>
                        <Message message={m} own={m.sender === user.id} />
                      </div>
                    ))}
                  </div>
                  <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit}>
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
              )}
            </div>
          </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}