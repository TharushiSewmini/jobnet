import React, { useState } from "react";
import ChatSlider from "../../components/ChatSlider";
import ChatInterface from "../../components/ChatInterface";
import MaterPlusbtn from "../../components/MasterPlusButton";

const ChatPage = () => {
  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState("");
  const handleReceiverIdSelect = (receiverId: string , receiverName : string) => {
 
    // alert(receiverId);
    setUserId(receiverId);
    setUserName(receiverName);
    console.log("Selected receiver:", receiverId);
  };
  const [click, setClick] = useState(false);
 
  return (
    <div className="w-full h-screen flex bg-green-100 lg:flex-row flex-col overflow-hidden">
    
      {/* slider */}
      <ChatSlider onCallBackgiveReceiverId={(value , value2)=>handleReceiverIdSelect(value , value2)} />
      {/* chat interface */}
      <ChatInterface receiversId={userId} receiverName={userName}/>
    </div>
  );
};

export default ChatPage;
