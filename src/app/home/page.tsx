"use client";

import { useEffect, useState } from "react";
import { Flex } from "@chakra-ui/react";
import { fetchUsers } from "../actions/users";
import { useRouter } from "next/navigation";

const HomePage = () => {
  const router = useRouter();
  const [users, setUsers]: any[] = useState([]);

  useEffect(() => {
    const data = async () => {
      const response = await fetchUsers();
      setUsers(response.data);
    };
    data();
  }, []);

  const handleClick = (userId: string) => {
    router.push(`/home/chat?receiverId=${userId}`);
  };

  return (
    <Flex flexDir={"column"}>
      <p>Home Page</p>
      {users.map((user: any) => {
        return (
          <p key={user?.id} onClick={() => handleClick(user?.id)}>
            {user?.username}
          </p>
        );
      })}
    </Flex>
  );
};

export default HomePage;
