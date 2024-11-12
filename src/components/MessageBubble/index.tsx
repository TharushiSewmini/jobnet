import React from "react";
interface MessageBuubleProps {
    messageContent : string,
    messageBgColor : string,
    messageTextColor : string
    isUser : boolean
}
const MessageBubble = ({messageContent , messageBgColor, messageTextColor , isUser}:MessageBuubleProps) => {
  return (
    <div className={`  min-w-16 text-center max-w-[400px]${isUser ? " rounded-tr-2xl rounded-l-2xl"  : " rounded-r-2xl rounded-tl-2xl"}  lg:text-sm ${messageBgColor} p-2 ml-4 mt-4 mr-4 shadow-lg break-words text-xs	`}>
    {messageContent}
    </div>
  );
};

export default MessageBubble;
