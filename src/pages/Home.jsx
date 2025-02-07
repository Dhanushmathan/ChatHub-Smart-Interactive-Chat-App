import React from 'react'
import Sidebar from '../Components/Sidebar';
import ChatList from '../Components/ChatList';
import ChatHeader from '../Components/ChatHeader';
import ChatMessages from '../Components/ChatMessages';
import Input from '../Components/Input';

const Home = () => {
    return (
        <div className='flex overflow-hidden'>
            <Sidebar />
            <ChatList />
            <div className='flex-1 bg-[#d3e7ff] flex flex-col xs:hidden md:block'>
                <ChatHeader />
                <div className='h-[calc(100vh-125px)] overflow-y-auto scrollbar'>
                    <ChatMessages />
                </div>
                <Input />
            </div>
        </div>
    )
}

export default Home;