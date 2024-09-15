// import React, { useContext, useEffect, useState } from "react";
// import "./Chatbox.css";
// import assets from "../../assets/assets";
// import { AppContext } from "../../context/AppContext";
// import {
//   arrayUnion,
//   doc,
//   getDoc,
//   onSnapshot,
//   updateDoc,
// } from "firebase/firestore";
// import { db } from "../../config/firebase";
// import upload from "../../lib/upload";
// import { toast } from "react-toastify";

// const Chatbox = () => {
//   const {
//     userData,
//     messagesId,
//     chatUser,
//     messages,
//     setMessages,
//     chatVisible,
//     setChatVisible,
//   } = useContext(AppContext);
//   const [input, setInput] = useState("");

//   const sendMessage = async () => {
//     try {
//       if (input && messagesId) {
//         await updateDoc(doc(db, "messages", messagesId), {
//           messages: arrayUnion({
//             sId: userData.id,
//             text: input,
//             createdAt: new Date(),
//           }),
//         });
//         const userIDs = [chatUser.rId, userData.id];
//         userIDs.forEach(async (id) => {
//           const userChatsRef = doc(db, "chats", id);
//           const userChatsSnapshot = await getDoc(userChatsRef);
//           if (userChatsSnapshot.exists()) {
//             const userChatData = userChatsSnapshot.data();
//             const chatIndex = userChatData.chatsData.findIndex(
//               (c) => c.messageId === messagesId
//             );
//             userChatData.chatsData[chatIndex].lastMessage = input.slice(0, 30);
//             userChatData.chatsData[chatIndex].updatedAt = Date.now();
//             if (userChatData.chatsData[chatIndex].rId === userData.id) {
//               userChatData.chatsData[chatIndex].messageSeen = false;
//             }
//             await updateDoc(userChatsRef, {
//               chatsData: userChatData.chatsData,
//             });
//           }
//         });
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//     setInput("");
//   };

