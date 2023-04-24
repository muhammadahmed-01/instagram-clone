import axios from "../../utils/axiosInstance";
import { useEffect, useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_IMAGE_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.id);

    const getUser = async () => {
      try {
        const res = await axios("/api/profile/user?userId=" + friendId);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePic
            ? PF + user.profilePic
            : PF + "/noPic.jpg"
        }
        alt=""
      />
      <span className="conversationName">{user?.email.split("@")[0]}</span>
    </div>
  );
}