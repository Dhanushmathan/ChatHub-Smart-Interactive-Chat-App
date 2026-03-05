import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { formatTime } from "../utils/formateDate";

const ChatUsers = ({ activeUser, setIsChatOpen = () => { } }) => {
    const [chats, setChats] = useState({});
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        if (!currentUser?.uid) return;

        const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
            console.log("Snapshot triggered", doc.data());
            setChats(doc.data() || {});
        });

        return () => unsub();
    }, [currentUser?.uid]);

    const handleSelect = (u) => {
        dispatch({ type: "CHANGE_USER", payload: u });
        setIsChatOpen(true);
    };

    return (
        <>
            {Object.entries(chats)
                .sort((a, b) => (b[1].date || 0) - (a[1].date || 0))
                .map(([key, chat]) => (
                    <div
                        key={key}
                        onClick={() => handleSelect(chat?.userInfo)}
                        className={`flex items-center space-x-3 px-2 py-3 lg:px-4 lg:py-3 md:px-2 md:py-2 border-b border-gray-400 cursor-pointer transition-all duration-300 ${activeUser === chat.userInfo?.uid
                            ? "bg-gradient-to-l from-[#6c66ff] via-[#3E58A9] to-[#3E58A9] text-white"
                            : "bg-[#dfe5ff] text-black"
                            }`}
                    >
                        <img
                            src={chat.userInfo?.photoURL}
                            alt="User"
                            className="w-16 h-16 lg:w-16 lg:h-16 md:w-14 md:h-14 p-[1px] object-cover rounded-full border-2 border-emerald-400"
                        />
                        <div>
                            <h3 className="xs:text-[20px] lg:text-[22px] md:text-[15px] font-semibold">
                                {chat.userInfo?.displayName || "Unknown User"}
                            </h3>
                            <p
                                className={`lg:text-sm md:text-xs ${activeUser === chat.userInfo?.uid ? "text-white" : "text-gray-600 font-medium"
                                    }`}
                            >
                                {chat.lastMessage?.text?.length > 30
                                    ? chat.lastMessage.text.substring(0, 24) + "..."
                                    : chat.lastMessage?.text || "No messages yet"}
                            </p>
                        </div>
                        <span
                            className={`ml-auto text-sm lg:text-xs md:text-[10px] ${activeUser === chat.userInfo?.uid ? "text-white" : "text-gray-600"
                                }`}
                        >
                            {formatTime(chat.date)}
                        </span>
                    </div>
                ))}
        </>
    );
};

export default ChatUsers;