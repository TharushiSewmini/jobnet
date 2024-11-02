import React, { useState } from "react";
import ChatSlider from "../../components/ChatSlider";
import ChatInterface from "../../components/ChatInterface";
import MaterPlusbtn from "../../components/MasterPlusButton";

const ChatPage = () => {
  const [userId, setUserId] = useState("");
  const handleReceiverIdSelect = (receiverId: string) => {
    // Do something with the receiverId
    // alert(receiverId);
    setUserId(receiverId);
    console.log("Selected receiver:", receiverId);
  };
  const [click, setClick] = useState(false);
  const onClick = () => {
    setClick(!click);
  };
  return (
    <div className="w-screen h-screen flex bg-green-100">
    
      {/* slider */}
      <ChatSlider onCallBackgiveReceiverId={handleReceiverIdSelect} />
      {/* chat interface */}
      <ChatInterface receiversId={userId} />
    </div>
  );
};

export default ChatPage;
