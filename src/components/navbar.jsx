import React from 'react'

function navbar() {
  return (
    <nav className='flex justify-between items-center p-2 bg-violet-50'>
      <div className='text-4xl font-bold ml-4 text-violet-900'>MyTodo</div>
      <div className='flex gap-10 mx-10  text-xl font-semibold'>
        <div className='hover:scale-110 transition duration-75 hover:font-bold cursor-pointer '>Home</div>
        <div className='hover:scale-110 transition duration-75 hover:font-bold cursor-pointer w-20'>My Task</div>
      </div>
    </nav>
  )
}

export default navbar