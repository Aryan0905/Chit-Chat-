import React from 'react';
import { IoSearchSharp } from "react-icons/io5";

function SearchInput() {
  return (
    <form className='flex items-center gap-2'>
        <input type='text' className='input input-bordered rounded-full' placeholder='Search.......' />
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