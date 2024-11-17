import React from 'react'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function body({todos, handleCheck, handleDelete, handleEdit}) {
  return (
    
    <div className='overflow-auto h-[55%] mt-6'>
    {todos.map(item=>{
       return <div className='flex bg-violet-100 p-2 mr-2 rounded my-3 items-center'key={item.id}>
       <input className='w-5 h-5 ml-1 cursor-pointer' name={item.id} type="checkbox" onChange={handleCheck} />
       <div className='mx-5 font-medium w-3/4'>{item.todo}</div>
       <div className='flex gap-4 mr-[2%]'>
       <div  className='text-white bg-violet-700  w-9 h-7 flex justify-center items-center rounded cursor-pointer'onClick={(e)=>{handleEdit(e,item.id)}}><FaRegEdit /></div>
       <div className='text-white bg-violet-700 text-lg w-9 h-7 flex justify-center items-center  cursor-pointer' onClick={(e)=>{handleDelete(e,item.id,item.todo)}}><MdDelete /></div>
       </div>
       </div>
    })}
  
 </div>
  )
}

export default body
