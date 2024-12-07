import React, { useEffect, useState, useRef } from "react";
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
import logout from "../../assets/user-logout.png";
import send from "../../assets/send.png";

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
  receiverName: string;
}

const ChatInterface = ({ receiversId, receiverName }: ChatInterfaceProps) => {
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
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [shouldScrollToBottom, setShouldScrollToBottom] = useState(true);

  const scrollToBottom = () => {
    if (chatContainerRef.current && shouldScrollToBottom) {
      const scrollHeight = chatContainerRef.current.scrollHeight;
      const height = chatContainerRef.current.clientHeight;
      const maxScrollTop = scrollHeight - height;

      chatContainerRef.current.scrollTo({
        top: maxScrollTop,
        behavior: "smooth",
      });
    }
  };

  // Handle scroll events to determine if we should auto-scroll
  const handleScroll = () => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } =
        chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShouldScrollToBottom(isNearBottom);
    }
  };

  // Add scroll event listener
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      chatContainer.addEventListener("scroll", handleScroll);
      return () => chatContainer.removeEventListener("scroll", handleScroll);
    }
  }, []);

  // Scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initial scroll and message loading
  useEffect(() => {
    const timer = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timer);
  }, []);

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

      // Force scroll to bottom on send
      setShouldScrollToBottom(true);
      setTimeout(scrollToBottom, 100);
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

          snapshot.docs.forEach(async (doc) => {
            const messageData = doc.data() as MessageData;
            if (
              messageData.receiverId === senderId &&
              messageData.read === false
            ) {
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
      try {
        const messageToSend = chatMessage;
        setChatMessage("");
        await sendAMessage(
          conversation.id,
          senderId,
          receiverId,
          messageToSend
        );
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex lg:w-4/5 w-full flex-col lg:h-full h-[80%]  lg:pt-4 pl-4 pr-4 mb-4 box-border lg:gap-2">
      <div className="flex lg:justify-between justify-start items-center">
        <div className="flex w-full text-start lg:text-lg text-base items-center mb-2 lg:mb-0 rounded-xl">
          Chat With
          <span className="text-green-500 ml-2 lg:text-2xl text-lg">
            {receiverName}
          </span>
        </div>
        <div className="lg:block hidden">
          <img
            src={logout}
            alt="logout"
            className="w-10 h-10 cursor-pointer"
            onClick={() => auth.signOut()}
          />
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="rounded-xl border-[1px] border-gray-200 flex-1 w-full flex flex-col overflow-y-auto py-4 bg-white text-sm text-black lg:mb-0 mb-2"
      >
        {messages.length !== 0 ? (
          <div className="flex-1 flex flex-col">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isUser ? "justify-end" : "justify-start"
                } mb-2 px-4`}
              >
                <MessageBubble
                  messageContent={message.text}
                  messageBgColor={
                    message.isUser ? "bg-green-200" : "bg-yellow-200"
                  }
                  messageTextColor={
                    message.isUser ? "text-white" : "text-black"
                  }
                  isUser={message.isUser}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="lg:text-xl text-gray-500 h-full flex items-center justify-center text-sm">
            No messages yet
          </div>
        )}
      </div>

      <div className="flex gap-4 items-center justify-between rounded-xl w-full lg:mt-4">
        <input
          onKeyDown={handleKeyDown}
          value={chatMessage}
          onChange={(e) => setChatMessage(e.target.value)}
          placeholder="Type a message ... "
          className="flex flex-1 rounded-xl p-4 focus:outline-none border-[1px] border-gray-200 bg-white lg:placeholder:text-sm text-xs"
          aria-multiline={true}
        />
        <button
          className="bg-green-500 lg:rounded-xl px-4 py-2 text-white rounded-full lg:block hidden"
          onClick={handleSendMessage}
        >
          Send
        </button>

        <div
          className="h-12 w-12 p-2 rounded-full bg-green-500 flex items-center justify-center cursor-pointer lg:hidden visible"
          onClick={handleSendMessage}
        >
          <img src={send} alt="send" />
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
