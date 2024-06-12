import React, { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";

function Question(props) {
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState({ title: "", content: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewQuestion({
      ...newQuestion,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    setQuestions([...questions, newQuestion]);
    setNewQuestion({ title: "", content: "" });
  };

  return (
    <Box p={4}>
      <Heading as="h1" mb={6}>
        질문 게시판
      </Heading>
      <VStack spacing={4} align="stretch">
        <Box>
          <Input
            placeholder="질문 제목"
            name="title"
            value={newQuestion.title}
            onChange={handleInputChange}
            mb={3}
          />
          <Textarea
            placeholder="질문 내용"
            name="content"
            value={newQuestion.content}
            onChange={handleInputChange}
            mb={3}
          />
          <Button onClick={handleSubmit}>질문 올리기</Button>
        </Box>
        <Box mt={6}>
          <Heading as="h2" size="md" mb={4}>
            질문 목록
          </Heading>
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <Box key={index} p={4} borderWidth={1} borderRadius="md" mb={3}>
                <Heading as="h3" size="sm" mb={2}>
                  {question.title}
                </Heading>
                <Text>{question.content}</Text>
              </Box>
            ))
          ) : (
            <Text>아직 등록된 질문이 없습니다.</Text>
          )}
        </Box>
      </VStack>
    </Box>
  );
}

export default Question;
