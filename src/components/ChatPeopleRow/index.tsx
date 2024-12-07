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
    <div className=" flex lg:w-full justify-between items-center pb-3 pt-5 px-1 lg:border-gray-300 lg:border-b-[1px] cursor-pointer lg:mr-0 mr-10 min-w-52" onClick={onClick}>
      {/* image */}
      <div className="flex justify-between items-center lg:w-full lg:gap-0 gap-2">
        <div className="h-10 w-10 rounded-full bg-gray-300 flex justify-center items-center">
          {userImage && userImage.length > 1? (
            <img
              src={userImage}
            
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
