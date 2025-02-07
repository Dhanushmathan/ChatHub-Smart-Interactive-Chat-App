import React from 'react'
import Sidebar from '../Components/Sidebar';
import ChatList from '../Components/ChatList';
import ChatHeader from '../Components/ChatHeader';
import ChatMessages from '../Components/ChatMessages';

const Home = () => {
    return (
        <div className='flex'>
            <Sidebar />
            <ChatList />
            <div className='flex-1 bg-white flex flex-col'>
                <ChatHeader />
                <ChatMessages />
            </div>
        </div>
    )
}

export default Home;