import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function BoardWrite() {
  const [title, setTitle] = useState("");
  const [writer, setWriter] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  function handleClickSave() {
    axios
      .post("/api/board/add", {
        title: title,
        content: content,
      })
      .then(() => {
        navigate("/board");
      });
  }

  return (
    <Box>
      <Box>글 작성</Box>
      <Box>
        <FormControl>
          <FormLabel>제목</FormLabel>
          <Input onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>작성자</FormLabel>
          <Input readOnly onChange={(e) => setWriter(e.target.value)} />
        </FormControl>
        <FormControl>
          <FormLabel>내용</FormLabel>
          <Textarea onChange={(e) => setContent(e.target.value)} />
        </FormControl>
        <Box>
          <Button colorScheme="blue" onClick={handleClickSave}>
            저장
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
