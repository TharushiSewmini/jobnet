import React from "react";

interface ChatPeopleProps {
  userName: string;
  userImage?: string;
  userMessageCount: number;
  onClick :(e:any)=>void;
}

const ChatPeopleRow = ({
  userName,
  userMessageCount,
  userImage,
  onClick
}: ChatPeopleProps) => {
  return (
    <div className="p-2 rounded-lg flex justify-between items-center lg:p-4 border-[2px] border-green-200 cursor-pointer" onClick={onClick}>
      {/* image */}
      <div className="flex gap-3 items-center">
        <div className="h-10 w-10 rounded-full bg-gray-300 flex justify-center items-center">
          {userImage ? (
            <img
              src={userImage}
              alt="user"
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <span className="text-white font-bold">{userName[0]}</span>
          )}
        </div>

        {/* person name */}
        <div className="font-light">{userName}</div>
      </div>

      {/* number of messages not seen */}
      {userMessageCount > 0 && (
        <div className="text-xs rounded-full h-6 w-6 flex justify-center items-center bg-green-500 text-white">
          {userMessageCount}
        </div>
      )}
    </div>
  );
};

export default ChatPeopleRow;
