import React from 'react'

const ChatHeader = () => {
    return (
        <div className='flex items-center justify-between bg-gradient-to-l from-[#6c63ff] via-[#3E58A9] to-[#3E58A9] px-4 py-3 text-white'>
            <div className='flex items-center space-x-3'>
                <button className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20"><path fill="currentColor" d="m5.83 9l5.58-5.58L10 2l-8 8l8 8l1.41-1.41L5.83 11H18V9z"></path></svg></button>
                <img src="https://w0.peakpx.com/wallpaper/152/193/HD-wallpaper-jiraiya-sensei-aesthetic-anime-legend-manga-naruto-sky-uzumaki.jpg" alt="users" className='w-12 h-12 p-[1px] object-cover rounded-full border-2 border-emerald-400' />
                <div>
                    <h2 className='text-base'>Jiraya Senju</h2>
                    <p className='text-sm text-gray-700'>Active now</p>
                </div>
            </div>
            <div className='space-x-4'>
                <button className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h12q.825 0 1.413.588T18 6v4.5l3.15-3.15q.25-.25.55-.125t.3.475v8.6q0 .35-.3.475t-.55-.125L18 13.5V18q0 .825-.587 1.413T16 20z"></path></svg></button>
                <button className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M19.95 21q-3.125 0-6.187-1.35T8.2 15.8t-3.85-5.55T3 4.05V3h5.9l.925 5.025l-2.85 2.875q.55.975 1.225 1.85t1.45 1.625q.725.725 1.588 1.388T13.1 17l2.9-2.9l5 1.025V21z"></path></svg></button>
            </div>
        </div>
    )
}

export default ChatHeader;