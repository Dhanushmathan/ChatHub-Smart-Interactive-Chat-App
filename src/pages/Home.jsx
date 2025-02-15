import React, { useContext, useEffect, useState } from 'react'
import Sidebar from '../Components/Sidebar';
import ChatList from '../Components/ChatList';
import ChatHeader from '../Components/ChatHeader';
import ChatMessages from '../Components/ChatMessages';
import Input from '../Components/Input';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { ChatContext } from '../context/ChatContext';

const Home = () => {

    const [messages, setMessages] = useState([]);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const { data } = useContext(ChatContext);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            doc.exists() && setMessages(doc.data().messages)
        })
        return () => { unSub() }
    }, [data.chatId])

    return (
        <div className='flex overflow-hidden'>
            <Sidebar />
            <div className={`w-full md:w-1/3 ${isChatOpen ? "hidden md:block" : ""}`}>
                <ChatList setIsChatOpen={setIsChatOpen} />
            </div>
            <div className={`flex-1 bg-[#d3e7ff] flex flex-col ${isChatOpen ? "" : "hidden md:block"}`}>
                <ChatHeader setIsChatOpen={setIsChatOpen} />
                <div className='h-[calc(100vh-125px)] overflow-y-auto scrollbar'>
                    {messages.map((m) => (
                        <ChatMessages message={m} key={m.id} />
                    ))}
                </div>
                <Input />
            </div>
        </div>
    )
}

export default Home;