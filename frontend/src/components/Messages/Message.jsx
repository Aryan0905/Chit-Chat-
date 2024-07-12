import {useAuthContext} from '../../context/AuthContext';
import {useConversation} from '../../zustand/useConversation'

const Message = ({message}) => {

    const {authUser} = useAuthContext();
    // console.log("authUser",authUser);
    const {selectedConversation} = useConversation();
    const fromMe = message.senderId === authUser._id;
    const chatClassName= fromMe ? 'chat-end' : 'chat-start';

    const ProfilePic=fromMe ? authUser.profilePic : selectedConversation.profilePic;
    const bubbleBgColor= fromMe ? 'bg-blue-500' : '';
    const shakeClass= message.shouldShake ? 'shake' : '';

    const time = new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div className={`chat ${chatClassName}`}>
            <div className='chat-image avatar'>
                <div className='w-10 rounded-full'>
                    <img
                        alt='Tailwind CSS chat bubble component'
                        src={ProfilePic}
                         />
                </div>
            </div>
            <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
            <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{time}</div>
        </div>
    );
};

export default Message;