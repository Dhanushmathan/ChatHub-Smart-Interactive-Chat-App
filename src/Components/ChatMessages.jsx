import React, { useContext, useEffect, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ChatContext } from '../context/ChatContext';
import { formatDate } from '../utils/formateDate';

const ChatMessages = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" })
  }, [message]);

  return (
    <div className='flex flex-col my-2 px-1.5' ref={ref}>
      <span className="text-xs text-gray-400 font-bold text-center">{formatDate(message.date)}</span>
      <div className={`flex ${message.senderId === currentUser.uid ? 'justify-end' : 'justify-start'} gap-2`} ref={ref}>

        {message.senderId === currentUser.uid ? (
          <>
            {/* <span className="text-xs mt-8 text-gray-400 font-bold">{formatDate(message.date)}</span> */}
            <div className="p-2 mt-5 max-w-[84%] break-words bg-gradient-to-l from-[#6c63ff] via-[#6c63ff] to-[#3E58A9] text-white shadow-lg rounded-tl-[0.4rem] rounded-bl-[0.4rem] rounded-br-[1rem]">
              <p className="">{message.text}</p>
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
            <div className="p-2 mt-5 max-w-[84%] break-words bg-white text-black shadow-lg rounded-bl-[1rem] rounded-br-[0.4rem] rounded-tr-[0.4rem]">
              <p className="">{message.text}</p>
            </div>
            {/* <span className="text-xs mt-8 text-gray-400 font-bold">{formatDate(message.date)}</span> */}
          </>
        )}
      </div>
    </div>
  )
}

export default ChatMessages;