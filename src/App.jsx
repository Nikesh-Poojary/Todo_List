import { useRef, useState ,useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [todosList, setTodosList] = useState([])
  const [update,setUpdate]=useState(false)
  const [checkedUp,setCheckedUp]=useState(false)
  const inputRef=useRef();
  const pendingRef=useRef();
  const compRef=useRef();
  const edit=useRef("false");
  const todoup=useRef(true);
  const checkedRef=useRef();
  

useEffect(() => {
  let todoString=localStorage.getItem("todos");
  if(todoString)
  {
    let todos= JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
  }
  setUpdate(true)
}, [])

useEffect(() => {
  if(update)
  {
    saveToLS();
    renderTodos();
    setUpdate(false)
  }
}, [update])


const saveToLS=()=>{
  localStorage.setItem("todos",JSON.stringify(todos))
}

  const handleAdd= async()=>{
    if(todo==""){
      inputRef.current.focus();
      return;
    }
    else if (edit.current!=="false")
    {
      let t=todos.filter(i=>edit.current===i.id)
      t[0].todo=todo;
      edit.current="false";
    }
    else{
       setTodos([...todos,{id:uuidv4(),todo, isCompleted: false}]);
    }
    setTodo("");
    todoup.current=true;
    setUpdate(true);
    }
   
 const handleChange=(e)=>{
 setTodo(e.target.value);
 }

 const handleCheck=(e)=>{
   let id=e.target.name;
   let t=todos.filter(i=>id===i.id)
   t[0].isCompleted=!t[0].isCompleted;
   setTodos(todos);
   
   setUpdate(true)
  }

  const handleDelete=(e,id,todo)=>{
    let confm=confirm(`Are you sure you want to delete "${todo}"`)
    if(confm){
      let newTodos=todos.filter(item=>{
        return id!==item.id
      }
      );
      setTodos(newTodos);
    }
    setUpdate(true)
   return;
  }

  const handleEdit=(e,id)=>{
    let t=todos.filter(i=>id===i.id)
    setTodo(t[0].todo)
    inputRef.current.focus();
    edit.current=id;
  }
 const handlePending= async()=>{
  pendingRef.current.classList.add("bg-violet-900","text-white")
  compRef.current.classList.remove("bg-violet-900","text-white")
  let newTodos=todos.filter(item=>!item.isCompleted)
    await setTodosList(newTodos)
    setCheckedUp(false) 
    todoup.current=true;
 }

 const handleComp= async()=>{
  compRef.current.classList.add("bg-violet-900","text-white")
  pendingRef.current.classList.remove("bg-violet-900","text-white")
  let newTodos=todos.filter(item=>item.isCompleted)
  await setTodosList(newTodos)
    setCheckedUp(true) 
  todoup.current=false;
 }
 
 const renderTodos= async()=>{
  if(todoup.current)
  {
    handlePending();
  }
  else {
    handleComp();
  }
 }

  return (
    <>
    <div className='md:ml-[25%] mt-3'>
    <div className='bg-violet-200 rounded p-8 h-[100vh] md:w-7/12'>
    <div className='text-4xl font-bold ml-4 text-violet-900'>MyTodo</div>
        <div className='flex bg-white md:w-10/12 rounded-full w-[90%]  mt-5 focus-within:outline outline-violet-900'>
        <div className='p-4 rounded-full bg-transparent inline-block w-3/4 '>
        <input className=' bg-transparent outline-none w-full' type="text" placeholder='Add a new task' value={todo} onChange={handleChange} ref={inputRef}/>
        </div>
        <div className="p-4 rounded-full bg-violet-600 ml-2 w-4/12 text-white text-center cursor-pointer" onClick={handleAdd}>
            ADD
        </div>
        </div>
        <hr className='mt-8 border-2 border-white'/>
        <div>
            <div className='mt-4 text-2xl sm:text-3xl font-bold'>Your To-Do List</div>
        </div>
        <div className='flex gap-[2px]  mt-5  text-lg font-semibold '>
        <div className='cursor-pointer bg-violet-100 p-2 rounded px-3 md:px-8' ref={pendingRef} onClick={handlePending}>Pending</div>
        <div className='  cursor-pointer  bg-violet-100 p-2 rounded px-3 md:px-8 'ref={compRef} onClick={handleComp}>Completed</div>
      </div>
      
      <div className='overflow-auto h-[55%] mt-6'>
    {todosList.map(item=>{
       return <div className='flex bg-violet-100 p-2 mr-2 rounded my-3 items-center'key={item.id}>
       <input className='w-5 h-5 ml-1 cursor-pointer' name={item.id} type="checkbox" onChange={handleCheck} ref={checkedRef} checked={checkedUp}/>
       <div className='mx-5 font-medium w-3/4'>{item.todo}</div>
       <div className='flex gap-4 mr-[2%]'>
       <div  className='text-white bg-violet-700 w-7 h-5  md:w-9 md:h-7 flex justify-center items-center rounded cursor-pointer'onClick={(e)=>{handleEdit(e,item.id)}}><FaRegEdit className='' /></div>
       <div className='text-white bg-violet-700  md:text-lg w-7  h-5 md:w-9 md:h-7 flex justify-center items-center rounded cursor-pointer' onClick={(e)=>{handleDelete(e,item.id,item.todo)}}><MdDelete /></div>
       </div>
       </div>
    })}
 </div>
                  
    </div>
</div>
    </>
  )
}

export default App
