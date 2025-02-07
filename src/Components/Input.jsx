import React from 'react'

const Input = () => {
  return (
    <div className='px-1 flex items-center space-x-2 bg-white py-1'>
      <button className='cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 2.75a9.25 9.25 0 1 0 0 18.5a9.25 9.25 0 0 0 0-18.5M1.25 12C1.25 6.063 6.063 1.25 12 1.25S22.75 6.063 22.75 12S17.937 22.75 12 22.75S1.25 17.937 1.25 12m7.147 3.553a.75.75 0 0 1 1.05-.155c.728.54 1.607.852 2.553.852s1.825-.313 2.553-.852a.75.75 0 1 1 .894 1.204A5.77 5.77 0 0 1 12 17.75a5.77 5.77 0 0 1-3.447-1.148a.75.75 0 0 1-.156-1.049" clipRule="evenodd"></path><path fill="currentColor" d="M16 10.5c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5s.448-1.5 1-1.5s1 .672 1 1.5m-6 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S8.448 9 9 9s1 .672 1 1.5"></path></svg></button>
      <input type="text" placeholder='Type a messages' className='w-full px-6 py-2 bg-[#bdcfff] rounded-full border focus:outline-none' />
      <button className='bg-blue-600 text-white rounded-full w-11 h-10 ps-[9px] cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M3.291 3.309a.75.75 0 0 0-.976.996l3.093 6.945H13a.75.75 0 0 1 0 1.5H5.408l-3.093 6.945a.75.75 0 0 0 .976.996l19-8a.75.75 0 0 0 0-1.382z" clipRule="evenodd"></path></svg></button>
    </div>
  )
}

export default Input;