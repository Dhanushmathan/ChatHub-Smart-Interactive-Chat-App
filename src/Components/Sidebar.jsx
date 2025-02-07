import React from 'react'

const Sidebar = () => {
  return (
    <div className='w-20 hidden lg:block bg-gradient-to-t from-[#6c63ff] via-[#3E58A9] to-[#3E58A9] h-screen p-4'>
      <div className='flex flex-col items-center justify-between'>
        <button className='cursor-pointer' title='Profile'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" className='text-white w-8 h-8'><path fill="currentColor" d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"></path></svg></button>
        <div className='flex items-center flex-col mt-[500px] space-y-6'>
          <button className='cursor-pointer' title='Settings'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" className='text-white w-8 h-8'><path fill="currentColor" d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5"></path></svg></button>
          <button className='cursor-pointer' title='Logout'><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" className='text-white w-8 h-8'><path fill="currentColor" d="M12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12q0-2.1.788-3.912t2.137-3.163l1.4 1.4q-1.1 1.1-1.712 2.55T4 12q0 3.35 2.325 5.675T12 20t5.675-2.325T20 12q0-1.675-.612-3.125t-1.713-2.55l1.4-1.4q1.35 1.35 2.138 3.163T22 12q0 2.075-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m-1-9V2h2v11z"></path></svg></button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;