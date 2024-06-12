import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";

function Inquiry(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const toast = useToast();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // 서버로 데이터를 전송합니다.
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error("문의 제출에 실패했습니다.");
      }

      // 제출 후 성공 메시지를 표시합니다.
      toast({
        title: "문의가 성공적으로 제출되었습니다.",
        description: "빠른 시일 내에 답변드리겠습니다.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      // 폼을 초기화합니다.
      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      // 오류 발생 시 오류 메시지를 표시합니다.
      toast({
        title: "문의 제출 오류",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="md"
    >
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        1:1 문의
      </Text>
      <VStack spacing={4} as="form" onSubmit={handleSubmit}>
        <FormControl id="name" isRequired>
          <FormLabel>이름</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>이메일</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="message" isRequired>
          <FormLabel>문의 내용</FormLabel>
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" width="full">
          제출
        </Button>
      </VStack>
    </Box>
  );
}

export default Inquiry;
