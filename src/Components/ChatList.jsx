import React, { useState } from 'react'
import Header from './Header';
import ChatUsers from './ChatUsers';

const ChatList = () => {

  const [activeUser, setActiveUser] = useState(null);

  return (
    <div className='xs:w-full md:w-1/3 bg-[#CBD2F4] flex flex-col h-screen'>
      <Header />
      <div className='flex-grow overflow-y-auto scrollbar'>
        {[1, 2, 3, 4, 5, 6, 7].map((id) => (
          <ChatUsers key={id} id={id} activeUser={activeUser === id} setActiveUser={setActiveUser} />
        ))}
      </div>
    </div>
  )
}

export default ChatList;