import React, { useContext, useState } from "react";
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
  FormHelperText,
  Container,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LoginContext } from "../../component/LoginProvider.jsx";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const account = useContext(LoginContext);
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
      .postForm("/api/board/add", {
        title: title,
        content: content,
        files: files,
      })
      .then(() => {
        toast({
          description: "새 글이 등록되었습니다.",
          status: "success",
          position: "top",
        });
        navigate("/board/list");
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

  //file 목록 작성
  const fileNameList = [];
  for (let i = 0; i < files.length; i++) {
    fileNameList.push(<li key={i}>{files[i].name}</li>);
  }

  return (
    <Box py={8} px={4} minH="100vh" bg="gray.50">
      <Container maxW="container.md" bg="white" p={6} borderRadius="md" boxShadow="md">
        <Heading mb={6} textAlign="center" fontSize="2xl" fontWeight="bold" color={"teal"}>
          글쓰기
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
            <Input readOnly value={account.nickName}/>
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
          </FormControl>
          <FormControl>
            <FormLabel>파일</FormLabel>
            <Input
              multiple={true}
              type="file"
              accept="image/*"
              cursor={"pointer"}
              onChange={(e) => setFiles(e.target.files)}
            />
            <FormHelperText>총 용량은 20MB, 한 파일은 10MB를 초과할 수 없습니다!</FormHelperText>
          </FormControl>
          {files.length > 0 && (
            <Box>
              <Heading size="sm" mt={4} mb={2}>첨부 파일</Heading>
              <ul>
                {fileNameList}
              </ul>
            </Box>
          )}
          <Button colorScheme="blue" onClick={handleClickSave} alignSelf="center">
            저장
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}

export default BoardWrite;
