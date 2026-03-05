import React, { useContext, useState } from 'react';
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { auth, db } from '../firebase/index';
import { AuthContext } from '../context/AuthContext';
import ChatUsers from './ChatUsers';
import { formatTime } from '../utils/formateDate';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';

const ChatList = ({ setIsChatOpen }) => {
  const { currentUser } = useContext(AuthContext);

  const [activeUser, setActiveUser] = useState(null);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = async () => {
    if (!userName.trim()) return;

    const data = query(collection(db, "users"), where("displayName", "==", userName));

    try {
      const querySnapshot = await getDocs(data);

      if (querySnapshot.empty) {
        setError(true);
        return;
      }

      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        setUser(doc.data());
      });

    } catch (error) {
      console.error("Error in search:", error);
      setError(true);
    }
  };

  const handleKey = (event) => {
    if (event.key.toLowerCase() === 'enter') {
      console.log("Enter key pressed!");
      handleSearch();
    }
  };

  const handleSelect = async () => {
    const combinedId = currentUser.uid > user.uid
      ? currentUser.uid + user.uid
      : user.uid + currentUser.uid;

    try {
      const chatRef = doc(db, "chats", combinedId);
      const chatSnap = await getDoc(chatRef);

      if (!chatSnap.exists()) {
        await setDoc(chatRef, { messages: [] });
      }

      const currentUserChatRef = doc(db, "userChats", currentUser.uid);
      const selectedUserChatRef = doc(db, "userChats", user.uid);

      await updateDoc(currentUserChatRef, {
        [combinedId + ".userInfo"]: {
          uid: user.uid,
          displayName: user.displayName,
          photoURL: user?.photoURL ?? "https://static.vecteezy.com/system/resources/thumbnails/037/468/797/small/user-icon-illustration-for-graphic-design-logo-web-site-social-media-mobile-app-ui-png.png",
        },
        [combinedId + ".date"]: serverTimestamp()
      });

      await updateDoc(selectedUserChatRef, {
        [combinedId + ".userInfo"]: {
          uid: currentUser.uid,
          displayName: currentUser.displayName,
          photoURL: currentUser?.photoURL ?? "https://static.vecteezy.com/system/resources/thumbnails/037/468/797/small/user-icon-illustration-for-graphic-design-logo-web-site-social-media-mobile-app-ui-png.png",
        },
        [combinedId + ".date"]: serverTimestamp()
      });

    } catch (error) {
      console.error("Error in handleSelect:", error);
    }
    setActiveUser(true);
    setUser(null);
    setUserName("");
    setIsChatOpen(true);
  };

  return (
    <div className='xs:w-full flex flex-col h-screen'>
      <div className='bg-gray-900 text-white p-4 space-y-4 shadow-md'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>ChatHub</h1>
          <div className='flex items-center space-x-2 relative'>
            <button className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M12 18q2.075 0 3.538-1.462Q17 15.075 17 13q0-2.075-1.462-3.538Q14.075 8 12 8Q9.925 8 8.463 9.462Q7 10.925 7 13q0 2.075 1.463 3.538Q9.925 18 12 18Zm0-2q-1.25 0-2.125-.875T9 13q0-1.25.875-2.125T12 10q1.25 0 2.125.875T15 13q0 1.25-.875 2.125T12 16Zm6-6q.425 0 .712-.288Q19 9.425 19 9t-.288-.713Q18.425 8 18 8t-.712.287Q17 8.575 17 9t.288.712Q17.575 10 18 10ZM4 21q-.825 0-1.412-.587Q2 19.825 2 19V7q0-.825.588-1.412Q3.175 5 4 5h3.15L8.7 3.325q.15-.15.337-.238Q9.225 3 9.425 3h5.15q.2 0 .388.087q.187.088.337.238L16.85 5H20q.825 0 1.413.588Q22 6.175 22 7v12q0 .825-.587 1.413Q20.825 21 20 21Z"></path></svg></button>
            <button onClick={() => setIsOpen(!isOpen)} className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24"><path fill="currentColor" d="M12 16a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2m0-6a2 2 0 0 1 2 2a2 2 0 0 1-2 2a2 2 0 0 1-2-2a2 2 0 0 1 2-2"></path></svg></button>
            {isOpen && (
              <div className={`absolute top-10 right-0 bg-gray-900 text-white p-4 space-y-4 shadow-md ${isOpen ? 'block md:hidden' : 'hidden md:block'}`}>
                <Link to="/profile" className='cursor-pointer flex items-center font-semibold' title='Profile'><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" className='text-white w-7 h-8 mr-3'><path fill="currentColor" d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"></path></svg>Profile</Link>
                <button className='cursor-pointer flex items-center font-semibold' title='Logout' onClick={() => signOut(auth)}><svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" className='text-white w-7 h-8 mr-3'><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12q0-2.1.788-3.912t2.137-3.163l1.4 1.4q-1.1 1.1-1.712 2.55T4 12q0 3.35 2.325 5.675T12 20t5.675-2.325T20 12q0-1.675-.612-3.125t-1.713-2.55l1.4-1.4q1.35 1.35 2.138 3.163T22 12q0 2.075-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m-1-9V2h2v11z"></path></svg>Logout</button>
              </div>
            )}
          </div>
        </div>
        <div className='flex items-center space-x-2'>
          <input type="text" placeholder='Search' className='w-full px-4 py-2 bg-gray-800 rounded-full outline-none border border-gray-800 focus:ring-1' onKeyDown={handleKey} onChange={(e) => { setUserName(e.target.value); setActiveUser }} value={userName} />
          <p className='bg-blue-400 w-10 h-9 text-center rounded-full cursor-pointer pt-1'>+</p>
        </div>
      </div>
      <div className='flex-grow overflow-y-auto scrollbar'>
        {
        user && (
        <div onClick={handleSelect} className={`flex items-center space-x-3 px-4 py-3 lg:px-4 lg:py-3 md:px-2 md:py-2 border-b border-gray-400 cursor-pointer transition-all duration-300 ${activeUser ? "bg-gradient-to-l from-[#6c66ff] via-[#3E58A9] to-[#3E58A9] text-white" : "bg-[#dfe5ff] text-black"}`}>
          <img src={user.photoURL} alt="users image" className='w-16 h-16 lg:w-16 lg:h-16 md:w-14 md:h-14 p-[1px] object-cover rounded-full border-2 border-emerald-400' />
          <div>
            <h3 className='xs:text-[20px] lg:text-[22px] md:text-[15px] font-semibold'>{user.displayName}</h3>
            <p className={`lg:text-sm md:text-xs ${activeUser ? "text-white" : "text-gray-700"}`}>No messages yet</p>
          </div>
          <span className={`ml-auto lg:text-xs md:text-[10px] ${activeUser ? "text-white" : "text-gray-600"}`}>{formatTime(user.date)}</span>
        </div>
        )
        }
        <ChatUsers setIsChatOpen={setIsChatOpen} />
      </div>
    </div >
  )
}

export default ChatList;