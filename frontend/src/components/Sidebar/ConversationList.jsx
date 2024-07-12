import React from 'react'
import Conversation from './Conversation'
import useGetConversations from '../../Hooks/useGetConversations';

function ConversationList() {
  const {loading, conversations}=useGetConversations();
  // console.log(conversations);

  return (
    <div className='py-2 flex flex-col overflow-auto'>
       
        {conversations.map((conversation,idx) => (
          <Conversation key={conversation._id}
           conversation={conversation} 
            lastIdx={idx === conversations.length - 1}
           />
        ))}

        {loading?  <span className='loading loading-spinner'></span> : null}

    </div>
  )
}

export default ConversationList


//starter code

// import React from 'react'
// import Conversation from './Conversation'

// function ConversationList() {
//   return (
//     <div className='py-2 flex flex-col overflow-auto'>
//       <Conversation />
//       <Conversation />
//       <Conversation />
//       <Conversation />
//       <Conversation />
//       <Conversation />
      
//     </div>
//   )
// }

// export default ConversationList