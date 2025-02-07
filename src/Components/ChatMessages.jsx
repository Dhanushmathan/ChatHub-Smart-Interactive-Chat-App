import React from 'react'

const ChatMessages = () => {
  return (
    <div className='flex-1 mt-6 space-y-6 overflow-y-auto'>
      <div className='flex items-center space-x-2'>
        <img src="https://w0.peakpx.com/wallpaper/152/193/HD-wallpaper-jiraiya-sensei-aesthetic-anime-legend-manga-naruto-sky-uzumaki.jpg" alt="users" className='w-12 h-12 p-[1px] object-cover rounded-full border-2 border-emerald-400' />
        <div className='p-2 bg-red-600 shadow-lg rounded-e-full rounded-es-full'>
          <p>Hey, Tsunade dateing...</p>
        </div>
        <span></span>
      </div>
    </div>
  )
}

export default ChatMessages;