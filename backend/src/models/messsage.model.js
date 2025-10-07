import mongoose from 'mongoose';

const messageSchema = mongoose.Schema(
    {
        senderId :{  //clerk id
            type: String,
            required: true,
        },
        receiverId :{ //clerk id
            type: String,
            required: true,
        },
        content :{
            type: String,
            required: true,
        }
    },{timestamps:true});

export const Message = mongoose.model("Message", messageSchema);