//   const sendImage = async (e) => {
//     try {
//       const fileUrl = await upload(e.target.files[0]);
//       if (fileUrl && messagesId) {
//         await updateDoc(doc(db, "messages", messagesId), {
//           messages: arrayUnion({
//             sId: userData.id,
//             image: fileUrl,
//             createdAt: new Date(),
//           }),
//         });
//         const userIDs = [chatUser.rId, userData.id];
//         userIDs.forEach(async (id) => {
//           const userChatsRef = doc(db, "chats", id);
//           const userChatsSnapshot = await getDoc(userChatsRef);
//           if (userChatsSnapshot.exists()) {
//             const userChatData = userChatsSnapshot.data();
//             const chatIndex = userChatData.chatsData.findIndex(
//               (c) => c.messageId === messagesId
//             );
//             userChatData.chatsData[chatIndex].lastMessage = "Image";
//             userChatData.chatsData[chatIndex].updatedAt = Date.now();
//             if (userChatData.chatsData[chatIndex].rId === userData.id) {
//               userChatData.chatsData[chatIndex].messageSeen = false;
//             }
//             await updateDoc(userChatsRef, {
//               chatsData: userChatData.chatsData,
//             });
//           }
//         });
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const convertTimestamp = (timestamp) => {
//     let date = timestamp.toDate();
//     const hour = date.getHours();
//     const minute = date.getMinutes();
//     if (hour > 12) {
//       return hour - 12 + ":" + minute + "PM";
//     } else {
//       return hour + ":" + minute + "AM";
//     }
//   };

//   useEffect(() => {
//     if (messagesId) {
//       const unSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
//         setMessages(res.data().messages.reverse());
//       });
//       return () => {
//         unSub();
//       };
//     }
//   }, [messagesId]);

//   return chatUser ? (
//     <section className={`chat-box ${chatVisible ? "" : "hidden"}`}>
//       <div className="chat-user">
//         <img src={chatUser.userData.avatar} alt="" />
//         <p>
//           {chatUser.userData.name}
//           {Date.now() - chatUser.userData.lastSeen <= 70000 ? (
//             <img src={assets.green_dot} className="dot" alt="" />
//           ) : null}{" "}
//         </p>
//         <img src={assets.help_icon} className="help" alt="help_icon" />
//         <img
//           onClick={() => setChatVisible(false)}
//           src={assets.arrow_icon}
//           className="arrow"
//           alt="arrow_icon"
//         />
//       </div>

//       <div className="chat-msg">
//         {messages.map((msg, index) => (
//           <div className={msg.sId === userData.id ? "s-msg" : "r-msg"}>
//             {msg["image"] ? (
//               <img className="msg-img" src={msg.image} alt="msg-img" />
//             ) : (
//               <p className="msg">{msg.text}</p>
//             )}
//             <div>
//               <img
//                 src={
//                   msg.sId === userData.id
//                     ? userData.avatar
//                     : chatUser.userData.avatar
//                 }
//                 alt="img"
//               />
//               <p>{convertTimestamp(msg.createdAt)}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="chat-input">
//         <input
//           onChange={(e) => setInput(e.target.value)}
//           value={input}
//           type="text"
//           placeholder="send a message"
//         />
//         <input
//           onChange={sendImage}
//           id="image"
//           type="file"
//           accept="image/*"
//           hidden
//         />
//         <label htmlFor="image">
//           <img src={assets.gallery_icon} alt="gallery_icon" />
//         </label>
//         <img onClick={sendMessage} src={assets.send_button} alt="send" />
//       </div>
//     </section>
//   ) : (
//     <div className={`chat-welcome ${chatVisible ? "" : "hidden"}`}>
//       <img src={assets.logo8} alt="logo8" />
//       <p>Chat anytime, Anywhere!</p>
//     </div>
//   );
// };

// export default Chatbox;
import React, { useContext, useEffect, useState } from "react";
import "./Chatbox.css";
import assets from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import upload from "../../lib/upload";
import { toast } from "react-toastify";

const Chatbox = () => {
  const {
    userData,
    messagesId,
    chatUser,
    messages,
    setMessages,
    chatVisible,
    setChatVisible,
  } = useContext(AppContext);

  const [input, setInput] = useState("");

  const updateChatsData = async (messageId, newLastMessage, newUpdatedAt) => {
    try {
      const userIDs = [chatUser.rId, userData.id];
      await Promise.all(userIDs.map(async (id) => {
        const userChatsRef = doc(db, "chats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);
        if (userChatsSnapshot.exists()) {
          const userChatData = userChatsSnapshot.data();
          const chatIndex = userChatData.chatsData.findIndex(
            (c) => c.messageId === messageId
          );
          if (chatIndex !== -1) {
            userChatData.chatsData[chatIndex].lastMessage = newLastMessage;
            userChatData.chatsData[chatIndex].updatedAt = newUpdatedAt;
            if (userChatData.chatsData[chatIndex].rId === userData.id) {
              userChatData.chatsData[chatIndex].messageSeen = false;
            }
            await updateDoc(userChatsRef, {
              chatsData: userChatData.chatsData,
            });
          }
        }
      }));
    } catch (error) {
      toast.error(`Error updating chat data: ${error.message}`);
    }
  };

  const sendMessage = async () => {
    if (!input || !messagesId) return;

    try {
      await updateDoc(doc(db, "messages", messagesId), {
        messages: arrayUnion({
          sId: userData.id,
          text: input,
          createdAt: new Date(),
        }),
      });
      await updateChatsData(messagesId, input.slice(0, 30), Date.now());
    } catch (error) {
      toast.error(`Error sending message: ${error.message}`);
    }

    setInput("");
  };

  const sendImage = async (e) => {
    try {
      const fileUrl = await upload(e.target.files[0]);
      if (fileUrl && messagesId) {
        await updateDoc(doc(db, "messages", messagesId), {
          messages: arrayUnion({
            sId: userData.id,
            image: fileUrl,
            createdAt: new Date(),
          }),
        });
        await updateChatsData(messagesId, "Image", Date.now());
      }
    } catch (error) {
      toast.error(`Error sending image: ${error.message}`);
    }
  };

  const convertTimestamp = (timestamp) => {
    const date = timestamp.toDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const period = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12; // Convert 0 to 12 for 12 AM/PM
    const formattedMinute = minute.toString().padStart(2, '0'); // Pad minutes to ensure two digits

    return `${formattedHour}:${formattedMinute} ${period}`;
  };

  useEffect(() => {
    if (messagesId) {
      const unSub = onSnapshot(doc(db, "messages", messagesId), (res) => {
        setMessages(res.data().messages.reverse());
      });

      return () => {
        unSub();
      };
    }
  }, [messagesId, setMessages]);

  return chatUser ? (
    <section className={`chat-box ${chatVisible ? "" : "hidden"}`}>
      <div className="chat-user">
        <img src={chatUser.userData.avatar} alt="User Avatar" />
        <p>
          {chatUser.userData.name}
          {Date.now() - chatUser.userData.lastSeen <= 70000 && (
            <img src={assets.green_dot} className="dot" alt="Online Indicator" />
          )}
        </p>
        <img src={assets.help_icon} className="help" alt="Help Icon" />
        <img
          onClick={() => setChatVisible(false)}
          src={assets.arrow_icon}
          className="arrow"
          alt="Close Chat"
        />
      </div>

      <div className="chat-msg">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sId === userData.id ? "s-msg" : "r-msg"}>
            {msg.image ? (
              <img className="msg-img" src={msg.image} alt="Message" />
            ) : (
              <p className="msg">{msg.text}</p>
            )}
            <div>
              <img
                src={
                  msg.sId === userData.id
                    ? userData.avatar
                    : chatUser.userData.avatar
                }
                alt="Avatar"
              />
              <p>{convertTimestamp(msg.createdAt)}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          placeholder="Send a message"
        />
        <input
          onChange={sendImage}
          id="image"
          type="file"
          accept="image/*"
          hidden
        />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="Gallery Icon" />
        </label>
        <img onClick={sendMessage} src={assets.send_button} alt="Send" />
      </div>
    </section>
  ) : (
    <div className={`chat-welcome ${chatVisible ? "" : "hidden"}`}>
      <img src={assets.logo8} alt="Logo" />
      <p>Chat anytime, anywhere!</p>
    </div>
  );
};

export default Chatbox;
