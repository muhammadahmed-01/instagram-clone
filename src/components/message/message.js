import "./message.css";
import { format } from "timeago.js";
import {useEffect, useState} from "react";
import axios from "../../axiosInstance";

export default function Message({ message, own }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_IMAGE_FOLDER;

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios("/api/profile/user?userId=" + message.sender);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={
            user?.profilePic
              ? PF + user.profilePic
              : PF + "/noPic.jpg"
          }
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}