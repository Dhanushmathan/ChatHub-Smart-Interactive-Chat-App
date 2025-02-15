import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { formatTime } from '../utils/formateDate';

const ChatMessages = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }, [message]);

  return (
    <div className='flex-1 my-5 px-4 space-y-2' ref={ref}>
      <div className={`flex ${message.senderId === currentUser.uid ? 'justify-end' : 'justify-start'} items-center space-x-2 my-2`} ref={ref}>

        {message.senderId === currentUser.uid ? (
          <>
            <span className="text-xs mt-8 text-gray-400 font-bold">{formatTime(message.date)}</span>
            <div className="p-2 mt-8 max-w-xs bg-gradient-to-l from-[#6c63ff] via-[#6c63ff] to-[#3E58A9] text-white shadow-lg rounded-s-full rounded-br-full">
              <p>{message.text}</p>
            </div>
            <img
              src={currentUser.photoURL}
              alt="users"
              className="w-12 h-12 p-[1px] object-cover rounded-full border-2 cursor-pointer border-emerald-400"
            />
          </>
        ) : (
          <>
            <img
              src={data.user.photoURL}
              alt="users"
              className="w-12 h-12 p-[1px] object-cover cursor-pointer rounded-full border-2 border-emerald-400"
            />
            <div className="p-2 mt-8 max-w-xs bg-white text-black shadow-lg rounded-e-full rounded-bl-full">
              <p>{message.text}</p>
            </div>
            <span className="text-xs mt-8 text-gray-400 font-bold">{formatTime(message.date)}</span>
          </>
        )}

      </div>
    </div>
  )
}

export default ChatMessages;