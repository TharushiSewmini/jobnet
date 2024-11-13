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
  onSnapshot,
  Unsubscribe,
} from "firebase/firestore";

interface ChatUser {
  id: string;
  name: string;
  messageCount: number;
  userImage: string;
  lastMessageTimestamp?: number;
}

interface ChatSliderProps {
  onCallBackgiveReceiverId: (receiverId: string, receiverName: string) => void;
}

const ChatSlider: React.FC<ChatSliderProps> = ({
  onCallBackgiveReceiverId,
}) => {
  const [chatUsers, setChatUsers] = useState<ChatUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  // Create a ref for the cache to persist between renders
  const userDataCache = React.useRef(new Map<string, ChatUser>());
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

  const handleUserSelect = (userId: string, receiverName: string) => {
    setSelectedUserId(userId);
    onCallBackgiveReceiverId(userId, receiverName);
  };

  useEffect(() => {
    let unsubscribeConversations: Unsubscribe | null = null;
    let unsubscribeMessages: Unsubscribe | null = null;

    const setupRealtimeListeners = async () => {
      try {
        let currentUserId: string;
        if (auth.currentUser && auth.currentUser.uid) {
          currentUserId = auth.currentUser.uid;
        } else {
          currentUserId = "";
        }

        const conversationRef = collection(db, "conversations");
        const conversationQuery = query(
          conversationRef,
          where("participants", "array-contains", currentUserId)
        );

        unsubscribeConversations = onSnapshot(
          conversationQuery,
          async (conversationSnapshot) => {
            const uniqueParticipantIds = new Set<string>();

            conversationSnapshot.forEach((doc) => {
              const data = doc.data();
              if (data.participants?.length && data.lastMessage) {
                data.participants.forEach((participantId: string) => {
                  if (participantId !== currentUserId) {
                    uniqueParticipantIds.add(participantId);
                  }
                });
              }
            });

            const userRef = collection(db, "users");
            const updatePromises = Array.from(uniqueParticipantIds).map(
              async (userId) => {
                try {
                  const cachedUser = userDataCache.current.get(userId);
                  if (cachedUser) return cachedUser;

                  let userSnapshot = await getDocs(
                    query(userRef, where("__name__", "==", userId))
                  );

                  if (userSnapshot.empty) {
                    userSnapshot = await getDocs(
                      query(userRef, where("uid", "==", userId))
                    );
                  }

                  if (!userSnapshot.empty) {
                    const userData = userSnapshot.docs[0].data();
                    const userInfo: ChatUser = {
                      id: userId,
                      name: userData.userFullName || "Unknown User",
                      messageCount: await getUnreadMessageCount(
                        currentUserId,
                        userId
                      ),
                      userImage: await userData.userImage,
                      lastMessageTimestamp: 0,
                    };
                    userDataCache.current.set(userId, userInfo);
                    return userInfo;
                  }
                  return null;
                } catch (error) {
                  console.error(`Error fetching user ${userId}:`, error);
                  return null;
                }
              }
            );

            const users = (await Promise.all(updatePromises)).filter(
              (user): user is ChatUser => user !== null
            );

            const messagesRef = collection(db, "messages");
            const messageQuery = query(
              messagesRef,
              where("receiverId", "==", currentUserId)
            );

            unsubscribeMessages = onSnapshot(
              messageQuery,
              (messageSnapshot) => {
                const updatedUsers = users.map((user) => {
                  const userMessages = messageSnapshot.docs.filter((doc) => {
                    const data = doc.data();
                    return (
                      data.senderId === user.id || data.receiverId === user.id
                    );
                  });

                  const unreadCount = messageSnapshot.docs.filter((doc) => {
                    const data = doc.data();
                    return data.senderId === user.id && data.read === false;
                  }).length;

                  const lastMessage = userMessages.sort((a, b) => {
                    const timestampA = a.data().timestamp?.seconds ?? 0;
                    const timestampB = b.data().timestamp?.seconds ?? 0;
                    return timestampB - timestampA;
                  })[0];

                  return {
                    ...user,
                    messageCount: unreadCount,
                    lastMessageTimestamp:
                      lastMessage?.data().timestamp?.seconds ?? 0,
                  };
                });

                updatedUsers.sort((a, b) => {
                  if (b.messageCount !== a.messageCount) {
                    return b.messageCount - a.messageCount;
                  }
                  return (
                    (b.lastMessageTimestamp ?? 0) -
                    (a.lastMessageTimestamp ?? 0)
                  );
                });

                setChatUsers(updatedUsers);
                setLoading(false);
              },
              (error) => {
                console.error("Error in message listener:", error);
                setLoading(false);
              }
            );
          },
          (error) => {
            console.error("Error in conversation listener:", error);
            setLoading(false);
          }
        );
      } catch (error) {
        console.error("Error setting up real-time listeners:", error);
        setLoading(false);
      }
    };

    setupRealtimeListeners();

    return () => {
      unsubscribeConversations?.();
      unsubscribeMessages?.();
    };
  }, []);

  return (
    <div className="min-w-64 lg:w-2/5 w-full lg:h-full h-[20%] flex-1 bg-[green-500] overflow-auto lg:p-4 px-4 flex flex-col rounded-r-2xl p-2">
      <div className="items-center pt-2 mb-2 text-2xl font-medium text-green-500 lg:mb-1">
        YOUR CHAT LIST . . .
      </div>

      <div className="flex flex-row w-full p-3 overflow-auto bg-white rounded-lg  lg:flex-col lg:overflow-hidden">
        {loading ? (
          <div className="flex w-full text-gray-500 ">Loading chats...</div>
        ) : chatUsers.length > 0 ? (
          chatUsers.map((user) => (
            <ChatPeopleRow
              key={user.id}
              userName={user.name}
              userImage={user.userImage}
              userMessageCount={user.messageCount}
              onClick={() => handleUserSelect(user.id, user.name)}
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
