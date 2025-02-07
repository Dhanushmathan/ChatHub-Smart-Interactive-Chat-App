import React from 'react'

const ChatUsers = ({ activeUser, setActiveUser, id }) => {

    return (
        <div onClick={() => { setActiveUser(id) }} className={`flex items-center space-x-3 px-4 py-3 border-b border-gray-400 cursor-pointer transition-all duration-300 ${activeUser ? "bg-gradient-to-l from-[#A5A7F4] via-[#3E58A9] to-[#3E58A9] text-white" : "bg-[#dfe5ff] text-black"}`}>
            <img src="https://w0.peakpx.com/wallpaper/152/193/HD-wallpaper-jiraiya-sensei-aesthetic-anime-legend-manga-naruto-sky-uzumaki.jpg" alt="users image" className='w-16 h-16 p-[1px] object-cover rounded-full border-2 border-emerald-400' />
            <div>
                <h3 className='text-[17px] font-semibold'>Jiraya Senju</h3>
                <p className={`text-sm ${activeUser ? "text-white" : "text-gray-700"}`}>Heyy, Tsunade dateing...</p>
            </div>
            <span className={`ml-auto text-xs ${activeUser ? "text-white" : "text-gray-600"}`}>08:00</span>
        </div>
    )
}

export default ChatUsers;