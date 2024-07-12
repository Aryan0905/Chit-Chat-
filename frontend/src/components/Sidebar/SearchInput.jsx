import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import useConversation from '../../zustand/useConversation';
import useGetConversations from '../../Hooks/useGetConversations';
import toast from 'react-hot-toast';

function SearchInput() {
   const [search, setSearch] = useState('');
   const {setSelectedConversation}=useConversation();
   const { conversations }=useGetConversations();

   const handleSubmit=(e)=>{
        e.preventDefault();
        if(!search) return;
        if(search.length<3) return toast.error('Search term must be at least 3 characters');

        const conversation=conversations.find((c)=>c.fullName.toLowerCase().includes(search.toLowerCase()));
          console.log("I am in handlesubmit of SearchInput");
        if(!conversation) return toast.error('No conversation found with that name');
        else {setSelectedConversation(conversation);
        setSearch("");  
        }
      };

  return (
    <form onSubmit={handleSubmit} className='flex items-center gap-2'>
        <input type='text'
         className='input input-bordered rounded-full' 
         placeholder='Search.......'
         value={search}
				 onChange={(e) => setSearch(e.target.value)}
         />
        <button type="text" className='btn btn-circle bg-sky-500 text-white'>
            <IoSearchSharp  className='h-6 w-6 outline-none'/>
        </button>


    </form>
  )
}

export default SearchInput


// import React from 'react';
// import { IoSearchSharp } from "react-icons/io5";

// function SearchInput() {
//   return (
//     <form className='flex items-center gap-2'>
//         <input type='text' className='input input-bordered rounded-full' placeholder='Search.......' />
//         <button type="text" className='btn btn-circle bg-sky-500 text-white'>
//             <IoSearchSharp  className='h-6 w-6 outline-none'/>
//         </button>


//     </form>
//   )
// }

// export default SearchInput