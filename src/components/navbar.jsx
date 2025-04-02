import React from 'react'

const navbar = () => {
  return (
    <nav className='sticky top-0 w-full'>
      <div className="container flex justify-between items-center bg-indigo-800 text-white p-2 mx-auto ">
        <div className="logo font-bold text-2xl text-amber-300 mx-8 cursor-pointer">&lt;&#x2f;&gt; Taskify</div>
        <ul className='flex justify-between items-center gap-5 mx-8'>
            <li className='hover:font-bold hover:text-amber-300 cursor-pointer transition-all'><a href="#main">Home</a></li>
            <li className='hover:font-bold hover:text-amber-300 cursor-pointer transition-all'><a href="#yourtasks">Your Tasks</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default navbar
