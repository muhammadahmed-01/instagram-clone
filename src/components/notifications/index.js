import {useEffect, useState} from 'react';
import axios from "../../utils/axiosInstance";
import Avatar from "@mui/material/Avatar";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const currentUser = JSON.parse(localStorage.getItem("userData"));
  const [hoverStates, setHoverStates] = useState(
    Array(notifications.length).fill(false));


  const handleMouseEnter = (read, index) => {
    if (read === false) {
      const newHoverStates = [...hoverStates];
      newHoverStates[index] = true;
      setHoverStates(newHoverStates);
    }
  };

  const handleMouseLeave = (index) => {
    const newHoverStates = [...hoverStates];
    newHoverStates[index] = false;
    setHoverStates(newHoverStates);
  };

  const getNotificationStyle = (notification, index) => {
    return {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: "2vh",
      marginBottom: "5vh",
      width: "27vw",
      padding: "2vh 2vw",
      background: notification.read ? '#fff' : '#f2f2f2',
      fontWeight: notification.read ? 'normal' : 'bold',
      border: hoverStates[index] ? '1px solid lightgrey' : 'none',
    };
  };

  const configData = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }

  const PF = process.env.REACT_APP_PUBLIC_IMAGE_FOLDER;

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await axios.get(`/api/notifications/${currentUser.id}`,
        configData);
      setNotifications(response.data);
    };

    fetchNotifications();
  }, []);

  const handleNotificationClick = async (notificationId, index) => {
    try {
      await axios.put(`/api/notifications/${notificationId}`, {}, configData);

      // turn off hover for the notification
      const newHoverStates = [...hoverStates];
      newHoverStates[index] = false;
      setHoverStates(newHoverStates);

      setNotifications(
        notifications.map((notification) => {
          if (notification._id === notificationId) {
            return {...notification, read: true};
          }
          return notification;
        })
      );
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Notifications</h1>
      {notifications.map((notification, index) => (
        <div
          key={notification._id}
          onClick={() => handleNotificationClick(notification._id, index)}
          style={getNotificationStyle(notification, index)}
          onMouseEnter={() => handleMouseEnter(notification.read, index)}
          onMouseLeave={() => handleMouseLeave(index)}>
          <Avatar
            src={notification.sourceUser?.profilePic ?
              PF + notification.sourceUser.profilePic :
              PF + "noPic.jpg"
            } alt={notification.sourceUser.name}
          />
          <p>{notification.sourceUser.name} {notification.type} your
            post{' '}</p>
          <img src={notification.post.image} width={"44"} height={"44"}
               alt="Post"/>
        </div>
      ))}
    </div>
  );
};

export default Notifications;
