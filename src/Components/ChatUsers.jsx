import React from 'react'

const ChatUsers = ({ activeUser, setActiveUser, id }) => {

    return (
        <div onClick={() => { setActiveUser(id) }} className={`flex items-center space-x-3 px-4 py-3 lg:px-4 lg:py-3 md:px-2 md:py-2 border-b border-gray-400 cursor-pointer transition-all duration-300 ${activeUser ? "bg-gradient-to-l from-[#6c66ff] via-[#3E58A9] to-[#3E58A9] text-white" : "bg-[#dfe5ff] text-black"}`}>
            <img src="https://w0.peakpx.com/wallpaper/152/193/HD-wallpaper-jiraiya-sensei-aesthetic-anime-legend-manga-naruto-sky-uzumaki.jpg" alt="users image" className='w-16 h-16 lg:w-16 lg:h-16 md:w-14 md:h-14 p-[1px] object-cover rounded-full border-2 border-emerald-400' />
            <div>
                <h3 className='lg:text-[17px] md:text-[15px] font-semibold'>Jiraya Senju</h3>
                <p className={`lg:text-sm md:text-xs ${activeUser ? "text-white" : "text-gray-700"}`}>Heyy, Tsunade dateing...</p>
            </div>
            <span className={`ml-auto lg:text-xs md:text-[10px] ${activeUser ? "text-white" : "text-gray-600"}`}>08:00</span>
        </div>
    )
}

export default ChatUsers;