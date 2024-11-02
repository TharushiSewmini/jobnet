import React, { useEffect, useState } from "react";
import MessageBubble from "../MessageBubble";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../../utils/firebaseConfig";
import { useAuthContext } from "../../contexts/AuthContext";
import logout from "../../assets/user-logout.png"

interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: string;
  timestamp?: Timestamp;
}

interface MessageData {
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: Timestamp;
  read: boolean;
  conversationId: string;
}

interface Message extends MessageData {
  id: string;
  isUser: boolean;
}

interface ChatInterfaceProps {
  receiversId: string;
}

const ChatInterface = ({ receiversId }: ChatInterfaceProps) => {
  let senderId: string;
  if (auth.currentUser && auth.currentUser.uid) {
    senderId = auth.currentUser.uid;
  } else {
    senderId = "";
  }

  const receiverId = receiversId;
  const [chatMessage, setChatMessage] = useState("");
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // Checking if a conversation exists, or creating one
  const getOrCreateConversation = async (
    senderId: string,
    receiverId: string
  ) => {
    const conversationRef = collection(db, "conversations");
    const conversationQuery = query(
      conversationRef,
      where("participants", "array-contains", senderId)
    );

    const querySnapshot = await getDocs(conversationQuery);
    let conversation: Conversation | null = null;

    querySnapshot.forEach((doc) => {
      const data = doc.data() as Conversation;
      if (data.participants.includes(receiverId)) {
        conversation = {
          id: doc.id,
          participants: data.participants,
          lastMessage: data.lastMessage,
          timestamp: data.timestamp,
        };
      }
    });

    if (!conversation) {
      const newConversation = await addDoc(conversationRef, {
        participants: [senderId, receiverId],
        lastMessage: "",
        timestamp: Timestamp.now(),
      });

      conversation = {
        id: newConversation.id,
        participants: [senderId, receiverId],
      };
    }

    return conversation;
  };

  // Sending a message
  const sendAMessage = async (
    conversationId: string,
    senderId: string,
    receiverId: string,
    text: string
  ) => {
    try {
      const messagesRef = collection(db, "messages");
      await addDoc(messagesRef, {
        conversationId,
        senderId,
        receiverId,
        text,
        timestamp: Timestamp.now(),
        read: false,
      });

      const conversationRef = doc(db, "conversations", conversationId);
      await setDoc(
        conversationRef,
        {
          lastMessage: text,
          timestamp: Timestamp.now(),
        },
        { merge: true }
      );
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    const initializeConversation = async () => {
      const convo = await getOrCreateConversation(senderId, receiverId);
      setConversation(convo);

      if (convo) {
        const messageRef = collection(db, "messages");
        const messageQuery = query(
          messageRef,
          where("conversationId", "==", convo.id)
        );

        const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
          const sortedMessages = snapshot.docs
            .map((doc) => {
              const data = doc.data() as MessageData;
              return {
                ...data,
                id: doc.id,
                isUser: data.senderId === senderId,
              } as Message;
            })
            .sort((a, b) => {
              if (a.timestamp && b.timestamp) {
                return a.timestamp.seconds - b.timestamp.seconds;
              }
              return 0;
            });

          setMessages(sortedMessages);

          // Mark messages as read
          snapshot.docs.forEach(async (doc) => {
            const messageData = doc.data() as MessageData;
            if (messageData.receiverId === senderId && messageData.read === false) {
              await setDoc(doc.ref, { read: true }, { merge: true });
            }
          });
        });

        return () => unsubscribe();
      }
    };

    if (senderId && receiverId) {
      initializeConversation();
    }
  }, [senderId, receiverId]);

  const handleSendMessage = async () => {
    if (chatMessage.trim() && conversation) {
      await sendAMessage(conversation.id, senderId, receiverId, chatMessage);
      setChatMessage("");
    }
  };


  return (
    <div className="flex w-full flex-col h-full gap-4 md:p-10 mr-4">
      <div className="flex justify-between items-center">
      <div className="flex w-full text-start text-lg items-center px-4 py-2 rounded-xl">
        Chat With
        <span className="text-green-500 ml-2 text-2xl">Noah Martinez</span>
      </div>
      <div>
        <img src={logout} alt="logout" className="w-10 h-10 cursor-pointer" onClick={() => auth.signOut()}/>
      </div>
      </div>

      <div className="rounded-xl border-[1px] border-gray-200 flex-1 w-full flex-col overflow-y-auto py-4 bg-white text-sm text-black">
        {messages.length !== 0 ? (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.isUser ? "justify-end" : "justify-start"
              } mb-2`}
            >
              <MessageBubble
                messageContent={message.text}
                messageBgColor={message.isUser ? "bg-green-200" : "bg-yellow-200"}
                messageTextColor={message.isUser ? "text-white" : "text-black"}
                isUser={message.isUser}
              />
            </div>
          ))
        ) : (
          <div className="text-xl text-gray-500 h-full flex items-center justify-center">
            No messages yet
          </div>
        )}
      </div>

      <div className="flex gap-4 items-center justify-between rounded-xl">
        <input
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          placeholder="Type a message"
          className="flex flex-1 rounded-xl p-4 focus:outline-none border-[1px] border-gray-200 bg-white"
          aria-multiline={true}
        />
        <button
          className="bg-green-500 rounded-xl px-4 py-2 text-white"
          onClick={handleSendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatInterface;