import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {

    try {
        const { id:receiverId } = req.params;
        const { message } = req.body;
        const senderId = req.user._id;

       let conversation= await Conversation.findOne({
             
                participants: { $all: [senderId, receiverId] },
           }
        );

        if(!conversation){
            conversation= await Conversation.create({
                participants:[senderId,receiverId],
            });
        }

        const newMessage= new Message({ 
            receiverId,
            senderId,
            message,
        });
          
        if(newMessage){
           conversation.messages.push(newMessage._id);   
        }  

        // await newMessage.save();
        // await conversation.save();

        //this will run in parallel
        await Promise.all([newMessage.save(),conversation.save()]);

        //SOCKET IO will be here

        // const receiverSocketId= getReceiverSocketId(receiverId);
        // if(receiverSocketId){
        //     //req.to(<socketId>).emit() used to send events to a specific client
        //     io.to(receiverSocketId).emit("getMessage",newMessage);
        // }

        const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

        

        return res.status(200).json({ newMessage });
        
    } catch (error) {
        
         console.log("Error in sendMessage controller", error.message);
            res.status(500).json({ error: "Internal Server Error" });
    }

}

export const getMessage = async (req, res) => {
    
   try {
       const {id:userToChatId}=req.params;
         const senderId=req.user._id;

            const conversation= await Conversation.findOne({
                participants: { $all: [senderId, userToChatId] },
            }).populate("messages");  //populate the messages array with the actual message objects

            if(!conversation){ return res.status(200).json([]); }

            return res.status(200).json( conversation.messages );
    
   } catch (error) {
         console.log("Error in getMessage controller", error.message);
            res.status(500).json({ error: "Internal Server Error" });
   }
}   
