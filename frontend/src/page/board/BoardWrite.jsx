import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Heading,
  VStack,
  Center,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  function handleClickSave() {
    if (!title || !content) {
      toast({
        title: "제목과 내용을 입력해주세요.",
        status: "warning",
        position: "top",
        duration: 2000,
      });
      return;
    }
    axios
      .post("/api/board/add", {
        title: title,
        content: content,
      })
      .then(() => {
        navigate("/board");
      })
      .catch(() => {
        toast({
          title: "저장 중 오류가 발생했습니다.",
          status: "error",
          position: "top",
          duration: 2000,
        });
      });
  }

  return (
    <Box py={8} px={4} minH="100vh" bg="gray.50">
      <Center>
        <Box
          w={{ base: "100%", md: 600 }}
          p={8}
          bg="white"
          boxShadow="lg"
          borderRadius="md"
        >
          <Heading mb={6} textAlign="center" fontSize="2xl" fontWeight="bold">
            글 작성
          </Heading>
          <VStack spacing={6} align="stretch">
            <FormControl>
              <FormLabel fontWeight="bold">제목</FormLabel>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="제목을 입력하세요"
                bg="gray.100"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold">작성자</FormLabel>
              <Input
                value={writer}
                onChange={(e) => setWriter(e.target.value)}
                placeholder="작성자를 입력하세요"
                readOnly
                bg="gray.100"
              />
            </FormControl>
            <FormControl>
              <FormLabel fontWeight="bold">내용</FormLabel>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="내용을 입력하세요"
                bg="gray.100"
                minH="200px"
              />
              //
            </FormControl>
            <Button colorScheme="blue" onClick={handleClickSave}>
              저장
            </Button>
          </VStack>
        </Box>
      </Center>
    </Box>
  );
}
