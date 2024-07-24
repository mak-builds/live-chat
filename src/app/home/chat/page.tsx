"use client";

import { fetchChats, fetchCurrentUser } from "@/app/actions/users";
import supabase from "@/utils/supabaseClient/index.js";
import { Flex } from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ChatPage = () => {
  const searchParams = useSearchParams();

  const [messages, setMessages]: any = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userId: any = await fetchCurrentUser();
      const chats: any = await fetchChats();
      setMessages(chats?.data);

      console.log(userId?.data?.session?.user?.id, searchParams.get("userId"));

      const messageListener = supabase
        .channel("realtime test")
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "chat-messages",
            // filter: `sender_id=${senderId}`,
          },
          (payload) => {
            console.log(payload.new);
            setMessages((prevMessages: any) => [...prevMessages, payload.new]);
          }
        )
        .subscribe();

      return () => {
        messageListener.unsubscribe();
      };
    };
    fetchData();
  }, []);

  return (
    <Flex flexDir={"column"}>
      <p>Chat</p>
      {messages.map((chat, index) => {
        return <p key={chat?.id}>{chat?.content}</p>;
      })}
    </Flex>
  );
};

export default ChatPage;
