import Conversation from "../models/Conversation.model.js";
import Message from "../models/Message.model.js";

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

        //SOCKET IO will be here

        // await newMessage.save();
        // await conversation.save();

        //this will run in parallel
        await Promise.all([newMessage.save(),conversation.save()]);

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
