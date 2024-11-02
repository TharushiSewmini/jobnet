import React, { useEffect, useState } from "react";
import ChatPeopleRow from "../ChatPeopleRow";
import { auth, db } from "../../utils/firebaseConfig";
import {
  collection,
  getDocs,
  query,
  where,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";

interface ChatUser {
  id: string;
  name: string;
  messageCount: number;
}

interface ChatSliderProps {
  onCallBackgiveReceiverId: (receiverId: string) => void;
}

const ChatSlider = ({ onCallBackgiveReceiverId }: ChatSliderProps) => {
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const handleUserSelect = (userId: string) => {
  
    setSelectedUserId(userId);
    onCallBackgiveReceiverId(userId);
  };

  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        let currentUserId: string;
  if (auth.currentUser && auth.currentUser.uid) {
    currentUserId = auth.currentUser.uid;
  } else {
    currentUserId = "";
  }
      

        // 1. First get all conversations where current user is a participant
        const conversationRef = collection(db, "conversations");
        const conversationQuery = query(
          conversationRef,
          where("participants", "array-contains", currentUserId)
        );
        const conversationSnapshot = await getDocs(conversationQuery);

        // 2. Extract unique participant IDs (excluding current user)
        const uniqueParticipantIds = new Set<string>();
        conversationSnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.participants && Array.isArray(data.participants)) {
            // Only add participants who have had actual message exchanges
            if (data.lastMessage) { // Check if there's been any message exchange
              data.participants.forEach((participantId: string) => {
                if (participantId !== currentUserId) {
                  uniqueParticipantIds.add(participantId);
                }
              });
            }
          }
        });

        // 3. Fetch user details for participants
        const userRef = collection(db, "users");
        const userPromises = Array.from(uniqueParticipantIds).map(async (userId) => {
          try {
            // Try direct ID match first
            const userQuery = query(userRef, where("__name__", "==", userId));
            let userSnapshot = await getDocs(userQuery);

            // If no results, try uid field
            if (userSnapshot.empty) {
              const uidQuery = query(userRef, where("uid", "==", userId));
              userSnapshot = await getDocs(uidQuery);
            }

            if (!userSnapshot.empty) {
              const userData = userSnapshot.docs[0].data();
              return {
                id: userId,
                name: userData.userFullName || "Unknown User",
                messageCount: await getUnreadMessageCount(currentUserId, userId),
              };
            }
            return null;
          } catch (error) {
            console.error(`Error fetching user ${userId}:`, error);
            return null;
          }
        });

        const users = (await Promise.all(userPromises)).filter(
          (user): user is ChatUser => user !== null
        );

        // 4. Sort users by unread message count
        users.sort((a, b) => b.messageCount - a.messageCount);
        
        setChatUsers(users);
      } catch (error) {
        console.error("Error fetching chat users:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchChatUsers();
  }, []);

  const getUnreadMessageCount = async (
    currentUserId: string,
    otherUserId: string
  ): Promise<number> => {
    try {
      const messagesRef = collection(db, "messages");
      const unreadQuery = query(
        messagesRef,
        where("receiverId", "==", currentUserId),
        where("senderId", "==", otherUserId),
        where("read", "==", false)
      );

      const unreadSnapshot = await getDocs(unreadQuery);
      return unreadSnapshot.size;
    } catch (error) {
      console.error("Error getting unread message count:", error);
      return 0;
    }
  };

  return (
    <div className="min-w-64 md:w-2/5 w-1/5 h-full bg-[green-500] overflow-auto p-4 flex flex-col gap-3 rounded-r-2xl">
      <div className="text-2xl text-green-500 font-medium mb-3 items-center">
        YOUR CHAT LIST . . .
      </div>

      <div className="flex flex-col gap-2 flex-1 bg-white p-3 rounded-lg">
        {loading ? (
          <div className="text-gray-500">Loading chats...</div>
        ) : chatUsers.length > 0 ? (
          chatUsers.map((user) => (
            <ChatPeopleRow
              key={user.id}
              userName={user.name}
              userMessageCount={user.messageCount}
              onClick={() => handleUserSelect(user.id)}
            />
          ))
        ) : (
          <div className="text-gray-500">No active chats.</div>
        )}
      </div>
    </div>
  );
};

export default ChatSlider;